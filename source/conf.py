# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'SUAP/AVA Suite'
copyright = '2026, IFRN/CTE-ZL'
author = 'IFRN/CTE-ZL'

version = '1.0'
release = '1.0.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['sphinx_design']

templates_path = ['_templates']
exclude_patterns = []

language = 'pt_BR'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'avasuite'
html_theme_path = ['../_themes']
html_static_path = ['_static']
html_js_files = ['js/avasuite.js']
html_logo = 'logo.png'

html_theme_options = {
    'github_url': 'https://github.com/suap-ava-suite',
    'brand_name': 'SUAP/AVA Suite',
    'brand_short': 'SA',
}
