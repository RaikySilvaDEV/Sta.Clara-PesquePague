// ── CUSTOM CURSOR ──
  const cur = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cur.style.left = mouseX + 'px';
    cur.style.top = mouseY + 'px';
  });

  function animRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a, button, input, textarea, select, .card-hover').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
  });

  // ── SCROLL PROGRESS & NAV & BTT & DIVE PARALLAX ──
  const progress = document.getElementById('progress');
  const nav = document.getElementById('nav');
  const btt = document.getElementById('btt');
  const divingOverlay = document.getElementById('diving-overlay');
  const heroSection = document.getElementById('topo');
  const heroVideo = heroSection ? heroSection.querySelector('video') : null;
  const heroContent = heroSection ? heroSection.querySelector('.relative.z-10') : null;
  const heroWaves = heroSection ? heroSection.querySelector('svg') : null;
  
  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;
    let scrolled = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrolled + '%';
    
    // Navbar scrolled states
    if (scrollY > 50) {
      nav.classList.add('nav-glass', 'py-3');
      nav.classList.remove('py-5');
      btt.classList.add('show');
    } else {
      nav.classList.remove('nav-glass', 'py-3');
      nav.classList.add('py-5');
      btt.classList.remove('show');
    }

    // Diving Parallax Effect
    if (heroSection) {
      let heroHeight = heroSection.offsetHeight;
      if (scrollY <= heroHeight) {
        // 1. Fade-in deep-teal underwater overlay
        if (divingOverlay) {
          let progress = Math.min(scrollY / (heroHeight * 0.75), 1);
          divingOverlay.style.opacity = progress;
        }
        
        // 2. Parallax scale and translate on H1/content container (sink text away)
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollY * -0.22}px)`;
          heroContent.style.opacity = 1 - (scrollY / (heroHeight * 0.65));
        }

        // 3. Slow motion video parallax (recede deeper)
        if (heroVideo) {
          heroVideo.style.transform = `translateY(${scrollY * 0.38}px) scale(${1 + (scrollY / heroHeight) * 0.12})`;
        }

        // 4. Rising SVG waves (submerge the viewport)
        if (heroWaves) {
          heroWaves.style.transform = `translateY(${scrollY * -0.32}px) scaleY(${1 + (scrollY / heroHeight) * 0.5})`;
        }
      }
    }
  });

  // ── REVEAL ANIMATIONS ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.rv, .rv-l, .rv-r, .rv-scale, .split-word, .clip-reveal').forEach(el => {
    observer.observe(el);
  });

  // ── TABS CARDÁPIO ──
  function switchTab(tabId) {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active-tab'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).classList.add('active-tab');
    document.getElementById('panel-' + tabId).classList.add('active');
  }

  // ── MODAL RESERVA ──
  const modal = document.getElementById('modal');
  function openModal() {
    modal.classList.add('show');
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('modal-date').min = today;
    document.getElementById('modal-date').value = today;
  }
  function closeModal() {
    modal.classList.remove('show');
  }
  function submitReserva() {
    alert("Reserva enviada com sucesso! Entraremos em contato em breve.");
    closeModal();
  }

  // ── MOBILE MENU ──
  const mobMenu = document.getElementById('mob-menu');
  const mobMenuBtn = document.getElementById('mob-menu-btn');
  
  mobMenuBtn.addEventListener('click', () => {
    mobMenu.classList.remove('hidden');
    setTimeout(() => {
      mobMenu.style.opacity = '1';
    }, 10);
  });
  
  function closeMobMenu() {
    mobMenu.style.opacity = '0';
    setTimeout(() => {
      mobMenu.classList.add('hidden');
    }, 300);
  }

  // ── NOTIFICATION ──
  const notif = document.getElementById('notif');
  setTimeout(() => {
    notif.classList.add('show');
    setTimeout(() => closeNotif(), 6000);
  }, 2000);
  
  function closeNotif() {
    notif.classList.remove('show');
  }
  
  // ── COUNTERS ──
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        let target = parseFloat(entry.target.getAttribute('data-target'));
        let text = entry.target.getAttribute('data-text');
        let float = entry.target.getAttribute('data-float');
        
        let start = 0;
        let duration = 2000;
        let step = target / (duration / 16);
        
        let interval = setInterval(() => {
          start += step;
          if (start >= target) {
            start = target;
            clearInterval(interval);
            if (text) {
              entry.target.innerText = text;
            } else if (float) {
              entry.target.innerText = float;
            } else {
              entry.target.innerText = Math.floor(start);
            }
          } else {
            if (float || text) {
              entry.target.innerText = Math.floor(start);
            } else {
              entry.target.innerText = Math.floor(start);
            }
          }
        }, 16);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));

  // ── ROTATING REVIEWS ──
  const fallbackReviews = [
    {
      stars: "★★★★★",
      text: '"Lugar maravilhoso para ir com a família! Comida excelente, porções generosas e o peixe frito é divino. As crianças amaram o parquinho e ver os peixes no lago."',
      initial: "M",
      bg: "bg-lago2",
      name: "Maria Silva",
      info: "Guia Local"
    },
    {
      stars: "★★★★★",
      text: '"Atendimento nota 10! A tilápia é fresquinha e o chope bem gelado. Ambiente super agradável, arborizado. Melhor pesque pague de Franca com certeza!"',
      initial: "J",
      bg: "bg-laranja",
      name: "João Carlos",
      info: "Há 2 semanas"
    },
    {
      stars: "★★★★★",
      text: '"Ótima estrutura, a Parmegiana de tilápia é maravilhosa, serve muito bem 3 pessoas. Aos finais de semana tem música ao vivo, bem animado. Recomendo chegar cedo!"',
      initial: "A",
      bg: "bg-agua",
      name: "Ana Paula",
      info: "Há 1 mês"
    },
    {
      stars: "★★★★★",
      text: '"Espaço muito amplo, estacionamento fácil e gratuito. A costela de tambaqui é espetacular. O atendimento é rápido mesmo lotado."',
      initial: "P",
      bg: "bg-lago",
      name: "Pedro Henrique",
      info: "Guia Local"
    },
    {
      stars: "★★★★★",
      text: '"Melhor tilápia da região de Franca! Crocante por fora e muito saborosa. A música ao vivo aos sábados deixa o clima incrível."',
      initial: "C",
      bg: "bg-terra",
      name: "Camila Rodrigues",
      info: "Há 3 semanas"
    },
    {
      stars: "★★★★★",
      text: '"Lugar super arborizado, redário excelente para descansar após o almoço. O pesque e pague é muito divertido para as crianças."',
      initial: "L",
      bg: "bg-folha",
      name: "Lucas Souza",
      info: "Há 1 mês"
    }
  ];
  let reviews = fallbackReviews;

  async function loadReviews() {
    try {
      const response = await fetch('data/reviews.json');
      if (!response.ok) throw new Error('reviews not available');

      const loadedReviews = await response.json();
      if (Array.isArray(loadedReviews) && loadedReviews.length) {
        reviews = loadedReviews;
      }
    } catch (error) {
      reviews = fallbackReviews;
    }
  }

  let reviewIndex = 0;
  const reviewCards = document.querySelectorAll('#reviews-grid > div');

  function rotateReviews() {
    if (!reviewCards.length) return;
    
    // Fade out
    reviewCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      card.style.transition = 'opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)';
    });

    setTimeout(() => {
      // Increment reviewIndex
      reviewIndex = (reviewIndex + 3) % reviews.length;

      // Update content
      reviewCards.forEach((card, i) => {
        const data = reviews[(reviewIndex + i) % reviews.length];
        
        const starsEl = card.querySelector('.text-yellow-500');
        if (starsEl) starsEl.innerText = data.stars;
        
        const textEl = card.querySelector('p');
        if (textEl) textEl.innerText = data.text;
        
        const avatar = card.querySelector('.flex.items-center > div:first-child');
        if (avatar) {
          avatar.className = `w-10 h-10 rounded-full ${data.bg} text-creme flex items-center justify-center font-bold`;
          avatar.innerText = data.initial;
        }

        const infoDiv = card.querySelector('.flex.items-center > div:last-child');
        if (infoDiv) {
          const nameEl = infoDiv.querySelector('.text-terra');
          if (nameEl) nameEl.innerText = data.name;
          const roleEl = infoDiv.querySelector('.text-terra2');
          if (roleEl) roleEl.innerText = data.info;
        }
      });

      // Fade in
      reviewCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }, 600);
  }

  // Rotate every 6 seconds
  loadReviews().then(() => setInterval(rotateReviews, 6000));

  // ── AUTOPLAY SLIDESHOW ──
  const slides = document.querySelectorAll('.slide-img');
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('opacity-100');
    slides[currentSlide].classList.add('opacity-0');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.remove('opacity-0');
    slides[currentSlide].classList.add('opacity-100');
  }, 4000);
