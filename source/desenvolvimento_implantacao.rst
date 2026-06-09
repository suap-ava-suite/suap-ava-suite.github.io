Guia de Desenvolvimento e Implantação (Dev & Infra)
===================================================

Esta seção detalha a arquitetura técnica da **SUAP/AVA Suite**, o passo a passo para configurar o ambiente de desenvolvimento local e as diretrizes de implantação em produção.

Arquitetura e Fluxo de Integração
---------------------------------

A suite trabalha em duas frentes de integração:

1. **Sincronização de Dados Acadêmicos (SUAP -> Moodle)**:
   Realizada via chamadas REST do SUAP para o **Integrador AVA**, que roteia a solicitação para o plugin **local_suap** do Moodle correto.
   
   .. code-block:: text

      [ SUAP ]
         │ (POST /api/enviar_diarios/)
         ▼
      [ Integrador AVA ] (Middleware Django)
         │ 1. Valida token
         │ 2. Seleciona ambiente Moodle via rule_engine
         │ 3. Injeta Coortes e Colaboradores
         ▼
      [ Moodle (local_suap) ] (Plugin local)
         │ Cria categorias, cursos, grupos, matricula usuários e vincula coortes.
         ▼
      [ URL do Diário Retornada ]

2. **Dashboard Unificado (Painel AVA -> Moodle)**:
   O **Painel AVA** conecta-se a todas as instâncias do Moodle ativas através do plugin **tool_painelava** para expor em tempo real a lista de cursos de cada usuário.

Requisitos de Ambiente
----------------------

* Docker e Docker Compose Plugin
* Git
* Python 3.12+ (para desenvolvimento local de `integrador_ava` e `painel_ava`)
* PHP 7.4+ (para desenvolvimento de plugins Moodle)

Desenvolvimento Local
---------------------

Cada componente do ecossistema possui seu próprio repositório. Para iniciar o desenvolvimento do middleware ou frontend:

1. **Configuração da Workspace e Hooks de Qualidade**:
   Para manter o padrão de código, todos os repositórios Python usam hooks do `pre-commit` e `pre-push` que validam formatação (Black, Ruff), SAST (Bandit, Semgrep) e testes unitários.
   
   Exemplo de setup local para o **Integrador AVA**:

   .. code-block:: bash

      cd ~/projetos/IFRN/suap-ava-suite/integrador_ava
      python3 -m venv .venv
      source .venv/bin/activate
      pip install --upgrade pip uv
      uv pip install --upgrade -e ".[dev]"
      pre-commit install --hook-type pre-commit --hook-type pre-push
      
      # Validar todos os arquivos manualmente:
      pre-commit run --all-files

2. **Execução de Testes e Cobertura**:
   O Integrador AVA exige uma cobertura mínima de **91%** nos testes unitários e de integração. Para rodar a suíte de testes com cobertura:

   .. code-block:: bash

      coverage run --rcfile=src/.coveragerc src/manage.py test --verbosity 1
      coverage report --fail-under=91

Configuração das Aplicações
---------------------------

### 1. Variáveis de Ambiente Críticas

Tanto o **Integrador AVA** quanto o **Painel AVA** requerem configurações via variáveis de ambiente. Crie um arquivo `.env` contendo:

* **Integrador AVA (`integrador_ava`)**:
  
  * `SUAP_INTEGRADOR_KEY`: Token de API que o SUAP deve enviar no cabeçalho `Authentication: Token <SUAP_INTEGRADOR_KEY>`.
  * `DJANGO_SECRET_KEY`: Chave secreta única do Django.
  * `SUAP_BASE_URL`: URL base do SUAP para fins de logout e redirect.

* **Painel AVA (`painel_ava`)**:
  
  * `DJANGO_SECRET_KEY`: Chave secreta única do Django.
  * `OAUTH_CLIENT_ID` e `OAUTH_CLIENT_SECRET`: Credenciais do cliente OAuth2 criadas no SUAP para autenticação única.
  * `OAUTH_BASE_URL`: URL do provedor OAuth2 (SUAP).
  * `OAUTH_REDIRECT_URI`: Endereço de callback (ex.: `https://ava.zl.ifrn.edu.br/authenticate/`).

### 2. Cadastro de Ambientes no Django Admin

Após subir os serviços, acesse o painel administrativo de cada aplicação (Integrador e Painel) para cadastrar as instâncias do Moodle disponíveis.

* No **Painel AVA**: Cadastre os Moodles em **Ambientes** informando a URL e a Cor Mestra para estilização dos cards no dashboard.
* No **Integrador AVA**: Cadastre os Moodles em **Ambientes**. Informe a URL, o Token do plugin e a **Expressão Seletora** (usando sintaxe `rule_engine`).
  
  * Exemplo de Expressão Seletora:
    `campus.sigla == "ZL"` (este Moodle receberá diários do Campus Zona Leste).
  * O Integrador avalia as expressões dos ambientes ativos em ordem crescente pelo campo `ordem`. O primeiro que retornar verdadeiro recebe o diário.

Implantação em Produção (Docker)
--------------------------------

O deploy é simplificado pelo uso de imagens Docker oficiais disponibilizadas no Docker Hub da instituição.

Exemplo de arquivo `docker-compose.yml` para produção do **Painel AVA**:

.. code-block:: yaml

   services:
     cache:
       image: redis:7.2-alpine
       healthcheck:
         test: ["CMD", "redis-cli", "ping"]
         interval: 3s
         timeout: 3s
         retries: 3

     db:
       image: postgres:16-alpine
       environment:
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=altere_esta_senha
       volumes:
         - "./volumes/db_data:/var/lib/postgresql/data"
       healthcheck:
         test: ["CMD", "pg_isready", "-U", "postgres"]
         interval: 3s
         timeout: 3s
         retries: 3

     painel:
       image: ctezlifrn/avapainel:latest
       ports:
         - 80:8000
       environment:
         - POSTGRES_HOST=db
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=altere_esta_senha
         - DJANGO_DEBUG=False
         - DJANGO_ALLOWED_HOSTS=ava.suainstituicao.edu.br
         - DJANGO_SECRET_KEY=sua_chave_secreta_django_aqui
         - OAUTH_CLIENT_ID=client_id_oauth2_do_suap
         - OAUTH_CLIENT_SECRET=client_secret_oauth2_do_suap
         - OAUTH_BASE_URL=https://suap.suainstituicao.edu.br
         - OAUTH_REDIRECT_URI=https://ava.suainstituicao.edu.br/authenticate/
       volumes:
         - "./volumes/painel_media:/var/media"
         - "./volumes/painel_static:/var/static"
       depends_on:
         cache:
           condition: service_healthy
         db:
           condition: service_healthy

Instalação dos Plugins no Moodle
--------------------------------

Para cada servidor Moodle a ser integrado, os seguintes plugins devem ser instalados nos seus respectivos caminhos:

1. **auth_suap**:
   Instalar em `<moodle_root>/auth/suap/`.
   Configurar a URL alternativa de login no Moodle para `/auth/suap/login.php` (garanta que haja um administrador pré-autenticado com este método para não ficar preso para fora).
2. **local_suap**:
   Instalar em `<moodle_root>/local/suap/`.
   Registrar o token de autenticação (`sync_up_auth_token`) idêntico ao cadastrado no Ambiente do Integrador.
3. **tool_painelava**:
   Instalar em `<moodle_root>/admin/tool/painelava/`.
   Habilitar o WebService e registrar o token para que o Painel AVA consulte as matrículas.
