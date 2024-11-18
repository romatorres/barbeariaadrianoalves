document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const navLinks = document.querySelectorAll(".nav-link");

  // Função para toggle do menu mobile
  function toggleMobileMenu() {
    hamburgerMenu.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      header.classList.add("scrolled");
    } else if (window.scrollY <= 50) {
      header.classList.remove("scrolled");
    }
  }

  // Event listener para o botão hamburger
  hamburgerMenu.addEventListener("click", toggleMobileMenu);

  // Fecha o menu ao clicar em um link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      toggleMobileMenu();
    });
  });

  // Background do header no scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else if (!mobileMenu.classList.contains("active")) {
      header.classList.remove("scrolled");
    }
  });

  // Função para verificar qual seção está visível
  function setActiveSection() {
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.scrollY;

      // Ajuste o valor 150 conforme necessário para melhor precisão
      if (
        scrollPosition >= sectionTop - 420 &&
        scrollPosition < sectionTop + sectionHeight - 420
      ) {
        const correspondingLink = document.querySelector(
          `.nav-link[href="#${section.id}"]`
        );

        // Remove a classe active de todos os links
        navLinks.forEach((link) => link.classList.remove("active"));

        // Adiciona a classe active ao link correspondente
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }

  // Observa o scroll para atualizar a seção ativa
  window.addEventListener("scroll", setActiveSection);

  // Verifica a seção ativa no carregamento da página
  setActiveSection();

  // Scroll suave para as âncoras
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 111;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});



//GALERIA
class Gallery {
  constructor() {
      // Elementos DOM
      this.lightbox = document.getElementById("lightbox");
      this.lightboxImg = document.getElementById("lightbox-img");
      this.lightboxCaption = document.getElementById("lightbox-caption");
      this.closeButton = document.getElementById("close-button");
      this.prevButton = document.getElementById("prev-button");
      this.nextButton = document.getElementById("next-button");
      this.gallery = document.querySelector('.grid');
      
      // Estado
      this.currentImageIndex = 0;
      this.images = Array.from(document.querySelectorAll(".group img"));
      this.imagesLoaded = 0;
      
      // Inicialização
      this.init();
  }

  init() {
      this.gallery.style.opacity = '0';
      
      const loader = document.createElement('div');
      loader.id = 'gallery-loader';
      loader.innerHTML = `
          <div class="flex items-center justify-center min-h-[50vh]">
              <div class="animate-spin mr-2">⌛</div>
              <span>Carregando imagens... <span id="loading-count">0</span>/${this.images.length}</span>
          </div>
      `;
      this.gallery.parentElement.insertBefore(loader, this.gallery);

      this.preloadImages();
      this.initializeEvents();
  }

  preloadImages() {
      const loadingCount = document.getElementById('loading-count');
      
      this.images.forEach(img => {
          const newImg = new Image();
          newImg.src = img.src;
          newImg.onload = () => {
              this.imagesLoaded++;
              loadingCount.textContent = this.imagesLoaded;
              
              if (this.imagesLoaded === this.images.length) {
                  this.onAllImagesLoaded();
              }
          };
      });
  }

  onAllImagesLoaded() {
      const loader = document.getElementById('gallery-loader');
      if (loader) {
          loader.remove();
      }
      this.gallery.style.opacity = '1';
      this.gallery.style.transition = 'opacity 0.5s ease-in';
  }

  initializeEvents() {
      // Abrir lightbox
      document.querySelectorAll(".group").forEach((item, index) => {
          item.addEventListener("click", () => {
              this.currentImageIndex = index;
              this.openLightbox(item.querySelector("img"));
          });
      });

      // Fechar lightbox
      this.closeButton.addEventListener("click", () => this.closeLightbox());

      // Navegação
      this.prevButton.addEventListener("click", (e) => {
          e.stopPropagation();
          this.navigateImage('prev');
      });
      
      this.nextButton.addEventListener("click", (e) => {
          e.stopPropagation();
          this.navigateImage('next');
      });

      // Fechar ao clicar fora
      this.lightbox.addEventListener("click", (e) => {
          // Check if the click is directly on the lightbox or overlay
          if (e.target === this.lightbox || e.target.closest("#lightbox > div:first-child")) {
              this.closeLightbox();
          }
      });

      // Teclas de navegação
      document.addEventListener("keydown", (e) => {
          if (!this.lightbox.classList.contains('hidden')) {
              switch(e.key) {
                  case "Escape":
                      this.closeLightbox();
                      break;
                  case "ArrowLeft":
                      this.navigateImage('prev');
                      break;
                  case "ArrowRight":
                      this.navigateImage('next');
                      break;
              }
          }
      });
  }

  openLightbox(img) {
      this.lightboxImg.src = img.src;
      this.lightboxImg.alt = img.alt;
      this.lightboxCaption.textContent = img.alt;
      this.lightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
  }

  closeLightbox() {
      this.lightbox.classList.add("hidden");
      document.body.style.overflow = "";
  }

  navigateImage(direction) {
      if (direction === 'prev') {
          this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      } else {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }
      
      const img = this.images[this.currentImageIndex];
      this.lightboxImg.src = img.src;
      this.lightboxImg.alt = img.alt;
      this.lightboxCaption.textContent = img.alt;
  }
}

// Inicializar galeria quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  new Gallery();
});