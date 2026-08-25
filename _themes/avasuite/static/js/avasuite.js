document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // Theme toggle — mesmo mecanismo do mbkw/pages: atributo data-theme em <html>,
  // persistido em localStorage, default "light".
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeLabel = document.getElementById('themeLabel');
  const themeIcon = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeUI(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeUI(next);
    });
  }

  function updateThemeUI(theme) {
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Escuro' : 'Claro';
    }
    if (themeIcon && window.lucide) {
      themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'moon' : 'sun');
      lucide.createIcons();
    }
  }

  // Filtro instantâneo sobre a grade de repositórios da home. Diferente do
  // mbkw (que casa contra um atributo data-search dedicado), aqui casamos
  // direto contra o texto visível de cada card — sem exigir metadado extra
  // no RST. A busca "de verdade" (full-text, todas as páginas) continua
  // sendo a busca nativa do Sphinx no header.
  const searchInput = document.getElementById('searchInput');
  const sections = document.querySelectorAll('.category-section');

  if (searchInput && sections.length) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();

      sections.forEach((section) => {
        let visibleCardsInSection = 0;
        const cards = section.querySelectorAll('.sd-card');

        cards.forEach((card) => {
          const col = card.closest('.sd-col') || card;
          const searchText = card.innerText.toLowerCase();
          if (!query || searchText.includes(query)) {
            col.style.display = '';
            visibleCardsInSection++;
          } else {
            col.style.display = 'none';
          }
        });

        section.style.display = query && visibleCardsInSection === 0 ? 'none' : '';
      });
    });
  }
});
