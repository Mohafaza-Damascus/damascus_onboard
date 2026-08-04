document.addEventListener('DOMContentLoaded', () => {

  const updateDate = () => {
    const dateDisplay = document.querySelector('.top-date-display');
    if (dateDisplay) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateDisplay.textContent = new Date().toLocaleDateString('ar-SY', options);
    }
  };
  updateDate();
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-btn');
  const cards = document.querySelectorAll('.directorate-card');

  const performSearch = () => {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const titleElement = card.querySelector('.directorate-badge span');
      const titleText = titleElement ? titleElement.textContent.toLowerCase() : '';

      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      if (titleText.includes(query)) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }
  cards.forEach((card, index) => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', () => {
      const directorateName = card.querySelector('.directorate-badge span')?.textContent.trim();
      
      const directorateId = index + 1; 
      
      window.location.href = `directorate-details.html?id=${directorateId}&name=${encodeURIComponent(directorateName)}`;
    });
  });

  const langBtn = document.querySelector('.lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const isArabic = document.documentElement.lang === 'ar';
      
      if (isArabic) {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        langBtn.textContent = 'عربي';
      } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        langBtn.textContent = 'En';
      }
    });
  }

  const loginBtn = document.querySelector('.login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') e.preventDefault();
      
      navLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });
});