// ===== YEAR IN FOOTER =====
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ------------------------------------------
   FULL-WIDTH PROMO SLIDER (backend-ready)
   ------------------------------------------ */

// Placeholder slides (replace via backend later)
let promoSlidesData = [
  {
    title: "Upgrade Today with the Latest Apple Phone",
    subtitle: "Check out popular models with clear condition labels and fair pricing.",
    image: "images/1.jpg"
  },
   {
    title: "Explore Our Latest Android Smartphone Collection",
    subtitle: "Check out popular models with clear condition labels and fair pricing.",
    image: "images/16.JPG"
  },
  
  {
    title: "MacBooks",
    subtitle: "New, pre-owned and refurbished MacBooks with verified performance and clear condition ratings.",
    image: "images/3.jpeg"
  },
  {
    title: "Custom-built gaming PCs ",
    subtitle: "From entry-level to high-end, we build gaming PCs designed for smooth performance.",
    image: "images/1.avif"
  },
  {
    title: "Game Console & Accessories  ",
    subtitle: "Find game consoles from top brands — PlayStation, Xbox, Nintendo and more. Great for gaming, streaming, and home entertainment.",
    image: "images/15.jpg"
  }
];

/* Example future backend fetch:
fetch('/api/promotions')
  .then(res => res.json())
  .then(data => {
    promoSlidesData = data;
    buildPromoSlider();
  });
*/

let promoIndex = 0;
let promoSlidesContainer = document.getElementById('promoSlides');
let promoDotsContainer = document.getElementById('promoDots');

function buildPromoSlider() {
  if (!promoSlidesContainer || !promoDotsContainer) return;

  promoSlidesContainer.innerHTML = '';
  promoDotsContainer.innerHTML = '';

  promoSlidesData.forEach((slide, index) => {
    promoSlidesContainer.innerHTML += `
      <article class="promo-slide">
        <div class="promo-text">
          <h2>${slide.title}</h2>
          <p>${slide.subtitle}</p>
        </div>
        <div class="promo-image">
          <img src="${slide.image}" alt="">
        </div>
      </article>
    `;

    promoDotsContainer.innerHTML += `
      <button type="button" data-promo="${index}" class="${index === 0 ? 'active' : ''}"></button>
    `;
  });

  attachPromoEvents();
}

function attachPromoEvents() {
  const slidesWrapper = document.querySelector('.promo-slides');
  const dots = document.querySelectorAll('#promoDots button');
  const prevBtn = document.getElementById('promoPrev');
  const nextBtn = document.getElementById('promoNext');

  if (!slidesWrapper || dots.length === 0) return;

  function goToPromoSlide(i) {
    promoIndex = i;
    slidesWrapper.style.transform = `translateX(-${100 * i}%)`;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const next = (promoIndex - 1 + promoSlidesData.length) % promoSlidesData.length;
      goToPromoSlide(next);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const next = (promoIndex + 1) % promoSlidesData.length;
      goToPromoSlide(next);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-promo'), 10);
      goToPromoSlide(idx);
    });
  });

  // autoplay
  setInterval(() => {
    const next = (promoIndex + 1) % promoSlidesData.length;
    goToPromoSlide(next);
  }, 7000);
}

// Build promo slider now
buildPromoSlider();


/* ------------------------------------------
   TOP BANNER SLIDER (tbSlides)
   ------------------------------------------ */
const tbSlides = document.getElementById('tbSlides');
const tbDots = document.querySelectorAll('#tbDots button');
const tbPrev = document.getElementById('tbPrev');
const tbNext = document.getElementById('tbNext');

let tbIndex = 0;
const tbTotal = tbDots.length;

function goTB(i) {
  if (!tbSlides) return;
  tbIndex = i;
  tbSlides.style.transform = `translateX(${-100 * i}%)`;
  tbDots.forEach((d, n) => d.classList.toggle("active", n === i));
}

if (tbNext) {
  tbNext.addEventListener("click", () => goTB((tbIndex + 1) % tbTotal));
}
if (tbPrev) {
  tbPrev.addEventListener("click", () => goTB((tbIndex - 1 + tbTotal) % tbTotal));
}

tbDots.forEach(dot => {
  dot.addEventListener("click", () => goTB(+dot.dataset.i));
});

setInterval(() => {
  if (tbTotal > 0) {
    goTB((tbIndex + 1) % tbTotal);
  }
}, 6000);


/* ------------------------------------------
   HERO RIGHT-SIDE SLIDER (slide-track)
   ------------------------------------------ */
const track = document.getElementById('slide-track');
const dots = document.querySelectorAll('.slider-dots button');
let currentSlide = 0;
const totalSlides = dots.length;

function goToSlide(index) {
  if (!track) return;
  currentSlide = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

dots.forEach(dot => {
  dot.addEventListener("click", () => goToSlide(+dot.dataset.slide));
});

setInterval(() => {
  if (totalSlides > 0) {
    goToSlide((currentSlide + 1) % totalSlides);
  }
}, 6000);


/* ------------------------------------------
   PRODUCT SLIDER (Horizontal)
   ------------------------------------------ */
const productTrack = document.querySelector('.product-track');
const productCards = document.querySelectorAll('.product-card');
const prevBtn = document.getElementById('prevProduct');
const nextBtn = document.getElementById('nextProduct');
let productIndex = 0;

function updateProductSlider() {
  if (!productTrack || productCards.length === 0) return;
  const cardWidth = productCards[0].offsetWidth + 16; 
  productTrack.style.transform = `translateX(${-(productIndex * cardWidth)}px)`;
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    productIndex = Math.max(productIndex - 1, 0);
    updateProductSlider();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    productIndex = Math.min(productIndex + 1, productCards.length - 1);
    updateProductSlider();
  });
}

window.addEventListener('resize', updateProductSlider);


/* ------------------------------------------
   CONTACT FORM (Frontend only)
   ------------------------------------------ */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please complete all required fields.");
      return;
    }

    // TODO: integrate with backend/email service
    contactForm.reset();
    if (formSuccess) {
      formSuccess.style.display = "block";
      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 5000);
    }
  });
}

// Initialize product slider transform
updateProductSlider();


