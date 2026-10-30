// Navigasi halus dan interaksi kecil tanpa mengubah susunan desain.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Tombol kategori mengarahkan pengunjung ke bagian destinasi.
document.querySelectorAll('.pills a, .destination-card').forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.add('is-selected');
  });
});
