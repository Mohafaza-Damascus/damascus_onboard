const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.ministry-card');

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(value)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});