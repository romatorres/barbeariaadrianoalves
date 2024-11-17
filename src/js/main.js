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

// GALERIA DE FOTOS
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeButton = document.getElementById("close-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentImageIndex = 0;
const images = document.querySelectorAll(".group img");

// Abrir lightbox
document.querySelectorAll(".group").forEach((item, index) => {
  item.addEventListener("click", function () {
    currentImageIndex = index;
    const img = this.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Previne rolagem
  });
});

// Navegar para imagem anterior
prevButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateLightboxImage();
});

// Navegar para próxima imagem
nextButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateLightboxImage();
});

// Atualizar imagem no lightbox
function updateLightboxImage() {
  const img = images[currentImageIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
}

// Fechar lightbox
closeButton.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  document.body.style.overflow = ""; // Restaura rolagem
});

// Fechar com tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
  } else if (e.key === "ArrowLeft") {
    prevButton.click();
  } else if (e.key === "ArrowRight") {
    nextButton.click();
  }
});

// Fechar ao clicar fora da imagem
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
  }
});
