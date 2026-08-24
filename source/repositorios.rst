Repositórios do Ecossistema
============================

Esta página cataloga todos os repositórios que compõem a **SUAP/AVA Suite**, na organização
`suap-ava-suite <https://github.com/suap-ava-suite>`_ no GitHub — o que cada um faz, sua
tecnologia, e onde encontrar seu repositório e sua documentação própria (quando publicada).

Para o guia de arquitetura, integração entre os componentes e instalação, veja
:doc:`desenvolvimento_implantacao`.

Plugins Moodle
------------------

Instalados diretamente em cada instância do Moodle integrada à Suite.

moodle-auth_suap
~~~~~~~~~~~~~~~~~~~

.. image:: https://img.shields.io/badge/PHP-8.3-777bb4.svg
   :alt: PHP 8.3

Plugin de autenticação OAuth2 via SUAP. Faz o login no Moodle e sincroniza dados do usuário,
foto e campos de perfil customizados a cada acesso.

* Repositório: https://github.com/suap-ava-suite/moodle-auth_suap
* Documentação: https://suap-ava-suite.github.io/moodle-auth_suap/

moodle-local_suap
~~~~~~~~~~~~~~~~~~~~

.. image:: https://img.shields.io/badge/PHP-8.3-777bb4.svg
   :alt: PHP 8.3

Plugin local que recebe as chamadas do **Integrador AVA** e aplica no Moodle: criação de
categorias e cursos, matrícula de usuários e vínculo de coortes, entre outras operações de
sincronização acionadas pelo SUAP.

* Repositório: https://github.com/suap-ava-suite/moodle-local_suap
* Documentação: https://suap-ava-suite.github.io/moodle-local_suap/

moodle-tool_sga
~~~~~~~~~~~~~~~~~~

.. image:: https://img.shields.io/badge/PHP-8.3-777bb4.svg
   :alt: PHP 8.3

Admin tool que expõe uma API HTTP para integração entre o Moodle e o SGA: sincronização de
categorias, cursos, usuários, coortes, matrículas e grupos (SGA → Moodle), além do envio de
notas de volta ao SGA (Moodle → SGA).

* Repositório: https://github.com/suap-ava-suite/moodle-tool_sga
* Documentação: https://suap-ava-suite.github.io/moodle-tool_sga/

moodle-tool_painelava
~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: https://img.shields.io/badge/PHP-8.3-777bb4.svg
   :alt: PHP 8.3

Admin tool que integra o Moodle ao **Painel AVA**, expondo uma API externa para recuperar os
dados de cursos de um usuário organizados por tipo de curso.

* Repositório: https://github.com/suap-ava-suite/moodle-tool_painelava
* Documentação: https://suap-ava-suite.github.io/moodle-tool_painelava/

Aplicações Django
---------------------

Os middlewares e dashboards que orquestram a integração entre o SGA e as instâncias do Moodle.

djangoapp-integrador_ava
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: https://img.shields.io/badge/Django-6.0-092E20.svg
   :alt: Django 6.0

Middleware que conecta Sistemas de Gestão Acadêmica (SGA) ao Moodle. Suporta o SUAP como
padrão principal — pronto de fábrica para o IFRN — e um padrão SGA genérico para instituições
que usam SIGAA, qAcadêmico ou outro sistema acadêmico. Roteia cada solicitação para o Moodle
correto por meio de um motor de regras (``rule_engine``) sobre os **Ambientes** cadastrados.

* Repositório: https://github.com/suap-ava-suite/djangoapp-integrador_ava
* Documentação: ainda não publicada como site (o repositório tem notas em
  ``docs/*.md``, mas não há workflow de deploy para GitHub Pages configurado).

djangoapp-painel_ava
~~~~~~~~~~~~~~~~~~~~~~~

.. image:: https://img.shields.io/badge/Django-6.0-092E20.svg
   :alt: Django 6.0

Dashboard unificado: cada usuário acessa, em um só lugar, todos os cursos/diários em que está
inscrito nas diversas instâncias do Moodle integradas à Suite — sem precisar procurar em vários
Moodles separadamente. Consulta as instâncias em tempo real via o plugin ``tool_painelava``.

* Repositório: https://github.com/suap-ava-suite/djangoapp-painel_ava
* Documentação: https://suap-ava-suite.github.io/djangoapp-painel_ava/

Bibliotecas Python
-----------------------

Pacotes publicados no PyPI, reutilizados pelas aplicações Django acima.

auth-ava
~~~~~~~~~~

.. image:: https://img.shields.io/pypi/v/auth-ava
   :target: https://pypi.org/project/auth-ava/
   :alt: PyPI

App Django com modelos concretos e normalizados para autenticação e sincronização de dados do
SUAP no ecossistema do AVA — usuário, múltiplos e-mails, vínculos e histórico, reutilizados por
``painel_ava`` e ``integrador_ava``. Construído sobre o
`django-suap-auth <https://pypi.org/project/django-suap-auth/>`_.

* Repositório: https://github.com/suap-ava-suite/djangoapp-auth_ava
* Documentação: https://suap-ava-suite.github.io/djangoapp-auth_ava/
* PyPI: https://pypi.org/project/auth-ava/

avaintegration-metapackage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. image:: https://img.shields.io/pypi/v/avaintegration-metapackage
   :target: https://pypi.org/project/avaintegration-metapackage/
   :alt: PyPI

Metapacote Python 3.14 que agrega as dependências necessárias para os projetos Django 6.0 do
ecossistema AVA do IFRN (Integrador AVA, Painel AVA e demais aplicações do mesmo padrão).

* Repositório: https://github.com/suap-ava-suite/pypkg-avaintegration_metapackage
* Documentação: https://suap-ava-suite.github.io/pypkg-avaintegration_metapackage/
* PyPI: https://pypi.org/project/avaintegration-metapackage/

Infraestrutura
-------------------

cdn-suap_ava_suite
~~~~~~~~~~~~~~~~~~~~~

Repositório de assets estáticos (imagens, diagramas) usados por esta documentação e pelo
perfil da organização — por exemplo, o diagrama de arquitetura referenciado em
:doc:`desenvolvimento_implantacao`.

* Repositório: https://github.com/suap-ava-suite/cdn-suap_ava_suite

.. note::
   Esta lista reflete os repositórios ativos na organização no momento em que esta página foi
   escrita. Novos componentes da Suite devem ser adicionados aqui conforme forem criados.
