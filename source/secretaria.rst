Guia da Secretaria Acadêmica
============================

Esta seção é destinada aos **Secretários Acadêmicos** e equipes de registro escolar. Aqui você aprenderá como gerenciar e autorizar a integração dos diários do SUAP para o Moodle.

Conceito Importante: SUAP vs. Moodle
------------------------------------

Para orientar alunos e professores, tenha sempre em mente:

* **SUAP (SGA)**: É onde reside o **registro oficial acadêmico** (matrícula, histórico, notas consolidadas, diários de classe oficiais).
* **Moodle (AVA)**: É a **sala de aula digital** (onde as aulas ocorrem, os materiais são disponibilizados e as atividades são realizadas). Nenhum registro acadêmico oficial nasce no Moodle.

A sincronização faz com que as informações cadastradas no SUAP sejam enviadas automaticamente para o Moodle correto.

Como Iniciar a Integração (Passo a Passo)
-----------------------------------------

Para que um diário ou sala de coordenação apareça no Moodle, a secretaria precisa primeiro autorizar a sua integração no SUAP.

1. **Acessar o Diário de Classe no SUAP**:
   Navegue até o módulo acadêmico e localize o diário da disciplina correspondente à turma e período letivo vigentes.

2. **Habilitar Integração com o AVA**:
   Na página de gerenciamento do diário de classe no SUAP, procure pela opção **"Integração com Moodle"** (ou **"Integração com AVA"**).
   Ative esta flag. Ao marcar a caixa de integração, você está concedendo permissão para que o diário seja provisionado no Moodle.

3. **Coordenação de Curso (Salas de Coordenação)**:
   A mesma regra se aplica às salas de coordenação de curso. Para que a coordenação tenha uma sala unificada no Moodle (para avisos gerais e contato com todos os discentes do curso), ela precisa ser habilitada nas opções de gerenciamento do curso dentro do SUAP.

O Que Acontece Após a Autorização?
----------------------------------

Uma vez que a secretaria autorizou a integração no SUAP:

1. O diário fica elegível para sincronização.
2. O **professor da disciplina** ou a própria secretaria poderá clicar no botão **"Sincronizar"** na página do diário para realizar o provisionamento imediato.
3. O Integrador AVA criará a categoria do campus, do curso, o semestre, a turma e, por fim, a sala do curso no Moodle.
4. Os alunos regularmente matriculados e os professores associados no SUAP são inscritos automaticamente no curso no Moodle.

Resolução de Problemas Comuns
-----------------------------

1. Aluno não consegue ver a sala do diário no Moodle
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Causa**: O aluno pode estar em situação de "Matrícula Trancada", "Cancelada" ou o diário não foi sincronizado após a sua matrícula tardia.
* **Solução**:

  * Verifique a situação da matrícula do discente no SUAP. Apenas alunos em situação **"Ativo"** no diário são matriculados e mantidos ativos no Moodle.
  * Solicite ao professor ou realize você mesmo uma nova **sincronização** do diário no SUAP para atualizar a lista de alunos inscritos.

2. O diário não aparece na lista de integração do SUAP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Causa**: O componente curricular ou o curso pode estar configurado sem a flag de integração ativa na matriz curricular do SUAP.
* **Solução**: Verifique com a coordenação de curso ou a equipe de TI se a matriz curricular do curso permite a oferta de diários integrados com o AVA.

3. Sala de aula criada no Moodle incorreto
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Causa**: Regra de roteamento incorreta no Integrador AVA (baseada no campus ou modalidade do curso).
* **Solução**: Entre em contato com a equipe de TI/Infraestrutura para que revisem a **Expressão Seletora** (*rule_engine*) do ambiente Moodle correspondente no painel de administração do Integrador.
