const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Toggle functionality
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});

// Hide mobile menu when resizing to desktop view
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove('show');
  }
});
