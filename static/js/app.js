AOS.init({
  duration: 1000,
  easing: 'ease-in-out'
});

const navbarEl = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
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

const menuNavbarEl = navbarEl.querySelector('nav ul.navbar-nav');

// Beri warna pada link yang aktif
menuNavbarEl.addEventListener('click', function (e) {
  const targetMenu = e.target;
  if (targetMenu.classList.contains('nav-link')) {
    const menuLinkActive = document.querySelector('ul li a.active');
    if (
      menuLinkActive !== null &&
      targetMenu.getAttribute('href') !== menuLinkActive.getAttribute('href')
    ) {
      menuLinkActive.classList.remove('active');
    }
    targetMenu.classList.add('active');
  }
});

const navbarLinks = menuNavbarEl.querySelectorAll('.navbar-nav .nav-link');

navbarLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    if (link.textContent.trim() === 'Beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const scrollOffset =
        target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: scrollOffset, behavior: 'smooth' });
    }
  });
});

// TODO

// // Tambahkan event listener saat halaman di-scroll
// window.addEventListener('scroll', () => {
//   // Dapatkan posisi scroll halaman
//   const scrollPosition = window.scrollY;

//   // Loop melalui semua menu link
//   navbarLinks.forEach(link => {
//     // Dapatkan elemen target dari atribut href
//     const target = document.querySelector(link.getAttribute('href'));
//     if (!target) return;

//     // Dapatkan posisi bagian
//     const targetPosition = target.offsetTop;
//     const targetHeight = target.offsetHeight;

//     // Cek apakah posisi scroll berada di dalam bagian
//     if (
//       scrollPosition >= targetPosition &&
//       scrollPosition < targetPosition + targetHeight
//     ) {
//       // Jika scroll berada di dalam bagian, tambahkan kelas CSS "active" pada menu link
//       link.classList.add('active');
//     } else {
//       // Jika scroll berada di luar bagian, hapus kelas CSS "active" pada menu link
//       link.classList.remove('active');
//     }
//   });
// });
