const navbarEl = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    navbarEl.classList.remove('remove-border');
  } else {
    navbarEl.classList.add('remove-border');
  }
});

var swiper = new Swiper('.mySwiper', {
  spaceBetween: 24,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 2
    }
  }
});
