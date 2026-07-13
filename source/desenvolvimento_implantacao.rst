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
* Python 3.14+ (para desenvolvimento local de `integrador_ava` e `painel_ava`)
* PHP 8.2+ (para desenvolvimento de plugins Moodle)

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

1. Variáveis de Ambiente Críticas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Tanto o **Integrador AVA** quanto o **Painel AVA** requerem configurações via variáveis de ambiente. Elas devem ser preenchidas no arquivo ``.env`` para rodar localmente ou configuradas diretamente nas diretivas do container Docker no deploy de produção.

Para referências detalhadas de todas as configurações e variáveis de ambiente disponíveis de cada projeto, consulte:

* :doc:`Configurações Detalhadas do Painel AVA <settings_painel>`
* :doc:`Configurações Detalhadas do Integrador AVA <settings_integrador>`

.. toctree::
   :maxdepth: 1
   :hidden:

   settings_painel
   settings_integrador

As variáveis críticas de ambiente de ambas as aplicações estão listadas na tabela abaixo:


.. list-table:: Variáveis de Ambiente - Integrador e Painel
   :widths: 20 15 65
   :header-rows: 1

   * - Variável
     - Aplica-se a
     - Descrição / Exemplo de Valor
   * - ``DJANGO_SECRET_KEY``
     - Ambos
     - Chave secreta exclusiva do Django para fins de segurança e hashing. Deve ser uma string longa e aleatória (mínimo de 50 caracteres).
   * - ``DJANGO_DEBUG``
     - Ambos
     - Define o modo debug. Definir como ``False`` em produção para garantir segurança e performance.
   * - ``DJANGO_ALLOWED_HOSTS``
     - Ambos
     - Domínios ou IPs autorizados a servir o Django (ex: ``ava.suainstituicao.edu.br`` para o Painel, ou ``integrador.suainstituicao.edu.br`` para o Integrador).
   * - ``POSTGRES_HOST``
     - Ambos
     - O host de rede do banco de dados PostgreSQL (ex: ``db``).
   * - ``POSTGRES_DATABASE``
     - Ambos
     - Nome do banco de dados (ex: ``integrador`` para o Integrador e ``painel`` para o Painel).
   * - ``POSTGRES_USER``
     - Ambos
     - Usuário de autenticação no PostgreSQL.
   * - ``POSTGRES_PASSWORD``
     - Ambos
     - Senha do usuário do banco de dados.
   * - ``OAUTH_BASE_URL``
     - Ambos
     - URL base do SUAP/SGA que atuará como provedor de identidade (ex: ``https://suap.suainstituicao.edu.br``).
   * - ``OAUTH_CLIENT_ID``
     - Ambos
     - Client ID gerado no SUAP/SGA ao registrar a aplicação correspondente.
   * - ``OAUTH_CLIENT_SECRET``
     - Ambos
     - Client Secret correspondente ao Client ID gerado no SUAP/SGA.
   * - ``OAUTH_REDIRECT_URI``
     - Ambos
     - URL de callback da aplicação OAuth2. Ex: ``https://ava.suainstituicao.edu.br/authenticate/`` para o Painel.
   * - ``SUAP_INTEGRADOR_KEY``
     - Ambos
     - Token de segurança compartilhado. O SUAP deve enviar no cabeçalho ``Authorization: Token <TOKEN>`` ao chamar as APIs do Integrador.
   * - ``SUAP_BASE_URL``
     - Integrador
     - Equivalente à URL base do SUAP utilizada para validações e redirecionamentos.
   * - ``SENTRY_DNS``
     - Ambos
     - (Opcional) DSN do projeto correspondente no Sentry para captura e monitoramento de erros de runtime.
   * - ``SENTRY_ENVIRONMENT``
     - Ambos
     - (Opcional) Classificação de ambiente no Sentry (ex: ``production``, ``development``).
   * - ``SHOW_VLIBRAS``
     - Painel
     - (Opcional) Define se exibe o widget de acessibilidade em Libras. Valores: ``True`` ou ``False``.
   * - ``SHOW_USERWAY``
     - Painel
     - (Opcional) Habilita o widget de acessibilidade do UserWay. Valores: ``True`` ou ``False``.
   * - ``USERWAY_ACCOUNT``
     - Painel
     - (Opcional) ID da conta do UserWay associada, caso o widget esteja ativo.

2. Cadastro de Ambientes no Django Admin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Após subir os serviços, acesse o painel administrativo de cada aplicação (Integrador e Painel) para cadastrar as instâncias do Moodle disponíveis.

* No **Painel AVA**: Cadastre os Moodles em **Ambientes** informando a URL e a Cor Mestra para estilização dos cards no dashboard.
* No **Integrador AVA**: Cadastre os Moodles em **Ambientes**. Informe a URL, o Token do plugin e a **Expressão Seletora** (usando sintaxe `rule_engine`).
  
  * Exemplo de Expressão Seletora:
    `campus.sigla == "ZL"` (este Moodle receberá diários do Campus Zona Leste).
  * O Integrador avalia as expressões dos ambientes ativos em ordem crescente pelo campo `ordem`. O primeiro que retornar verdadeiro recebe o diário.

Implantação em Produção (Docker)
--------------------------------

O deploy da suite em produção é simplificado pelo uso de contêineres Docker das imagens oficiais publicadas no Docker Hub. Abaixo, apresenta-se um exemplo de arquivo ``docker-compose.yml`` completo, integrando o **Painel AVA**, o **Integrador AVA**, e suas dependências de cache e banco de dados.

Exemplo de arquivo `docker-compose.yml` para produção:

.. code-block:: yaml

   services:
     cache:
       image: redis:7.2-alpine
       healthcheck:
         test: ["CMD", "redis-cli", "ping"]
         interval: 5s
         timeout: 3s
         retries: 3

     db:
       image: postgres:16-alpine
       environment:
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=altere_esta_senha_em_producao
       volumes:
         - "./volumes/db_data:/var/lib/postgresql/data"
       healthcheck:
         test: ["CMD", "pg_isready", "-U", "postgres"]
         interval: 5s
         timeout: 3s
         retries: 3

     integrador:
       image: ctezlifrn/avaintegrador:latest
       ports:
         - "8091:8000"
       environment:
         - POSTGRES_HOST=db
         - POSTGRES_DATABASE=integrador
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=altere_esta_senha_em_producao
         - DJANGO_DEBUG=False
         - DJANGO_ALLOWED_HOSTS=integrador.suainstituicao.edu.br
         - DJANGO_SECRET_KEY=chave_secreta_django_do_integrador_aqui
         - OAUTH_BASE_URL=https://suap.suainstituicao.edu.br
         - OAUTH_CLIENT_ID=client_id_do_integrador_no_suap
         - OAUTH_CLIENT_SECRET=client_secret_do_integrador_no_suap
         - OAUTH_REDIRECT_URI=https://integrador.suainstituicao.edu.br/authenticate/
         - SUAP_INTEGRADOR_KEY=token_de_seguranca_compartilhado_com_suap
       depends_on:
         cache:
           condition: service_healthy
         db:
           condition: service_healthy

     painel:
       image: ctezlifrn/avapainel:latest
       ports:
         - "8092:8000"
       environment:
         - POSTGRES_HOST=db
         - POSTGRES_DATABASE=painel
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=altere_esta_senha_em_producao
         - DJANGO_DEBUG=False
         - DJANGO_ALLOWED_HOSTS=ava.suainstituicao.edu.br
         - DJANGO_SECRET_KEY=chave_secreta_django_do_painel_aqui
         - OAUTH_BASE_URL=https://suap.suainstituicao.edu.br
         - OAUTH_CLIENT_ID=client_id_do_painel_no_suap
         - OAUTH_CLIENT_SECRET=client_secret_do_painel_no_suap
         - OAUTH_REDIRECT_URI=https://ava.suainstituicao.edu.br/authenticate/
         - SUAP_INTEGRADOR_KEY=token_de_seguranca_compartilhado_com_suap
         - SHOW_VLIBRAS=True
         - SHOW_USERWAY=False
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
