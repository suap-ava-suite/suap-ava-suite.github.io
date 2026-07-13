Configurações do Integrador AVA
==============================

Esta página documenta **todas** as configurações e variáveis de ambiente utilizadas pelo **Integrador AVA** (localizado em ``./integrador_ava``).

Essas configurações estão organizadas de acordo com a estrutura de módulos contida na pasta ``src/settings/`` do projeto.

Informações de Título e Metadados do Projeto (``project.py``)
-------------------------------------------------------------

* **``PROJECT_TITLE``** (String, Padrão: ``"Integrador AVA"``):
  Título principal do projeto/middleware de integração.
* **``PROJECT_SUBTITLE``** (String, Padrão: ``"Sistema de integração de ambientes virtuais de aprendizagem"``):
  Subtítulo descritivo exibido no painel de administração e endpoints.
* **``PROJECT_VERSION``** (String, Padrão: ``"1.1.063"``):
  Versão instalada do Integrador.
* **``PROJECT_COPYRIGHT``** (String, Padrão: ``"©2025 IFRN"``):
  Assinatura de direitos autorais.
* **``PROJECT_LICENSE``** (String, Padrão: ``"Licença MIT"``):
  Licença de distribuição do software.
* **``PROJECT_LICENSE_URL``** (String, Padrão: ``"https://opensource.org/license/mit"``):
  Link oficial contendo os termos da licença.

Configurações Básicas e de Debug (``developments.py``)
------------------------------------------------------

* **``DJANGO_DEBUG``** (Bool, Padrão: ``True``):
  Define se o framework Django rodará em modo debug. **Aviso:** Deve ser definido como ``False`` em produção.

Configurações de Segurança e Roteamentos (``securities.py``)
-------------------------------------------------------------

* **``SUAP_INTEGRADOR_KEY``** (String, Sem padrão):
  Token de API de segurança que deve ser enviado nas chamadas REST do SUAP para autenticação de requisições.
* **``SUAP_BASE_URL``** (String, Padrão: ``"https://suap.ifrn.edu.br"``):
  URL base da instância principal do SUAP.
* **``DJANGO_SECRET_KEY``** (String, Padrão: ``"changeme"``):
  Chave secreta de hashing do Django para sessões e tokens CSRF. Deve ser alterada em produção (mínimo de 50 caracteres).
* **``DJANGO_LOGIN_URL``** (String, Padrão: ``"/login/"``):
  URL padrão do formulário de autenticação.
* **``DJANGO_LOGIN_REDIRECT_URL``** (String, Padrão: ``"/admin/"``):
  Rota para onde o usuário é enviado após logar com sucesso.
* **``DJANGO_LOGOUT_REDIRECT_URL``** (String, Padrão: ``"{SUAP_BASE_URL}/comum/logout"``):
  URL final de redirecionamento após o encerramento da sessão.
* **``GO_TO_HTTPS``** (Bool, Padrão: ``False``):
  Força o uso de cookies seguros e redirecionamentos para conexões HTTPS.
* **``AUTHENTICATION_BACKENDS``** (List, Padrão: ``["django.contrib.auth.backends.ModelBackend"]``):
  Mecanismos de backend de autenticação do Django.
* **``DJANGO_AUTH_PASSWORD_VALIDATORS``** (List, Padrão: ``[]``):
  Lista de validadores de complexidade de senhas ativados.

**Configuração do Cliente OAuth2 (SGA/SUAP):**

* **``OAUTH_BASE_URL``** (String, Padrão: ``"https://suap.ifrn.edu.br"``):
  URL raiz do provedor de identidade acadêmico.
* **``OAUTH_AUTHORIZE_URL``** (String, Padrão: ``"{OAUTH_BASE_URL}/o/authorize/"``):
  URL do endpoint de autorização OAuth2.
* **``OAUTH_TOKEN_URL``** (String, Padrão: ``"{OAUTH_BASE_URL}/o/token/"``):
  Endpoint de emissão do token OAuth2.
* **``OAUTH_USERINFO_URL``** (String, Padrão: ``"{OAUTH_BASE_URL}/api/rh/eu/"``):
  URL para obtenção de dados básicos do usuário (nome, login, etc.).
* **``OAUTH_REDIRECT_URI``** (String, Padrão: ``""``):
  Callback URL registrada no provedor de autenticação.
* **``OAUTH_CLIENT_ID``** (String, Sem padrão):
  Identificador do cliente de integração da suite registrado no SUAP.
* **``OAUTH_CLIENT_SECRET``** (String, Sem padrão):
  Chave secreta correspondente ao cliente de integração cadastrado.
* **``OAUTH_VERIFY_SSL``** (Bool, Padrão: ``True``):
  Define se as chamadas de API feitas pelo orquestrador exigem a validação de certificado SSL.

**Configuração de CORS (Cross-Origin Resource Sharing):**

* **``DJANGO_CORS_ALLOWED_ORIGINS``** (List, Padrão: ``[]``):
  Origens/hosts específicos autorizados a realizar chamadas cross-origin de API.
* **``DJANGO_CORS_ALLOWED_ORIGIN_REGEXES``** (List, Padrão: ``[]``):
  Expressões regulares para autorização dinâmica de origens CORS.
* **``DJANGO_CORS_ALLOW_ALL_ORIGINS``** (Bool, Padrão: ``False``):
  Se ``True``, permite requisições AJAX a partir de qualquer endereço. **Perigoso em produção.**
* **``DJANGO_CORS_URLS_REGEX``** (String, Padrão: ``r"^.*$"``):
  Regexp que limita as URLs internas expostas via CORS.
* **``DJANGO_CORS_ALLOW_METHODS``** (List, Padrão: verbos HTTP comuns):
  Métodos HTTP autorizados para requisições cross-site.
* **``DJANGO_CORS_ALLOW_HEADERS``** (List, Padrão: ``[]``):
  Cabeçalhos HTTP customizados autorizados nas requisições do navegador.
* **``DJANGO_CORS_EXPOSE_HEADERS``** (List, Padrão: ``[]``):
  Cabeçalhos da resposta HTTP expostos ao cliente.
* **``DJANGO_CORS_PREFLIGHT_MAX_AGE``** (Int, Padrão: ``86400``):
  Tempo limite de cacheamento em segundos do preflight CORS pelo navegador.
* **``DJANGO_CORS_ALLOW_CREDENTIALS``** (Bool, Padrão: ``False``):
  Permite o envio de cookies e cabeçalhos de autorização em chamadas CORS.
* **``DJANGO_CORS_ALLOW_PRIVATE_NETWORK``** (Bool, Padrão: ``False``):
  Permite requisições CORS partindo ou destinando-se a redes locais/privadas.

**Configuração de CSRF (Cross-Site Request Forgery):**

* **``DJANGO_CSRF_COOKIE_AGE``** (Int, Padrão: ``31536000``):
  Tempo de expiração em segundos do cookie CSRF.
* **``DJANGO_CSRF_COOKIE_DOMAIN``** (String, Padrão: ``None``):
  Domínio de validade do cookie CSRF.
* **``DJANGO_CSRF_COOKIE_HTTPONLY``** (Bool, Padrão: ``True``):
  Se ativo, impede leitura do cookie CSRF via Javascript (proteção XSS).
* **``DJANGO_CSRF_COOKIE_NAME``** (String, Padrão: ``"csrftoken"``):
  Nome do cookie gravado no navegador.
* **``DJANGO_CSRF_COOKIE_PATH``** (String, Padrão: ``"/"``):
  Caminho associado ao cookie CSRF.
* **``DJANGO_CSRF_COOKIE_SAMESITE``** (String, Padrão: ``"Lax"``):
  Controle de envio em contextos cross-site.
* **``DJANGO_CSRF_COOKIE_SECURE``** (Bool, Padrão: assume o valor de ``GO_TO_HTTPS``):
  Exige conexão HTTPS segura para transmitir o cookie CSRF.
* **``DJANGO_CSRF_USE_SESSIONS``** (Bool, Padrão: ``False``):
  Armazena o token CSRF na sessão do usuário ao invés de cookie.
* **``DJANGO_CSRF_FAILURE_VIEW``** (String, Padrão: ``"integrador.views_errors.csrf_failure"``):
  View customizada chamada em falhas de validação CSRF.
* **``DJANGO_CSRF_HEADER_NAME``** (String, Padrão: ``"HTTP_X_CSRFTOKEN"``):
  Cabeçalho HTTP contendo o token no envio.
* **``DJANGO_CSRF_TRUSTED_ORIGINS``** (List, Padrão: ``[]``):
  Lista de origens confiáveis para requisições inseguras (ex: ``POST``) via subdomínios.

Configurações de Banco de Dados (``databases.py``)
-------------------------------------------------

* **``POSTGRES_ENGINE``** (String, Padrão: ``"django.db.backends.postgresql"``):
  Motor/driver Django de banco de dados.
* **``POSTGRES_HOST``** (String, Padrão: ``"db"``):
  Endereço de rede do banco de dados PostgreSQL.
* **``POSTGRES_PORT``** (String/Int, Padrão: ``"5432"``):
  Porta do PostgreSQL.
* **``POSTGRES_DATABASE``** (String, Padrão: ``"integrador"``):
  Nome da base de dados PostgreSQL.
* **``POSTGRES_USER``** (String, Padrão: ``"postgres"``):
  Usuário do banco de dados.
* **``POSTGRES_PASSWORD``** (String, Padrão: ``"postgres"``):
  Senha do usuário do banco de dados.
* **``POSTGRES_OPTIONS``** (String, Padrão: ``""``):
  Opções adicionais passadas na string de conexão do driver.

Configurações de Cache (``caches.py``)
--------------------------------------

* **``DJANGO_CACHES_DEFAULT_BACKEND``** (String, Padrão: ``"django.core.cache.backends.redis.RedisCache"``):
  Backend de cache configurado.
* **``DJANGO_CACHES_DEFAULT_LOCATION``** (List/String, Padrão: ``["redis://cache:6379/1"]``):
  URLs dos nós de conexão da instância Redis.
* **``DASHBOARD_CACHE_ENABLED``** (Bool, Padrão: ``True``):
  Habilita cacheamento dos endpoints do dashboard administrativo do Integrador.
* **``DASHBOARD_CACHE_TIMEOUT``** (Int, Padrão: ``300``):
  Tempo limite de validade do cache em segundos.

Configurações de Rotas e Recursos (``routings.py``)
---------------------------------------------------

* **``DJANGO_WSGI_APPLICATION``** (String, Padrão: ``"wsgi.application"``):
  Módulo de entrada WSGI do app Django.
* **``DJANGO_ROOT_URLCONF``** (String, Padrão: ``"urls"``):
  Módulo principal que define as URLs e endpoints.
* **``DJANGO_ROOT_URL_PATH``** (String, Padrão: ``""``):
  Subdiretório de URL base (ex: caso rode sob ``/integrador``).
* **``DJANGO_STATIC_URL``** (String, Padrão: ``"/static/"``):
  Endereço URL público dos arquivos estáticos.
* **``DJANGO_STATIC_ROOT``** (String, Padrão: ``"/app/static"``):
  Diretório absoluto de consolidação física dos recursos estáticos estáticos.
* **``DJANGO_MEDIA_URL``** (String, Padrão: ``"/media/"``):
  Caminho URL público de downloads e uploads.
* **``DJANGO_MEDIA_ROOT``** (String, Padrão: ``"/app/media"``):
  Diretório absoluto físico para mídias geradas em disco.

Configurações de E-mail (``emails.py``)
---------------------------------------

* **``DJANGO_EMAIL_BACKEND``** (String, Padrão: ``"django.core.mail.backends.smtp.EmailBackend"``):
  Backend de envio de e-mails configurado.
* **``DJANGO_EMAIL_FILE_PATH``** (String, Padrão: ``None``):
  Caminho físico se usar o backend de arquivos.
* **``DJANGO_EMAIL_HOST``** (String, Padrão: ``"mail"``):
  Endereço do host SMTP.
* **``DJANGO_EMAIL_PORT``** (Int, Padrão: ``1025``):
  Porta do host SMTP.
* **``DJANGO_EMAIL_HOST_USER``** (String, Padrão: ``""``):
  Usuário SMTP.
* **``DJANGO_EMAIL_HOST_PASSWORD``** (String, Padrão: ``""``):
  Senha SMTP.
* **``DJANGO_EMAIL_SUBJECT_PREFIX``** (String, Padrão: ``""``):
  Prefixo anexado no início do título de e-mails disparados.
* **``DJANGO_EMAIL_USE_LOCALTIME``** (Bool, Padrão: ``False``):
  Envia e-mails com data e fuso horários ajustados localmente.
* **``DJANGO_EMAIL_USE_TLS``** (Bool, Padrão: ``False``):
  Habilita encriptação TLS.
* **``DJANGO_EMAIL_USE_SSL``** (Bool, Padrão: ``False``):
  Habilita encriptação SSL.
* **``DJANGO_EMAIL_SSL_KEYFILE``** (String, Padrão: ``None``):
  Caminho da chave privada SSL de conexão SMTP.
* **``DJANGO_EMAIL_TIMEOUT``** (Int, Padrão: ``None``):
  Tempo limite de conexão SMTP em segundos.
* **``DJANGO_DEFAULT_FROM_EMAIL``** (String, Padrão: ``"Atendimento do integrador SUAP-MOODLE <cte.ead@ifrn.edu.br>"``):
  E-mail padrão utilizado como remetente.
* **``DEFAULT_REPLYTO_EMAIL``** (List, Padrão: ``["Atendimento do integrador SUAP-MOODLE <cte.ead@ifrn.edu.br>"]``):
  E-mail configurado no cabeçalho "Reply-To" (Responder Para).

Configurações de Sessão e Cookies (``sessions.py``)
---------------------------------------------------

* **``DJANGO_SESSION_ENGINE``** (String, Padrão: ``"django.contrib.sessions.backends.cache"``):
  Backend de armazenamento das sessões ativas (Padrão: Cache Redis).
* **``DJANGO_SESSION_CACHE_ALIAS``** (String, Padrão: ``"default"``):
  Alias de cache a ser utilizado para as sessões.
* **``DJANGO_SESSION_COOKIE_SAMESITE``** (String, Padrão: ``"Lax"``):
  Diretiva SameSite configurada nos cookies de sessão.

Configurações de Observabilidade (``observabilities.py`` / ``loggings.py``)
--------------------------------------------------------------------------

* **``SENTRY_DSN``** ou **``SENTRY_DNS``** (String, Padrão: ``None``):
  Endereço de DSN exclusivo do Sentry para capturar exceções da aplicação.
* **``SENTRY_DEFAULT_INTEGRATIONS``** (Bool, Padrão: ``True``):
  Define se as integrações padrão do SDK do Sentry serão inicializadas.
* **``SENTRY_SAMPLE_RATE``** (Int, Padrão: ``100``):
  Amostragem percentual de erros enviados ao Sentry (100 = todos os erros).
* **``SENTRY_TRACES_SAMPLE_RATE``** (Int, Padrão: ``100``):
  Amostragem de traços de telemetria enviados.
* **``SENTRY_SEND_DEFAULT_PII``** (Bool, Padrão: ``True``):
  Se ativo, envia dados pessoais associados a falhas (ex: identificação de usuário logado).
* **``SENTRY_DEBUG``** (Bool, Padrão: ``False``):
  Ativa o modo debug interno do SDK Sentry.
* **``SENTRY_ENVIRONMENT``** (String, Padrão: ``"local"``):
  Classificação do ambiente na console Sentry (ex: ``production``, ``staging``).
* **``SENTRY_MAX_BREADCRUMBS``** (Int, Padrão: ``100``):
  Número máximo de logs de histórico de passos do usuário gravados em um report de crash.
* **``SENTRY_PROFILES_SAMPLE_RATE``** (Int, Padrão: ``100``):
  Taxa percentual de amostragem de profiles gravados no sentry.
* **``SENTRY_RELEASE``** (String, Padrão: versão corrente da aplicação):
  Versão de release do código mapeada nos relatórios de erros do Sentry.
* **``DJANGO_LOGLEVEL``** (String, Padrão: ``"INFO"`` / ``"DEBUG"``):
  Severidade mínima padrão capturada pelos loggers.

Configurações de Internacionalização (``internationalizations.py``)
---------------------------------------------------------------------

* **``DJANGO_LANGUAGE_CODE``** (String, Padrão: ``"pt-br"``):
  Código de idioma base do painel.
* **``DJANGO_TIME_ZONE``** (String, Padrão: ``"America/Fortaleza"``):
  Fuso horário para cálculos de data e hora.
* **``DJANGO_USE_I18N``** (Bool, Padrão: ``True``):
  Habilita o sistema de tradução do Django.
* **``DJANGO_USE_L10N``** (Bool, Padrão: ``True``):
  Habilita a formatação localizada de dados (datas, números).
* **``DJANGO_USE_TZ``** (Bool, Padrão: ``True``):
  Se ativo, o Django armazenará datas com timezone nos bancos (recomendado).
* **``DJANGO_USE_THOUSAND_SEPARATOR``** (Bool, Padrão: ``True``):
  Habilita separadores de milhares nas visualizações numéricas.

Configurações de Aplicativos Integrados (``apps.py``)
-----------------------------------------------------

* **``MY_APPS``** (List, Padrão: ``["cohort", "integrador", "security", "dashboard", "base", "dsgovbr", "health"]``):
  Lista de módulos locais do integrador.
* **``THIRD_APPS``** (List, contendo ``import_export``, ``django_rule_engine``, etc.):
  Bibliotecas utilitárias carregadas pelo framework.
* **``HACK_APPS``** (List, Padrão: ``["hacks"]``):
  Aplicações que adicionam hacks ou interceptações na lógica interna da suite.

Configurações do Mock do Moodle (``integrador/moodle_mock.py``)
---------------------------------------------------------------

Utilizadas exclusivamente para ambiente de testes locais e simulação de resposta da API do Moodle:

* **``MOODLE_HTTP_MOCK_ENABLED``** (Bool, Padrão: ``False``):
  Se ativado, responde chamadas REST do Moodle por mocks locais estáticos.
* **``MOODLE_HTTP_MOCK_BACKGROUND``** (Bool, Padrão: ``False``):
  Inicia o mock server em segundo plano.
* **``MOODLE_HTTP_MOCK_HOST``** (String, Padrão: ``"127.0.0.1"``):
  Endereço de rede em que o mock de Moodle receberá requisições.
* **``MOODLE_HTTP_MOCK_PORT``** (Int, Padrão: ``18091``):
  Porta do serviço local de mock.
