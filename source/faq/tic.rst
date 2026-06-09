TIC (Tecnologia da Informação e Comunicação)
============================================

Esta seção do FAQ é destinada à equipe de TI, infraestrutura, administradores de sistemas e desenvolvedores responsáveis pela implantação e manutenção da SUAP/AVA Suite.

Quem é o responsável pelo cadastro inicial dos usuários e como os papéis são atribuídos?
--------------------------------------------------------------------------------------------

A origem primária dos dados de quem participa diretamente de um diário (estudantes, docentes, mediadores e tutores) é **sempre o SUAP**.

* **Coordenadores**: Atualmente, são cadastrados no SUAP. Devido a limitações temporárias de envio no SUAP, eles são cadastrados temporariamente no *Integrador AVA*, que se encarrega de enviá-los como Coorte para o Moodle. Há um esforço conjunto com a equipe de desenvolvimento do SUAP para que esse envio passe a ocorrer de forma nativa a partir da origem, garantindo que a coordenação também venha diretamente do SUAP.
* **Outros papéis**: São cadastrados diretamente no *Integrador AVA* e enviados via coorte, cuja distribuição é altamente flexível e controlada por um motor de regras (*rule engine*).

Após a integração, os dados dos usuários são sincronizados de forma automática ou demandam intervenção manual?
-------------------------------------------------------------------------------------------------------------------

Existem dois fluxos de sincronização com comportamentos distintos:

* **Diários de Classe**: A sincronização de usuários e notas é iniciada de forma **manual** por um professor, coordenador ou secretário acadêmico. Isso garante supervisão humana sobre as alterações. Embora seja tecnicamente possível automatizar a sincronização agendando uma tarefa (*task*) no Celery do SUAP, **recomenda-se não automatizar**. Caso ocorra alguma discrepância temporária entre as notas do Moodle e do SUAP antes do momento desejado pelo professor para a consolidação, a responsabilidade poderá ser indevidamente atribuída à equipe de TIC.
* **Cursos FIC < 10h**: Projetados no IFRN para serem simplificados. O envio inicial do curso é manual, mas o retorno das notas para o SUAP ocorre de forma automática.

Como funciona o fluxo técnico de sincronização (SUAP -> Integrador AVA -> Moodle)?
-------------------------------------------------------------------------------------

A sincronização é sempre iniciada a partir do SUAP. Este aciona o middleware *Integrador AVA*, que por sua vez se comunica com o Moodle para a criação de ambientes e sincronização de dados (tanto de envio de matrículas quanto de retorno de notas). Detalhes adicionais sobre a arquitetura da solução estão documentados em https://cte-zl-ifrn.github.io/.

Como é tratada a movimentação de estudantes (inclusão, cancelamento ou transferência) no AVA após a matrícula no SUAP?
--------------------------------------------------------------------------------------------------------------------------

A atualização de movimentações acadêmicas não ocorre em tempo real de forma automática. O Moodle será atualizado com as novas informações somente quando for disparada uma nova sincronização do diário de classe no SUAP (seja pelo professor, coordenação ou secretaria).

É necessário que mediadores e tutores tenham acesso ao SUAP para que consigam lançar notas no AVA?
------------------------------------------------------------------------------------------------------

Não. A atividade pedagógica e o lançamento de notas por parte de mediadores e tutores acontecem exclusivamente no Moodle (AVA). O acesso ao SUAP só é necessário para os profissionais responsáveis por disparar a sincronização ou realizar a importação oficial das notas (geralmente o professor responsável pelo diário, a coordenação ou a secretaria).

Quais são as limitações conhecidas e boas práticas de infraestrutura recomendadas?
-------------------------------------------------------------------------------------

* **Não cadastre usuários manualmente no Moodle**: Adicionar professores, coordenadores ou alunos diretamente no Moodle por fora do fluxo oficial causará problemas. A sincronização subsequente do SUAP pode reverter ou ignorar essas alterações manuais.
* **Uso de Containers**: Recomenda-se implantar os serviços da suite utilizando contêineres para facilitar a manutenção e escalabilidade do ambiente.
* **Uso de Temas**:
  * O *Tema 2023* está obsoleto e deve ser desativado.
  * O *Tema 2025* está estável e serve como boa base (com possibilidade de personalização).
  * O *Tema 2026* está em desenvolvimento e adotará o padrão de identidade visual do Governo Federal (DS GovBR).
* **Autenticação SUAP**: O uso do plugin de autenticação integrada (*auth_suap*) via OAuth2 não é obrigatório, mas é altamente recomendado para uma melhor experiência de login unificado dos usuários.
* **Modelagem Lógica (1 Diário = 1 Curso)**: Mantenha sempre a correspondência direta da integração (1 diário no SUAP = 1 curso no Moodle, 1 matrícula = 1 usuário, 1 inscrição em diário = 1 *enrolment* em curso). Evite juntar múltiplos diários em um único curso para simplificar a navegação dos docentes, pois isso quebrará a lógica da sincronização de notas.
* **Colaboração**: Se desenvolver melhorias no código ou correções de bugs, faça um *fork* do repositório oficial e compartilhe suas modificações por meio de um *Pull Request*.

Como podemos visualizar o funcionamento real e a interface da integração?
---------------------------------------------------------------------------

A integração propriamente dita é um processo de comunicação *back-end* entre servidores (comunicação server/server/server entre o SUAP, Integrador AVA e Moodle) e não possui uma interface visual complexa dedicada. Capturas de tela e fluxos de funcionamento podem ser consultados no site oficial da suíte (https://suap-ava-suite.github.io/).

Como ficar por dentro de reuniões, novidades ou novos eventos da SUAP/AVA Suite?
----------------------------------------------------------------------------------

Todas as comunicações sobre próximos eventos, reuniões e novidades de desenvolvimento são realizadas de forma centralizada através de nosso canal oficial no Telegram: https://t.me/+1hE3euH9Vnw4MmYx.
