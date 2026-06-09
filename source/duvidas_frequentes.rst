Dúvidas Frequentes (FAQ)
========================

Esta seção reúne as principais perguntas e respostas enviadas pela comunidade sobre a integração entre o SUAP e o Moodle, organizadas para facilitar a consulta de acordo com cada perfil de atuação: **TIC**, **Professores** e **Secretaria Acadêmica**.



TIC (Tecnologia da Informação e Comunicação)
--------------------------------------------

Quem é o responsável pelo cadastro inicial dos usuários e como os papéis são atribuídos?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A origem primária dos dados de quem participa diretamente de um diário (estudantes, docentes, mediadores e tutores) é **sempre o SUAP**.

* **Coordenadores**: Atualmente, são cadastrados no SUAP. Devido a limitações temporárias de envio no SUAP, eles são cadastrados temporariamente no *Integrador AVA*, que se encarrega de enviá-los como Coorte para o Moodle. Há um esforço conjunto com a equipe de desenvolvimento do SUAP para que esse envio passe a ocorrer de forma nativa a partir da origem, garantindo que a coordenação também venha diretamente do SUAP.
* **Outros papéis**: São cadastrados diretamente no *Integrador AVA* e enviados via coorte, cuja distribuição é altamente flexível e controlada por um motor de regras (*rule engine*).

Após a integração, os dados dos usuários são sincronizados de forma automática ou demandam intervenção manual?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Existem dois fluxos de sincronização com comportamentos distintos:

* **Diários de Classe**: A sincronização de usuários e notas é iniciada de forma **manual** por um professor, coordenador ou secretário acadêmico. Isso garante supervisão humana sobre as alterações. Embora seja tecnicamente possível automatizar a sincronização agendando uma tarefa (*task*) no Celery do SUAP, **recomenda-se não automatizar**. Caso ocorra alguma discrepância temporária entre as notas do Moodle e do SUAP antes do momento desejado pelo professor para a consolidação, a responsabilidade poderá ser indevidamente atribuída à equipe de TIC.
* **Cursos FIC < 10h**: Projetados no IFRN para serem simplificados. O envio inicial do curso é manual, mas o retorno das notas para o SUAP ocorre de forma automática.

Como funciona o fluxo técnico de sincronização (SUAP -> Integrador AVA -> Moodle)?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A sincronização é sempre iniciada a partir do SUAP. Este aciona o middleware *Integrador AVA*, que por sua vez se comunica com o Moodle para a criação de ambientes e sincronização de dados (tanto de envio de matrículas quanto de retorno de notas). Detalhes adicionais sobre a arquitetura da solução estão documentados em https://suap-ava-suite.github.io/.

Como é tratada a movimentação de estudantes (inclusão, cancelamento ou transferência) no AVA após a matrícula no SUAP?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A atualização de movimentações acadêmicas não ocorre em tempo real de forma automática. O Moodle será atualizado com as novas informações somente quando for disparada uma nova sincronização do diário de classe no SUAP (seja pelo professor, coordenação ou secretaria).

É necessário que mediadores e tutores tenham acesso ao SUAP para que consigam lançar notas no AVA?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Não. A atividade pedagógica e o lançamento de notas por parte de mediadores e tutores acontecem exclusivamente no Moodle (AVA). O acesso ao SUAP só é necessário para os profissionais responsáveis por disparar a sincronização ou realizar a importação oficial das notas (geralmente o professor responsável pelo diário, a coordenação ou a secretaria).

Quais são as limitações conhecidas e boas práticas de infraestrutura recomendadas?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Não cadastre usuários manualmente no Moodle**: Adicionar professores, coordenadores ou alunos diretamente no Moodle por fora do fluxo oficial causará problemas. A sincronização subsequente do SUAP pode reverter ou ignorar essas alterações manuais.
* **Uso de Containers**: Recomenda-se implantar os serviços da suite utilizando contêineres para facilitar a manutenção e escalabilidade do ambiente.
* **Uso de Temas**:
  * O *Tema 2023* está obsoleto e deve ser desativado.
  * O *Tema 2025* está estável e serve como boa base (com possibilidade de personalização).
  * O *Tema 2026* está em desenvolvimento e adotará o padrão de identidade visual do Governo Federal (DS GovBR).
* **Autenticação SUAP**: O uso do plugin de autenticação integrada (*auth_suap*) via OAuth2 não é obrigatório, mas é altamente recomendado para uma melhor experiência de login unificado dos usuários.
* **Modelagem Lógica (1 Diário = 1 Curso)**: Mantenha sempre a correspondência direta da integração (1 diário no SUAP = 1 curso no Moodle, 1 matrícula = 1 usuário, 1 inscrição em diário = 1 *enrolment* em curso). Evite juntar múltiplos diários em um único curso para simplificar a navegação dos docentes, pois isso quebrará a lógica da sincronização de envio de diários e de baixa de notas.
* **Colaboração**: Se desenvolver melhorias no código ou correções de bugs, faça um *fork* do repositório oficial e compartilhe suas modificações por meio de um *Pull Request*.

Como podemos visualizar o funcionamento real e a interface da integração?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A integração propriamente dita é um processo de comunicação *back-end* entre servidores (comunicação server/server/server entre o SUAP, Integrador AVA e Moodle) e não possui uma interface visual complexa dedicada. Capturas de tela e fluxos de funcionamento podem ser consultados no site oficial da suíte (https://suap-ava-suite.github.io/).

---

Professores
-----------

Como as notas do Moodle são enviadas para o diário do SUAP?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A sincronização e consolidação das notas finais não são automáticas em tempo real. Você deve realizar o lançamento e a avaliação de atividades no Moodle e, no momento desejado para consolidar, clicar no botão **"Importar Notas Moodle"** na página do diário correspondente no SUAP.

Como o livro de notas do Moodle deve ser configurado para que a importação funcione?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para que o SUAP consiga identificar a qual avaliação do diário a nota do Moodle se refere, o quadro de notas do Moodle precisa utilizar no campo **Número de identificação (ID number)** as mesmas siglas padrão do diário do SUAP (ex: `N1`, `N2`, `N3`, `N4`, `NAF`). A nota final consolidada em cada categoria ou atividade configurada com esse ID number será a importada. Para um guia visual passo a passo de como fazer isso, consulte a seção :ref:`configuracao_notas` no Guia do Professor.

Posso adotar metodologias de avaliação e estruturas de notas diferentes de acordo com o PPC do meu curso?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sim. O Moodle oferece total flexibilidade para a criação de diferentes atividades de avaliação, pesos e critérios conforme o Projeto Pedagógico do Curso (PPC). A integração exige apenas que a nota final consolidada de cada etapa letiva esteja no item ou categoria de nota identificada com a sigla correspondente do SUAP (como `N1`, `N2`, etc.).

Como os dados cadastrais e as matrículas dos alunos são atualizados na minha sala do Moodle?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Quando ocorrerem mudanças na situação de alunos no SUAP (como novas matrículas ou cancelamentos), você pode atualizar a lista de alunos da sala virtual clicando no botão de sincronização de diário no SUAP. Você também pode consultar o guia detalhado em https://suap-ava-suite.github.io/ para mais orientações.

---

Secretaria Acadêmica
--------------------

Quem é o responsável pela criação das turmas e diários de classe no SUAP e no Moodle?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A criação e o registro oficial de turmas e diários são sempre de competência da **Secretaria Acadêmica** no SUAP. O Moodle funciona como a sala de aula digital; portanto, nenhuma turma ou diário deve ser criado manualmente no Moodle. O provisionamento no AVA deve ocorrer a partir do SUAP.

Quem realiza o cadastro inicial de estudantes, docentes, tutores e coordenadores?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

O cadastro de estudantes, docentes, tutores e mediadores deve ser realizado **sempre no SUAP**. Esses dados são sincronizados com o AVA a partir da ativação do diário. A vinculação de coordenadores e outros papéis institucionais é feita através do *Integrador AVA*.

O que acontece no AVA quando há inclusão, cancelamento ou transferência de matrícula de um discente?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Essas alterações de registro acadêmico devem ser inseridas primeiramente no SUAP pela secretaria. A atualização da lista de alunos no Moodle correspondente ocorrerá quando o diário for sincronizado novamente no SUAP (ação que pode ser iniciada tanto pela secretaria, coordenação quanto pelo professor do diário).

Existe algum material de apoio ou documentação de uso da integração?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Toda a documentação e orientações de uso da integração estão centralizadas na página oficial da Suite em https://suap-ava-suite.github.io/.

---

Comunidade e Eventos
--------------------

Como ficar por dentro de reuniões, novidades ou novos eventos da SUAP/AVA Suite?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Todas as comunicações sobre próximos eventos, reuniões e novidades de desenvolvimento são realizadas de forma centralizada através de nosso canal oficial no Telegram: https://t.me/+1hE3euH9Vnw4MmYx.
