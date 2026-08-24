.. SUAP/AVA Suite documentation master file, created by
   sphinx-quickstart on Tue Jun  9 18:08:00 2026.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

SUAP/AVA Suite documentation
============================

.. raw:: html

   <div style="text-align: center; margin-left: auto; margin-right: auto; width: 80%;">
      🎯 **Projetada pela tradição inovadora do IFRN, pronta para qualquer instituição** que use o SUAP e o Moodle.
   </div>

O que é a SUAP/AVA Suite?
-------------------------

A **SUAP/AVA Suite** é um ecossistema open-source de integração entre **Sistemas de Gestão Acadêmica (SGA)** — como o SUAP, SIGAA e qAcadêmico — e o **Moodle LMS**. Com ela, instituições de ensino eliminam o trabalho manual de sincronização de turmas, alunos e professores: tudo flui automaticamente do SGA para o AVA, com notas e frequências sincronizadas de volta.


Por que usar?
-------------------------

+---------------------------------------------------+-------------------------------------------------------+
| Problema comum                                    | Como a Suite resolve                                  |
+===================================================+=======================================================+
| Cadastro manual de turmas e usuários no Moodle    | Sincronização automática via API a partir do SGA      |
+---------------------------------------------------+-------------------------------------------------------+
| Login separado para o AVA                         | Autenticação OAuth2 com as credenciais institucionais |
+---------------------------------------------------+-------------------------------------------------------+
| Alunos perdem cursos espalhados em vários Moodles | Painel unificado com todos os cursos em um só lugar   |
+---------------------------------------------------+-------------------------------------------------------+

Estrutura da Documentação
-------------------------

Este repositório contém a documentação centralizada da SUAP/AVA Suite, um conjunto de plugins Moodle e middlewares para integração com Sistemas de Gestão Acadêmica (SGA), como o SUAP do IFRN.

A documentação foi organizada em seções direcionadas para cada perfil de usuário e técnico que interage com o ecossistema:

1. :doc:`Visão Geral para Gestores <visao_geral>`: Apresentação de alto nível da suíte, contextualizando a integração entre as múltiplas instâncias do Moodle e o SUAP. Explica de forma executiva os benefícios da centralização (Painel AVA) e da automação (Integrador AVA).
2. :doc:`Guia do Desenvolvedor e Infraestrutura <desenvolvimento_implantacao>`: Explicação da arquitetura de microsserviços, guia de setup local com Docker Compose, mapeamento das variáveis de ambiente críticas, instalação de gates de qualidade (`pre-commit` e limites de cobertura de testes unitários) e instalação dos plugins no Moodle.
3. :doc:`Repositórios do Ecossistema <repositorios>`: Catálogo de todos os repositórios da organização — plugins Moodle, aplicações Django, bibliotecas Python e infraestrutura — com link para cada repositório e sua documentação própria.
4. :doc:`Guia da Secretaria Acadêmica <secretaria>`: Instruções para a equipe de registro escolar sobre como habilitar diários e cursos no SUAP para que a sincronização ocorra, além de guias de resolução para problemas comuns de acesso.
5. :doc:`Guia do Professor (Docente) <professor>`: Manual prático explicando como solicitar a sincronização de diários, como puxar notas do Moodle para o SUAP e a **configuração crítica e obrigatória do livro de notas do Moodle**.
6. :doc:`Dúvidas Frequentes (FAQ) <duvidas_frequentes>`: Respostas para dúvidas comuns sobre o funcionamento e boas práticas de integração da suite, divididas pelos perfis de TIC, Professores e Secretaria Acadêmica.

.. toctree::
   :maxdepth: 2
   :caption: Sumário:

   visao_geral
   desenvolvimento_implantacao
   repositorios
   secretaria
   professor
   duvidas_frequentes
