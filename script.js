document.addEventListener('DOMContentLoaded', () => {
  // Animated Number Counter for Stats Section
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const speed = 200; // Lower is faster
      const increment = target / speed;

      const updateCount = () => {
        const count = +counter.innerText.replace('K+', '');
        
        if (count < target / 1000) {
          const nextCount = count + increment / 1000;
          counter.innerText = `${nextCount.toFixed(1)}K+`;
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = `${Math.floor(target / 1000)}K+`;
        }
      };

      updateCount();
    });
  };

  // Intersection Observer to trigger counter when visible
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); // Run animation once
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});