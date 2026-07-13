Configurações do Painel AVA
===========================

Esta página documenta **todas** as configurações e variáveis de ambiente utilizadas pelo **Painel AVA** (localizado em ``./painel_ava``).

Essas configurações estão organizadas de acordo com a estrutura de módulos contida na pasta ``src/settings/`` do projeto.

Configurações Básicas e de Debug (``indebug.py``)
-------------------------------------------------

* **``DJANGO_DEBUG``** (Bool, Padrão: ``False``):
  Define se o Django rodará em modo de depuração. **Importante:** Em produção, esta variável deve ser definida como ``False``.

Configurações de Segurança e Contas (``securities.py``)
-------------------------------------------------------

* **``DJANGO_SECRET_KEY``** (String, Padrão: ``"#warning: changeme"``):
  Chave secreta exclusiva do Django para fins de assinatura e criptografia de sessões/cookies. Em produção, use uma chave complexa e secreta de pelo menos 50 caracteres.
* **``DJANGO_LOGIN_URL``** (String, Padrão: ``"http://localhost:8092/login/"``):
  A URL de redirecionamento para login do usuário.
* **``DJANGO_LOGIN_REDIRECT_URL``** (String, Padrão: ``"http://localhost:8092/"``):
  A URL para onde o usuário é enviado após autenticação bem-sucedida.
* **``DJANGO_LOGOUT_REDIRECT_URL``** (String, Padrão: ``"https://suap.ifrn.edu.br/comum/logout/"``):
  A URL de redirecionamento após o logout.
* **``DJANGO_AUTH_USER_MODEL``** (String, Padrão: ``"a4.Usuario"``):
  O modelo de usuário customizado utilizado para a autenticação.
* **``DJANGO_CSRF_COOKIE_DOMAIN``** (String, Padrão: ``None``):
  O domínio para o qual o cookie CSRF será válido.
* **``DJANGO_CSRF_COOKIE_NAME``** (String, Padrão: ``"csrftoken"``):
  Nome do cookie utilizado para a proteção de CSRF.
* **``DJANGO_CSRF_COOKIE_PATH``** (String, Padrão: ``"/"``):
  O caminho configurado no cookie CSRF.
* **``DJANGO_CSRF_COOKIE_SAMESITE``** (String, Padrão: ``"Lax"``):
  Diretiva SameSite para o cookie CSRF.
* **``DJANGO_CSRF_FAILURE_VIEW``** (String, Padrão: ``"django.views.csrf.csrf_failure"``):
  A view chamada em caso de falha na validação CSRF.
* **``DJANGO_CSRF_HEADER_NAME``** (String, Padrão: ``"HTTP_X_CSRFTOKEN"``):
  Nome do cabeçalho da requisição HTTP que carrega o token CSRF.
* **``SUAP_INTEGRADOR_KEY``** (String, Padrão: ``"#warning: changeme"``):
  Token de API de segurança utilizado na comunicação e validação de requisições provenientes do SUAP.
* **``SUAP_BASE_URL``** (String, Padrão: ``"https://suap.ifrn.edu.br"``):
  URL base da instância principal do SUAP.

**Configuração do Provedor OAuth2 (SGA/SUAP):**

* **``OAUTH_BASE_URL``** (String, Padrão: ``"https://suap.ifrn.edu.br"``):
  URL base utilizada pelo provedor de autenticação e identificação OAuth2.
* **``OAUTH_AUTHORIZE_URL``** (String, Padrão: ``"{OAUTH_BASE_URL}/o/authorize/"``):
  Endpoint de autorização OAuth2.
* **``OAUTH_TOKEN_URL``** (String, Padrão: ``"{OAUTH_BASE_URL}/o/token/"``):
  Endpoint para troca do authorization code pelo token de acesso.
* **``OAUTH_USERINFO_URL``** (String, Padrão: ``"{OAUTH_BASE_URL}/api/rh/eu/"``):
  Endpoint para obter dados pessoais do usuário autenticado.
* **``OAUTH_VINCULOS_URL``** (String, Padrão: ``"{OAUTH_BASE_URL}/api/rh/meus-vinculos/"``):
  Endpoint de consulta aos vínculos acadêmicos e funcionais do usuário.
* **``OAUTH_CLIENT_ID``** (String, Padrão: ``"#warning: changeme"``):
  Client ID registrado no provedor OAuth2.
* **``OAUTH_CLIENT_SECRET``** (String, Padrão: ``"#warning: changeme"``):
  Client Secret correspondente ao registro OAuth2.
* **``OAUTH_REDIRECT_URI``** (String, Padrão: ``"http://painel/authenticate/"``):
  URI de redirecionamento configurada no provedor OAuth2.

Configurações de Banco de Dados (``databases.py``)
-------------------------------------------------

* **``POSTGRES_ENGINE``** (String, Padrão: ``"django.db.backends.postgresql"``):
  O engine do banco de dados utilizado.
* **``POSTGRES_HOST``** (String, Padrão: ``"db"``):
  Host de conexão do PostgreSQL.
* **``POSTGRES_PORT``** (String/Int, Padrão: ``"5432"``):
  Porta de conexão do PostgreSQL.
* **``POSTGRES_DATABASE``** (String, Padrão: ``"painel"``):
  Nome da base de dados PostgreSQL.
* **``POSTGRES_USER``** (String, Padrão: ``"ava_user"``):
  Nome do usuário de banco de dados.
* **``POSTGRES_PASSWORD``** (String, Padrão: ``"ava_pass"``):
  Senha do usuário do banco de dados.
* **``POSTGRES_OPTIONS``** (String, Padrão: ``""``):
  Opções de conexão extras passadas ao driver PostgreSQL.

**Pool de Conexões (Opcional):**

* **``DEFAULT_POOL_ACTIVE``** (Bool, Padrão: ``False``):
  Habilita ou desabilita o pool de conexões com o PostgreSQL.
* **``DEFAULT_POOL_MIN_SIZE``** (Int, Padrão: ``1``):
  Tamanho mínimo do pool de conexões.
* **``DEFAULT_POOL_MAX_SIZE``** (Int, Padrão: ``100``):
  Tamanho máximo do pool de conexões.
* **``DEFAULT_POOL_NAME``** (String, Padrão: ``""``):
  Nome associado ao pool.
* **``DEFAULT_POOL_TIMEOUT``** (Int, Padrão: ``1``):
  Tempo limite de aquisição de conexão no pool.
* **``DEFAULT_POOL_MAX_LIFETIME``** (Int, Padrão: ``1200``):
  Tempo de vida útil máximo de uma conexão física em segundos.
* **``DEFAULT_POOL_MAX_IDLE``** (Int, Padrão: ``600``):
  Tempo máximo de inatividade em segundos de uma conexão antes de ser liberada.
* **``DEFAULT_POOL_RECONNECT_TIMEOUT``** (Int, Padrão: ``300``):
  Tempo de espera antes de tentar restabelecer uma conexão perdida.
* **``DEFAULT_POOL_NUM_WORKERS``** (Int, Padrão: ``3``):
  Quantidade de threads paralelas para monitoramento do pool.

Configurações de Cache (``caches.py``)
--------------------------------------

* **``DJANGO_CACHES_DEFAULT_LOCATION``** (String/List, Padrão: ``"redis://cache:6379/1"``):
  URL de conexão da instância do Redis usada como cache da aplicação.
* **``DASHBOARD_CACHE_ENABLED``** (Bool, Padrão: ``False``):
  Habilita o cacheamento dos dados de cards e turmas exibidos no dashboard principal do Painel.
* **``DASHBOARD_CACHE_TIMEOUT``** (Int, Padrão: ``300``):
  Tempo de expiração (TTL) em segundos das requisições em cache do dashboard.

Configurações de Aplicativos e Customizações (``apps.py`` / ``developments.py``)
---------------------------------------------------------------------------------

* **``SHOW_USERWAY``** (Bool, Padrão: ``True``):
  Habilita a exibição do botão e do widget de acessibilidade do UserWay.
* **``USERWAY_ACCOUNT``** (String, Padrão: ``None``):
  Chave de conta do UserWay associada à instituição.
* **``SHOW_VLIBRAS``** (Bool, Padrão: ``True``):
  Exibe o widget flutuante de tradução em Libras (VLibras) na interface do usuário.
* **``SHOW_SUPPORT_FORM``** (Bool, Padrão: ``True``):
  Determina se exibe o formulário de suporte e chamados.
* **``SHOW_SUPPORT_CHAT``** (Bool, Padrão: ``True``):
  Determina se exibe o botão ou balão de chat de suporte online.
* **``HOSTNAME``** (String, Padrão: ``"-"``):
  Nome do host identificador da máquina servidora atual (útil para auditoria e logs).
* **``MY_APPS``** (List, Padrão: ``["theme_ifrn23", "theme_ifrn25", "backup", "painel", "health", "base"]``):
  Lista de módulos e aplicações internas que compõem a lógica de negócios da aplicação.
* **``THIRD_APPS``** (List, Padrão: contendo bibliotecas de terceiros como ``django_extensions``, ``sass_processor``, etc.):
  Configuração de bibliotecas externas integradas ao framework.
* **``DJANGO_APPS``** (List, contendo as apps nativas do Django):
  Lista das aplicações padrão do framework Django.
* **``HACK_APPS``** (List, Padrão: ``["a4"]``):
  Módulos de interceptação e middlewares de autenticação/sessão adaptados da suite.
* **``DEV_APPS``** (List, Padrão: ``["debug_toolbar"]``):
  Aplicações que serão carregadas em modo desenvolvimento para depuração e inspeção.

Configurações de E-mail (``emails.py``)
---------------------------------------

* **``DJANGO_EMAIL_BACKEND``** (String, Padrão: ``"django.core.mail.backends.smtp.EmailBackend"``):
  O backend de e-mail utilizado.
* **``DJANGO_EMAIL_FILE_PATH``** (String, Padrão: ``None``):
  O diretório para salvar e-mails em formato de texto caso o backend de arquivos esteja ativo.
* **``DJANGO_EMAIL_HOST``** (String, Padrão: ``"mail"``):
  Servidor SMTP de envio de e-mails.
* **``DJANGO_EMAIL_PORT``** (Int, Padrão: ``1025``):
  Porta do servidor SMTP.
* **``DJANGO_EMAIL_HOST_USER``** (String, Padrão: ``""``):
  Usuário de autenticação no servidor SMTP.
* **``DJANGO_EMAIL_HOST_PASSWORD``** (String, Padrão: ``""``):
  Senha de autenticação no servidor SMTP.
* **``DJANGO_EMAIL_SUBJECT_PREFIX``** (String, Padrão: ``""``):
  Prefixo a ser inserido no assunto de cada e-mail disparado pelo sistema.
* **``DJANGO_EMAIL_USE_LOCALTIME``** (Bool, Padrão: ``False``):
  Se ativado, utiliza a hora local em vez de UTC nos cabeçalhos de data de e-mail.
* **``DJANGO_EMAIL_USE_TLS``** (Bool, Padrão: ``False``):
  Habilita criptografia de transporte TLS para a conexão SMTP.
* **``DJANGO_EMAIL_USE_SSL``** (Bool, Padrão: ``False``):
  Habilita criptografia SSL na conexão com o servidor SMTP.
* **``DJANGO_EMAIL_SSL_CERTFILE``** (String, Padrão: ``None``):
  Caminho para o certificado SSL da conexão.
* **``DJANGO_EMAIL_SSL_KEYFILE``** (String, Padrão: ``None``):
  Caminho para a chave privada SSL da conexão.
* **``DJANGO_EMAIL_TIMEOUT``** (Int/Bool, Padrão: ``None``):
  Timeout da conexão com o servidor de e-mails em segundos.
* **``DJANGO_DEFAULT_FROM_EMAIL``** (String, Padrão: ``"Atendimento do SUAP-Login <cte.ead@ifrn.edu.br>"``):
  Endereço de e-mail padrão do remetente.
* **``DEFAULT_REPLYTO_EMAIL``** (List, Padrão: ``["Atendimento do SUAP-Login <cte.ead@ifrn.edu.br>"]``):
  Lista de e-mails para preenchimento do cabeçalho "Reply-To" (Responder Para).

Configurações de Rotas e Recursos (``routings.py``)
---------------------------------------------------

* **``DJANGO_WSGI_APPLICATION``** (String, Padrão: ``"wsgi.application"``):
  Caminho do arquivo de inicialização WSGI do servidor.
* **``DJANGO_ROOT_URL_PATH``** (String, Padrão: ``""``):
  Prefixo de rota base (caso o app seja servido sob um subdiretório de URL).
* **``DJANGO_ROOT_URLCONF``** (String, Padrão: ``"urls"``):
  Caminho do arquivo principal de roteamento de URLs.
* **``DJANGO_MEDIA_URL``** (String, Padrão: ``"{ROOT_URL_PATH}/media/"``):
  URL pública para acessar arquivos de mídia e uploads dos usuários.
* **``DJANGO_MEDIA_ROOT``** (String, Padrão: ``"/app/media"``):
  Diretório absoluto no servidor onde os uploads físicos serão salvos.
* **``DJANGO_STATIC_URL``** (String, Padrão: ``"static/"``):
  URL para acesso a arquivos estáticos (CSS, JS, Imagens).
* **``DJANGO_STATIC_ROOT``** (String, Padrão: ``"/app/static"``):
  Diretório físico absoluto no servidor onde o comando ``collectstatic`` consolidará os arquivos.
* **``MARKDOWNX_URLS_PATH``** (String, Padrão: ``"{ROOT_URL_PATH}/markdownx/markdownify/"``):
  URL da API de renderização Markdown.
* **``MARKDOWNX_UPLOAD_URLS_PATH``** (String, Padrão: ``"{ROOT_URL_PATH}/markdownx/upload/"``):
  URL do endpoint de upload de mídias via Markdown.

Configurações de Sessão e Cookies (``sessions.py``)
---------------------------------------------------

* **``DJANGO_SESSION_KEY``** (String, Padrão: ``"painelava"``):
  Chave identificadora única do cookie de sessão.
* **``DJANGO_SESSION_COOKIE_NAME``** (String, Padrão: ``"{SESSION_KEY}_sessionid"``):
  Nome final gerado para o cookie de sessão do usuário no navegador.
* **``DJANGO_SESSION_COOKIE_DOMAIN``** (String, Padrão: ``None``):
  Domínio configurado para validade do cookie de sessão.
* **``DJANGO_SESSION_COOKIE_PATH``** (String, Padrão: ``"/"``):
  Caminho configurado no cookie de sessão.
* **``DJANGO_SESSION_COOKIE_SAMESITE``** (String, Padrão: ``"Lax"``):
  Definição de segurança SameSite do cookie de sessão (ex: ``"Lax"``, ``"Strict"``, ``"None"``).
* **``DJANGO_SESSION_FILE_PATH``** (String, Padrão: ``None``):
  Caso a sessão seja gravada em arquivos, diretório onde elas serão persistidas.
* **``DJANGO_SESSION_SERIALIZER``** (String, Padrão: ``"django.contrib.sessions.serializers.JSONSerializer"``):
  Classe utilizada pelo Django para serialização dos dados da sessão.
* **``DJANGO_SESSION_ENGINE``** (String, Padrão: ``"django.contrib.sessions.backends.cache"``):
  Engine de armazenamento de sessão. Por padrão, utiliza o cache Redis de alto desempenho.

Configurações de Monitoramento e Logs (``observabilities.py`` / ``loggings.py``)
--------------------------------------------------------------------------------

* **``GTAG_CODE``** (String, Padrão: ``None``):
  Código do Google Analytics (Tag global do site) injetado na interface do portal.
* **``CLARITY_CODE``** (String, Padrão: ``None``):
  Token de rastreamento do Microsoft Clarity para gravação de sessões e análise de usabilidade.
* **``SENTRY_DNS``** (String, Padrão: ``None``):
  Endereço de DSN exclusivo do projeto cadastrado no Sentry.
* **``SENTRY_ENVIRONMENT``** (String, Padrão: ``"local"``):
  Ambiente de execução enviado ao Sentry para fins de agrupamento e triagem de erros (ex: ``production``, ``staging``).
* **``SENTRY_RELEASE``** (String, Padrão: versão corrente da aplicação):
  Versão de release do código mapeada nos relatórios de erros do Sentry.
* **``DJANGO_LOGLEVEL``** (String, Padrão: ``"DEBUG"``):
  Severidade mínima de logs capturados na saída padrão (stdout) e arquivos da aplicação.

Configurações de Internacionalização (``internationalizations.py``)
---------------------------------------------------------------------

* **``DJANGO_USE_I18N``** (String/Bool, Padrão: ``"pt-br"`` / ``True``):
  Habilita o sistema de tradução do Django e serve como base para definição de ``LANGUAGE_CODE`` e ``TIME_ZONE``.
