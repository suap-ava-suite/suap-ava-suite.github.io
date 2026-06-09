Visão Geral da SUAP/AVA Suite
=============================

Esta seção apresenta a **SUAP/AVA Suite** sob uma perspectiva gerencial, explicando o que é a solução, quais problemas ela resolve e quais são seus principais benefícios.

O que é a SUAP/AVA Suite?
-------------------------

A **SUAP/AVA Suite** é um ecossistema de integração e centralização de serviços acadêmicos que conecta o **SUAP** (Sistema Unificado de Administração Pública) e o **Moodle** (Ambiente Virtual de Aprendizagem - AVA). 

O IFRN possui uma infraestrutura descentralizada com múltiplas instâncias do Moodle (ex.: Moodle Acadêmico, Moodle Presencial, Moodle Aberto). A suíte serve como o elo de ligação entre o sistema de registro oficial (SUAP) e essas salas de aula virtuais.

.. image:: https://raw.githubusercontent.com/cte-zl-ifrn/.github/main/painel_ava-visao-geral.png
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

Principais Benefícios
---------------------

* **Garantia de Sincronia**: A lista de alunos matriculados no Moodle reflete sempre a situação real do SUAP.
* **Redução de Suporte**: Login unificado via SUAP SSO e portal único (Painel AVA) reduzem drasticamente chamados por perda de senha ou "curso sumido".
* **Agilidade no Início do Período**: Cursos e turmas criados em segundos pela secretaria ou pelo próprio docente.
* **Segurança e Integridade**: Notas importadas diretamente do Moodle para o SUAP, sem retrabalho de digitação.
