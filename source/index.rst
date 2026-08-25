.. SUAP/AVA Suite documentation master file, created by
   sphinx-quickstart on Tue Jun  9 18:08:00 2026.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

SUAP/AVA Suite
===============

.. rst-class:: hero-pill

   🎯 Ecossistema Open Source de Integração SUAP ↔ Moodle

A **SUAP/AVA Suite** é um ecossistema open-source de integração entre **Sistemas de Gestão
Acadêmica (SGA)** — como o SUAP, SIGAA e qAcadêmico — e o **Moodle LMS**. Com ela, instituições
de ensino eliminam o trabalho manual de sincronização de turmas, alunos e professores: tudo
flui automaticamente do SGA para o AVA, com notas e frequências sincronizadas de volta.

Por que usar?
-------------

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - Problema comum
     - Como a Suite resolve
   * - Cadastro manual de turmas e usuários no Moodle
     - Sincronização automática via API a partir do SGA
   * - Login separado para o AVA
     - Autenticação OAuth2 com as credenciais institucionais
   * - Alunos perdem cursos espalhados em vários Moodles
     - Painel unificado com todos os cursos em um só lugar


Documentação por perfil
--------------------------

Além do catálogo acima, a documentação tem guias dedicados a cada perfil que interage com o
ecossistema:

* :doc:`Visão Geral para Gestores <visao_geral>` — apresentação executiva da suíte.
* :doc:`Guia do Desenvolvedor e Infraestrutura <desenvolvimento_implantacao>` — arquitetura,
  setup local, variáveis de ambiente e instalação dos plugins no Moodle.
* :doc:`Guia da Secretaria Acadêmica <secretaria>` — como habilitar diários e cursos no SUAP.
* :doc:`Guia do Professor (Docente) <professor>` — sincronização de diários e notas.
* :doc:`Dúvidas Frequentes (FAQ) <duvidas_frequentes>` — por perfil (TIC, Professores,
  Secretaria).


Repositórios do ecossistema
----------------------------

Todo repositório ativo na organização `suap-ava-suite <https://github.com/suap-ava-suite>`_ no
GitHub — o que cada um faz, sua tecnologia, e onde encontrar seu código e sua documentação
própria (quando publicada).

.. raw:: html

   <div class="search-box">
     <i data-lucide="search"></i>
     <input type="text" id="searchInput" class="search-input"
            placeholder="Buscar repositório por nome, tipo ou tecnologia..."
            aria-label="Buscar repositório" />
   </div>

.. container:: category-section

   .. rubric:: Plugins Moodle

   Instalados diretamente em cada instância do Moodle integrada à Suite.

   .. grid:: 1 1 2 3
      :gutter: 3

      .. grid-item-card:: auth_suap

         Autenticação OAuth2 via SUAP. Faz o login no Moodle e sincroniza dados do usuário,
         foto e campos de perfil customizados a cada acesso.

         :bdg:`PHP 8.3` :bdg:`OAuth2`
         +++

         `GitHub <https://github.com/suap-ava-suite/moodle-auth_suap>`__ ·
         `Documentação <https://suap-ava-suite.github.io/moodle-auth_suap/>`__

      .. grid-item-card:: local_suap

         Recebe as chamadas do Integrador AVA e aplica no Moodle: criação de categorias e
         cursos, matrícula de usuários e vínculo de coortes.

         :bdg:`PHP 8.3`
         +++

         `GitHub <https://github.com/suap-ava-suite/moodle-local_suap>`__ ·
         `Documentação <https://suap-ava-suite.github.io/moodle-local_suap/>`__

      .. grid-item-card:: tool_sga

         API HTTP de integração Moodle ↔ SGA: sincronização de categorias, cursos, usuários,
         coortes, matrículas e grupos, além do envio de notas de volta ao SGA.

         :bdg:`PHP 8.3`
         +++

         `GitHub <https://github.com/suap-ava-suite/moodle-tool_sga>`__ ·
         `Documentação <https://suap-ava-suite.github.io/moodle-tool_sga/>`__

      .. grid-item-card:: tool_painelava

         Integra o Moodle ao Painel AVA: API externa para recuperar os dados de cursos de um
         usuário organizados por tipo de curso.

         :bdg:`PHP 8.3`
         +++

         `GitHub <https://github.com/suap-ava-suite/moodle-tool_painelava>`__ ·
         `Documentação <https://suap-ava-suite.github.io/moodle-tool_painelava/>`__

.. container:: category-section

   .. rubric:: Aplicações Django

   Os middlewares e dashboards que orquestram a integração entre o SGA e as instâncias do
   Moodle.

   .. grid:: 1 1 2 3
      :gutter: 3

      .. grid-item-card:: Integrador AVA

         Middleware que conecta o SGA ao Moodle. SUAP como padrão principal, mais um padrão
         genérico para SIGAA, qAcadêmico ou outros. Roteia cada solicitação para o Moodle
         correto via um motor de regras sobre os Ambientes cadastrados.

         :bdg:`Django 6.0`
         +++

         `GitHub <https://github.com/suap-ava-suite/djangoapp-integrador_ava>`__ ·
         `Documentação <https://suap-ava-suite.github.io/djangoapp-integrador_ava/>`__

      .. grid-item-card:: Painel AVA

         Dashboard unificado: cada usuário acessa, em um só lugar, todos os cursos/diários em
         que está inscrito nas várias instâncias do Moodle integradas à Suite.

         :bdg:`Django 6.0`
         +++

         `GitHub <https://github.com/suap-ava-suite/djangoapp-painel_ava>`__ ·
         `Documentação <https://suap-ava-suite.github.io/djangoapp-painel_ava/>`__

.. container:: category-section

   .. rubric:: Bibliotecas Python

   Pacotes publicados no PyPI, reutilizados pelas aplicações Django acima.

   .. grid:: 1 1 2 3
      :gutter: 3

      .. grid-item-card:: auth-ava

         Modelos concretos e normalizados para autenticação e sincronização de dados do SUAP
         no ecossistema do AVA — usuário, múltiplos e-mails, vínculos e histórico.

         :bdg:`PyPI` :bdg:`Django`
         +++

         `GitHub <https://github.com/suap-ava-suite/djangoapp-auth_ava>`__ ·
         `Documentação <https://suap-ava-suite.github.io/djangoapp-auth_ava/>`__ ·
         `PyPI <https://pypi.org/project/auth-ava/>`__

      .. grid-item-card:: avaintegration-metapackage

         Metapacote Python 3.14 que agrega as dependências dos projetos Django 6.0 do
         ecossistema AVA do IFRN.

         :bdg:`PyPI`
         +++

         `GitHub <https://github.com/suap-ava-suite/pypkg-avaintegration_metapackage>`__ ·
         `Documentação <https://suap-ava-suite.github.io/pypkg-avaintegration_metapackage/>`__ ·
         `PyPI <https://pypi.org/project/avaintegration-metapackage/>`__

.. container:: category-section

   .. rubric:: Infraestrutura

   .. grid:: 1 1 2 3
      :gutter: 3

      .. grid-item-card:: cdn-suap_ava_suite

         Assets estáticos (imagens, diagramas) usados por esta documentação e pelo perfil da
         organização.

         :bdg:`PHP 8.3`
         +++

         `GitHub <https://github.com/suap-ava-suite/cdn-suap_ava_suite>`__

.. toctree::
   :maxdepth: 2
   :hidden:

   visao_geral
   desenvolvimento_implantacao
   secretaria
   professor
   duvidas_frequentes
