Visão Geral da SUAP/AVA Suite
=============================

O que é a SUAP/AVA Suite?
-------------------------

A **SUAP/AVA Suite** é um ecossistema open-source de integração entre **Sistemas de Gestão Acadêmica (SGA)** — como o SUAP, SIGAA e qAcadêmico — e o **Moodle LMS**. Com ela, instituições de ensino eliminam o trabalho manual de sincronização de turmas, alunos e professores: tudo flui automaticamente do SGA para o AVA, com notas e frequências sincronizadas de volta.


Visão arquitetural
------------------

.. image:: https://raw.githubusercontent.com/suap-ava-suite/cdn-suap_ava_suite/main/assets/diagram.png
   :width: 100%
   :alt: Visão do Ecossistema
   :align: center

O Problema Que Resolvemos
-------------------------

Antes da implantação da suíte, a gestão de múltiplos ambientes virtuais gerava diversos gargalos:

1. **Fragmentação de Acesso**: Alunos matriculados em cursos diferentes precisavam acessar múltiplos endereços de Moodle, decorando usuários e senhas distintos.
2. **Trabalho Manual Repetitivo**: Secretarias acadêmicas e equipes de TI precisavam criar cursos e matricular alunos/professores manualmente no início de cada período letivo.
3. **Inconsistência de Notas**: Os professores precisavam digitar notas manualmente em dois sistemas (Moodle e SUAP), aumentando o risco de erros de digitação.

A Solução
---------

A suíte resolve esses problemas por meio de dois pilares principais:

1. **Automação de Fluxos (Integrador AVA + Plugins)**:
   O **Integrador AVA** é um middleware inteligente. Quando uma secretaria autoriza ou um professor solicita a sincronização, o Integrador recebe a requisição do SUAP, identifica automaticamente a qual instância do Moodle aquele diário pertence (com base em regras, ex: sigla do campus) e cria a estrutura no Moodle de forma instantânea.
   
2. **Centralização de Acesso (Painel AVA)**:
   Um portal único onde alunos, professores e tutores visualizam todos os diários e coordenações em que estão inscritos, independentemente de estarem hospedados no Moodle Presencial, Acadêmico, de Projetos ou Aberto.

Componentes da Suíte
--------------------

A SUAP/AVA Suite é composta pelos seguintes softwares:

* **Integrador AVA**: O middleware orquestrador escrito em Python/Django.
* **Painel AVA**: O dashboard unificado de acesso rápido para discentes e docentes.
* **auth_suap**: Plugin de autenticação para Moodle que permite login via OAuth2 do SUAP e sincroniza perfis e fotos.
* **local_suap**: Plugin local para Moodle que executa o cadastro de diários, matrículas, coortes, grupos e viabiliza a extração de notas.
* **tool_painelava**: Plugin administrativo para Moodle que fornece APIs de leitura de cursos ao Painel AVA.
* **tool_sga**: Plugin administrativo (em desenvolvimento) para estender a integração a outros sistemas acadêmicos genéricos (como SIGAA ou qAcadêmico).

Fluxos de Integração e Status
-----------------------------

O ecossistema é estruturado em torno de fluxos de integração específicos:

* **Painel AVA ➔ tool_painelava** (Status: **Final / Estável**): Canal de leitura que possibilita ao Painel AVA listar em tempo real todos os cursos e diários do usuário final.
* **SUAP ➔ Integrador AVA ➔ local_suap** (Status: **Final / Estável**): Fluxo de escrita e sincronização bidirecional que cria diários, inscreve alunos/professores no Moodle e retorna notas/frequências ao SUAP.
* **SUAP ➔ Integrador AVA ➔ tool_sga** (Status: **Beta / Em desenvolvimento**): Canal planejado para compatibilizar a suite com outros SGAs (SIGAA, qAcadêmico, etc.).
* **Painel AVA ➔ local_suap** (Status: **Descontinuado**): Fluxo legado que foi descontinuado e substituído de forma definitiva pelo uso do `tool_painelava`.


Principais Benefícios
---------------------

* **Garantia de Sincronia**: A lista de alunos matriculados no Moodle reflete sempre a situação real do SUAP.
* **Redução de Suporte**: Login unificado via SUAP SSO e portal único (Painel AVA) reduzem drasticamente chamados por perda de senha ou "curso sumido".
* **Agilidade no Início do Período**: Cursos e turmas criados em segundos pela secretaria ou pelo próprio docente.
* **Segurança e Integridade**: Notas importadas diretamente do Moodle para o SUAP, sem retrabalho de digitação.

Comunidade, Reporte de Bugs e Contribuições
-------------------------------------------

Para acompanhar o desenvolvimento, discutir melhorias ou tirar dúvidas com outros usuários da suite:

* **Canal Oficial no Telegram**: Acesse `https://t.me/+1hE3euH9Vnw4MmYx <https://t.me/+1hE3euH9Vnw4MmYx>`_ para acompanhar novidades, anúncios de novas versões e discussões sobre bugs da suite.

Se você encontrar algum bug ou quiser solicitar novos recursos, as solicitações devem ser abertas diretamente no repositório do projeto correspondente no GitHub:

* **Repositório da Documentação / Site**: `suap-ava-suite.github.io <https://github.com/suap-ava-suite/suap-ava-suite.github.io>`_
* **Orquestrador de Ambientes (Workspace)**: `workspace <https://github.com/suap-ava-suite/workspace>`_
* **Middleware Django**: `djangoapp-integrador_ava <https://github.com/suap-ava-suite/djangoapp-integrador_ava>`_
* **Dashboard Django**: `djangoapp-painel_ava <https://github.com/suap-ava-suite/djangoapp-painel_ava>`_
* **Plugin Moodle de Autenticação**: `moodle-auth_suap <https://github.com/suap-ava-suite/moodle-auth_suap>`_
* **Plugin Moodle de Sincronização Local**: `moodle-local_suap <https://github.com/suap-ava-suite/moodle-local_suap>`_
* **Plugin Moodle Administrativo do Painel**: `moodle-tool_painelava <https://github.com/suap-ava-suite/moodle-tool_painelava>`_
* **Plugin Moodle Administrativo de SGA Genérico**: `moodle-tool_sga <https://github.com/suap-ava-suite/moodle-tool_sga>`_

**Melhor ainda**: Faça um **fork** do repositório correspondente, implemente a correção ou melhoria e abra um **Pull Request (PR)** solicitando a incorporação do seu código à branch principal. Toda colaboração da comunidade é muito bem-vinda!

