// Variables globales
let ultimoTulipanCompleto = null;
let colorSeleccionado = null;
let currentSlide = 0;

const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;

// Lista de colores para la paleta
const colores = [
  "#FF0000", "#FF4500", "#FFA500", "#FFD700", "#FFFF00",
  "#9ACD32", "#32CD32", "#00FF00", "#008000", "#006400",
  "#00FFFF", "#00CED1", "#1E90FF", "#0000FF", "#000080",
  "#800080", "#8B008B", "#FF00FF", "#FF69B4", "#FFC0CB",
  "#8B4513", "#A0522D", "#DEB887", "#F5F5DC", "#FFFFFF", "BLACK"
];

// Elementos del DOM
const coloresContainer = document.getElementById("colores-container");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const loveModal = document.getElementById("love-modal");
const closeModalBtn = document.querySelector(".close-modal");
const completeSound = document.getElementById("complete-sound");

/**
 * Crea las opciones de color en el contenedor
 */
const generarPaletaColores = () => {
  colores.forEach(color => {
    const div = document.createElement("div");
    div.className = "color-option";
    div.style.backgroundColor = color;
    coloresContainer.appendChild(div);
  });
};

/**
 * Manejador de selección de color
 */
const manejarSeleccionColor = () => {
  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach(option => {
    option.addEventListener("click", () => {
      colorSeleccionado = option.style.backgroundColor;
      // Quitar borde dorado a todos y ponerlo solo al seleccionado
      colorOptions.forEach(opt => (opt.style.border = "2px solid white"));
      option.style.border = "2px solid gold";
    });
  });
};

/**
 * Actualiza la posición del carrusel
 */
const updateCarousel = () => {
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
};

/**
 * Inicializa los botones de navegación del carrusel
 */
const initCarousel = () => {
  prevButton.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });
};

/**
 * Crea un efecto de estrellas alrededor de un elemento
 */
const createSparkles = (element) => {
  const rect = element.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
    sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
    sparkle.textContent = "⭐";
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 1000);
  }
};

/**
 * Agrega eventos de clic a cada tulipán para pintarlo
 */
const initTulipanes = () => {
  const tulipanes = document.querySelectorAll(".tulipan");
  tulipanes.forEach(tulipan => {
    tulipan.addEventListener("click", (e) => {
      // Solo pintar si hay un color seleccionado y se hace clic en un elemento paintable
      if (colorSeleccionado && e.target.classList.contains("paintable")) {
        e.target.style.fill = colorSeleccionado;

        // Contar cuántos elementos de este tulipán están pintados
        const elementosPintados = [...tulipan.querySelectorAll(".paintable")]
          .filter(el => el.style.fill && el.style.fill !== "white").length;

        const totalElementos = tulipan.querySelectorAll(".paintable").length;

        // Si ya se pintaron todos los elementos de este tulipán
        if (elementosPintados === totalElementos) {
          ultimoTulipanCompleto = tulipan;
          completeSound.play();
          // Mostrar el modal
          loveModal.style.display = "block";
        }
      }
    });
  });
};

/**
 * Cierra el modal y lanza las chispas en el último tulipán pintado
 */
const cerrarModal = () => {
  loveModal.style.display = "none";
  if (ultimoTulipanCompleto) {
    createSparkles(ultimoTulipanCompleto);
    ultimoTulipanCompleto = null;
  }
};

/**
 * Inicializa el evento para cerrar el modal
 */
const initModal = () => {
  closeModalBtn.addEventListener("click", cerrarModal);
};

/**
 * Función principal para inicializar toda la app
 */
const initApp = () => {
  generarPaletaColores();
  manejarSeleccionColor();
  initCarousel();
  initTulipanes();
  initModal();
};

document.addEventListener("DOMContentLoaded", initApp);
