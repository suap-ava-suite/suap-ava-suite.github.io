# SUAP/AVA Suite – Documentação Oficial

Este repositório contém a documentação centralizada da **SUAP/AVA Suite**, um conjunto de plugins Moodle e middlewares para integração com Sistemas de Gestão Acadêmica (SGA), como o SUAP do IFRN.

A documentação é gerada usando o **Sphinx** e publicada automaticamente no **GitHub Pages** por meio de um workflow do GitHub Actions.

---

## 📂 Estrutura da Documentação

A documentação foi organizada em seções direcionadas para cada perfil de usuário e técnico que interage com o ecossistema:

1. **[Visão Geral para Gestores](source/visao_geral.rst)**:
   Apresentação de alto nível da suíte, contextualizando a integração entre as múltiplas instâncias do Moodle e o SUAP. Explica de forma executiva os benefícios da centralização (Painel AVA) e da automação (Integrador AVA).
2. **[Guia do Desenvolvedor e Infraestrutura](source/desenvolvimento_implantacao.rst)**:
   Explicação da arquitetura de microsserviços, guia de setup local com Docker Compose, mapeamento das variáveis de ambiente críticas, instalação de gates de qualidade (`pre-commit` e limites de cobertura de testes unitários) e instalação dos plugins no Moodle.
3. **[Guia da Secretaria Acadêmica](source/secretaria.rst)**:
   Instruções para a equipe de registro escolar sobre como habilitar diários e cursos no SUAP para que a sincronização ocorra, além de guias de resolução para problemas comuns de acesso.
4. **[Guia do Professor (Docente)](source/professor.rst)**:
   Manual prático explicando como solicitar a sincronização de diários, como puxar notas do Moodle para o SUAP e a **configuração crítica e obrigatória do livro de notas do Moodle** utilizando os identificadores (`idnumber`) **`N1`**, **`N2`**, **`N3`**, **`N4`** ou **`NAF`**.

---

## 🛠️ Desenvolvimento e Preview Local

Você pode compilar e visualizar as alterações no seu navegador antes de enviar os commits para o GitHub.

### Requisitos
* Python 3.12 ou superior
* Sistema operacional baseado em Linux/Unix ou macOS (inclusive WSL2)

### 1. Criar o Ambiente Virtual e Instalar Dependências
```bash
# Navegue até o repositório da documentação
cd ~/projetos/IFRN/suap-ava-suite/suap-ava-suite.github.io

# Crie o ambiente virtual do Python na pasta .venv
python3 -m venv .venv

# Ative o ambiente virtual
source .venv/bin/activate

# Instale os pacotes declarados no requirements.txt
pip install -r requirements.txt
```

### 2. Compilar para HTML
```bash
# Certifique-se de que o ambiente virtual está ativo (.venv)
make html
```

Os arquivos HTML compilados serão gerados no diretório `build/html/`. Você pode abrir o arquivo `build/html/index.html` em qualquer navegador para inspecionar o resultado.

---

## 🚀 Publicação e Deploy Contínuo (GitHub Actions)

A publicação no **GitHub Pages** é totalmente automatizada via GitHub Actions.

O arquivo de workflow está localizado em [`.github/workflows/sphinx.yml`](.github/workflows/sphinx.yml). A cada commit ou push enviado para a branch `main`, o GitHub compila automaticamente os fontes do Sphinx e publica o resultado final.

### ⚠️ Configuração Obrigatória no GitHub:
Como o deploy ocorre diretamente via Actions (sem branches intermediárias como a antiga `gh-pages`), garanta que o repositório esteja configurado corretamente no painel do GitHub:
1. No seu repositório do GitHub, vá em **Settings** (Configurações).
2. No menu lateral, clique em **Pages**.
3. Em **Build and deployment > Source**, escolha a opção **GitHub Actions**.

---

## 🤝 Contribuições

Para contribuir com correções de documentação ou adicionar novas seções:
1. Crie uma nova branch ou faça as alterações diretamente na `main` (se tiver acesso direto).
2. Escreva as páginas utilizando a sintaxe **reStructuredText (`.rst`)**.
3. Valide o build localmente rodando `make html` para garantir que não existam avisos (*warnings*) ou erros de sintaxe.
4. Envie o pull request ou faça o push para a branch `main` para que o site seja atualizado.