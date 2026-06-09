.. SUAP/AVA Suite documentation master file, created by
   sphinx-quickstart on Tue Jun  9 18:08:00 2026.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

SUAP/AVA Suite documentation
============================

Este repositório contém a documentação centralizada da SUAP/AVA Suite, um conjunto de plugins Moodle e middlewares para integração com Sistemas de Gestão Acadêmica (SGA), como o SUAP do IFRN.

Estrutura da Documentação
-------------------------
A documentação foi organizada em seções direcionadas para cada perfil de usuário e técnico que interage com o ecossistema:

1. :doc:`Visão Geral para Gestores <visao_geral>`: Apresentação de alto nível da suíte, contextualizando a integração entre as múltiplas instâncias do Moodle e o SUAP. Explica de forma executiva os benefícios da centralização (Painel AVA) e da automação (Integrador AVA).
2. :doc:`Guia do Desenvolvedor e Infraestrutura <desenvolvimento_implantacao>`: Explicação da arquitetura de microsserviços, guia de setup local com Docker Compose, mapeamento das variáveis de ambiente críticas, instalação de gates de qualidade (`pre-commit` e limites de cobertura de testes unitários) e instalação dos plugins no Moodle.
3. :doc:`Guia da Secretaria Acadêmica <secretaria>`: Instruções para a equipe de registro escolar sobre como habilitar diários e cursos no SUAP para que a sincronização ocorra, além de guias de resolução para problemas comuns de acesso.
4. :doc:`Guia do Professor (Docente) <professor>`: Manual prático explicando como solicitar a sincronização de diários, como puxar notas do Moodle para o SUAP e a **configuração crítica e obrigatória do livro de notas do Moodle**.


.. toctree::
   :maxdepth: 2
   :caption: Sumário:

   visao_geral
   desenvolvimento_implantacao
   secretaria
   professor
