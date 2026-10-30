/**
 * APP.JS - COMPORTAMIENTOS BASE INTERACTIVOS
 * Proyecto: «¿Qué aprendí y qué cambió en mi manera de pensar?» — Fe y Razón
 * Código Vanilla JS puro, sin dependencias, modular y seguro.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgressBar();
  initScrollSpy();
  initSectionFilter();
  initDensityToggle();
  initPrintButton();
});

/**
 * 1. Barra de progreso de lectura en el borde superior
 */
function initReadingProgressBar() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/**
 * 2. ScrollSpy: Resalta el enlace activo en la barra sticky de navegación
 */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section-block');
  if (!navLinks.length || !sections.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/**
 * 3. Filtro temático de secciones (Investigación / Científicos / Reflexión personal)
 */
function initSectionFilter() {
  const filterSelect = document.getElementById('sectionFilter');
  if (!filterSelect) return;

  const sections = document.querySelectorAll('.section-block[data-category]');

  filterSelect.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;

    sections.forEach((section) => {
      const category = section.getAttribute('data-category');
      if (selectedCategory === 'all' || category === selectedCategory) {
        section.style.display = 'block';
        section.style.opacity = '1';
      } else {
        section.style.display = 'none';
      }
    });

    // Desplazamiento suave al contenedor principal tras filtrar
    const mainWrapper = document.getElementById('mainContent');
    if (mainWrapper && selectedCategory !== 'all') {
      mainWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/**
 * 4. Alternar densidad visual / modo cuadrícula maximalista
 */
function initDensityToggle() {
  const btn = document.getElementById('btnToggleDensity');
  if (!btn) return;

  let isDense = false;
  btn.addEventListener('click', () => {
    isDense = !isDense;
    document.body.classList.toggle('dense-grid-mode', isDense);
    btn.innerHTML = isDense
      ? '<span class="btn-icon">▣</span> Cuadrícula Densa Activa'
      : '<span class="btn-icon">⚡</span> Densidad de Cuadrícula';
  });
}

/**
 * 5. Botón de impresión o guardado rápido en PDF
 */
function initPrintButton() {
  const btnPrint = document.getElementById('btnPrint');
  if (!btnPrint) return;

  btnPrint.addEventListener('click', () => {
    window.print();
  });
}
