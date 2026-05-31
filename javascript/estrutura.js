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

  document.querySelectorAll('a, button, .menu-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('big'));
    el.addEventListener('mouseleave', () => ring.classList.remove('big'));
  });

  // ── SCROLL PROGRESS & HEADER SHADOW ──
  const progress = document.getElementById('progress');
  const nav = document.getElementById('nav');
  
  window.addEventListener('scroll', () => {
    let scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progress.style.width = scrolled + '%';
  });

  // ── REVEAL ANIMATIONS ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(el => {
    observer.observe(el);
  });

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
