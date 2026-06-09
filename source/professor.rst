Guia do Professor (Docente)
===========================

Esta seção orienta os **Professores** sobre o uso da **SUAP/AVA Suite**, explicando como enviar a sincronização do diário para o Moodle, como importar as notas de volta para o SUAP e o **requisito obrigatório** de configuração do Livro de Notas do Moodle.

Sincronizando o Diário (SUAP -> Moodle)
---------------------------------------

Quando a secretaria acadêmica autoriza a integração do diário, o professor passa a ter controle da sincronização de sua sala de aula virtual.

1. **Acesse o Diário**: Entre no SUAP, vá no diário de sua disciplina correspondente.
2. **Solicite a Sincronização**: Clique no botão **"Sincronizar com o AVA"** (ou botão equivalente com ícone do Moodle).
3. **Aguarde a Criação**: Em poucos segundos, o Integrador AVA criará a sala no Moodle correspondente e matriculará todos os discentes e docentes secundários (tutores/mediadores).
4. **Link de Acesso**: O SUAP exibirá o link direto para a sala do Moodle (ex.: `https://academico.ava.ifrn.edu.br/course/view.php?id=XXX`).

Sincronização de Notas (Moodle -> SUAP)
---------------------------------------

O ecossistema permite que o professor desenvolva todas as atividades e avaliações no Moodle e, no fim da etapa letiva, traga as notas agregadas de volta para o SUAP com um clique.

Para realizar a importação:

1. Acesse o Diário no SUAP.
2. Clique na opção **"Importar Notas do Moodle"** (ou **"Sincronizar Notas"**).
3. O SUAP buscará os valores correspondentes de cada estudante através da API e preencherá as notas da caderneta.
4. Revise os dados e clique em **"Salvar"** para consolidar.

.. _configuracao_notas:

Requisito Obrigatório: Configuração do Livro de Notas do Moodle
---------------------------------------------------------------

Para que o SUAP consiga ler as notas de cada estudante no Moodle, **o Livro de Notas (Gradebook) do Moodle precisa estar configurado para utilizar as siglas padrões do SUAP no campo de identificação (ID number) de cada avaliação.**

Se esta configuração não for feita, a sincronização de notas importará valores em branco ou errados.

Os identificadores válidos suportados por padrão pela integração são:

* **`N1`**: Nota da Primeira Avaliação
* **`N2`**: Nota da Segunda Avaliação
* **`N3`**: Nota da Terceira Avaliação (caso aplicável)
* **`N4`**: Nota da Quarta Avaliação (caso aplicável)
* **`NAF`**: Nota da Avaliação Final

Mapeamento Visual das Avaliações
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: text

   No Moodle (Configuração do Livro de Notas)           No SUAP (Diário de Classe)
   ┌─────────────────────────────────────────┐          ┌─────────────────────────┐
   │ Item / Categoria de Notas               │          │ Notas Oficiais          │
   │ [Número de ID: N1]                      ├─────────►│ Avaliação 1 (N1)        │
   │ (Pode ser uma média de tarefas do Moodle)│         │                         │
   ├─────────────────────────────────────────┤          ├─────────────────────────┤
   │ Item / Categoria de Notas               │          │                         │
   │ [Número de ID: N2]                      ├─────────►│ Avaliação 2 (N2)        │
   │ (Pode ser uma prova única no Moodle)    │          │                         │
   ├─────────────────────────────────────────┤          ├─────────────────────────┤
   │ Item / Categoria de Notas               │          │                         │
   │ [Número de ID: NAF]                     ├─────────►│ Avaliação Final (NAF)   │
   └─────────────────────────────────────────┘          └─────────────────────────┘

Como configurar o Número de ID (ID number) no Moodle:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para associar as notas do Moodle ao SUAP, siga este passo a passo no Moodle:

1. **Acesse as Notas**:
   No menu lateral esquerdo do seu curso no Moodle, clique em **Notas** (ou *Grades*).
   
2. **Vá em Configuração**:
   No menu suspenso superior da tela de notas, mude a visualização para **Configuração do Livro de Notas** (ou *Gradebook setup*).

3. **Escolha o Item ou Categoria**:
   * Se você usa uma categoria para agrupar várias tarefas de uma etapa (ex: Média da Etapa 1), clique em **Editar -> Editar Configurações** na linha correspondente à **Categoria de Notas** da etapa.
   * Se você usa uma única atividade como avaliação da etapa (ex: uma Prova no Moodle), clique em **Editar -> Editar Configurações** na linha daquela **Atividade**.

4. **Defina o Número de ID**:
   * No formulário de configurações, expanda a seção **Item de Nota** (clique em *Mostrar Mais*, se necessário).
   * Localize o campo **Número de identificação** (ou *ID number*).
   * Digite o identificador correspondente exatamente em letras maiúsculas: **`N1`**, **`N2`**, **`N3`**, **`N4`** ou **`NAF`**.
   
   .. warning::
      O identificador é **case-sensitive**. Digitar `n1` em letras minúsculas ou `Nota 1` fará a integração falhar para este item. Deve ser exatamente **`N1`**.

5. **Salve as Alterações**:
   Role até o fim do formulário e clique em **Salvar mudanças**.

6. **Repita para as Demais Etapas**:
   Repita os passos 3 a 5 para as outras etapas do diário (configurando `N2` para a segunda nota, `NAF` para a avaliação final, etc.).
