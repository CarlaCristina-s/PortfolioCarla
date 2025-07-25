$(document).ready(function(){
    $(window).scroll(function(){
        
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
   
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // texto animado
    new Typed(".typing", {
        strings: ["Desenvolvedora","Dedicada", "Curiosa", "Apaixonada por Programação"],
        typeSpeed: 100,
        backSpeed: 70,
        loop: true
    });

    new Typed(".typing-3", {
        strings: ["Connect with me on :)"],
        typeSpeed: 100,
        backSpeed: 70,
        loop: true,
    });

    new Typed(".typing-2", {
        strings: ["Front end developer","Fresher" ,"Technician", "Blogger", "Designer", "Freelancer","Manager"],
        typeSpeed: 100,
        backSpeed: 70,
        loop: true
    });
  });  

// botão de rolagem
const scrollUpBtn = document.querySelector('.scroll-up-btn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});
scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});  

// menu hamburguer
const menuBtn = document.querySelector('.menu-btn');
const navbarNav = document.querySelector('.navbar-nav');
menuBtn.addEventListener('click', () => {
  navbarNav.classList.toggle('active');
});
document.querySelectorAll('.navbar-nav a').forEach(link => {
  link.addEventListener('click', () => {
    navbarNav.classList.remove('active');
  });
});  

document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 900,
    once: true,
    easing: 'ease-out-cubic'
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  function applyProjectFilter(filter) {
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-tech').split(' ').includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    AOS.refresh();
  }
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      applyProjectFilter(filter);
    });
  });
  applyProjectFilter('all');

  // modal dos projetos
  const modal = document.getElementById('project-modal');
  const modalBody = modal.querySelector('.modal-body');
  const modalClose = modal.querySelector('.modal-close');
  projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      openModal(card);
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        openModal(card);
      }
    });
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
  });

  // modo escuro
  const darkToggle = document.getElementById('darkmode-toggle');
  const darkIcon = darkToggle.querySelector('i');
  function setDarkMode(on) {
    document.body.classList.toggle('darkmode', on);
    darkIcon.className = on ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('darkmode', on ? '1' : '0');
  }
  darkToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('darkmode'));
  });
  if (localStorage.getItem('darkmode') === '1') setDarkMode(true);

  // modal
  function openModal(projectCard) {
    const title = projectCard.querySelector('.project-title').textContent;
    const desc = projectCard.getAttribute('data-desc') || '';
    const funcionalidades = projectCard.getAttribute('data-funcionalidades') || '';
    const imgs = (projectCard.getAttribute('data-imgs') || '').split(',').filter(Boolean);
    const video = projectCard.getAttribute('data-video') || '';
    const techs = projectCard.querySelector('.project-techs').innerHTML;
    const links = projectCard.querySelector('.project-links').innerHTML;
    let galeria = '';
    if (imgs.length > 0) {
      galeria = `<div style='display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;'>` +
        imgs.map(src => `<img src='${src.trim()}' alt='Imagem do projeto' style='width:160px;height:90px;object-fit:cover;border-radius:6px;border:1px solid #eee;cursor:pointer;transition:transform 0.2s;' class='gallery-image' onclick='openImageModal("${src.trim()}")' onmouseover='this.style.transform="scale(1.05)"' onmouseout='this.style.transform="scale(1)"'>`).join('') +
        `</div>`;
    }
    let videoHtml = '';
    if (video) {
      videoHtml = `<div style='margin-bottom:12px;'><video src='${video}' controls style='width:100%;border-radius:8px;'></video></div>`;
    }
    modalBody.innerHTML = `
      <h3 style="color:var(--color-primary);margin-bottom:8px;">${title}</h3>
      <div style='margin-bottom:10px;'><strong>Descrição:</strong> ${desc}</div>
      <div style='margin-bottom:10px;'><strong>Funcionalidades:</strong> ${funcionalidades}</div>
      ${galeria}
      ${videoHtml}
      <div style="margin-bottom:14px;">${techs}</div>
      <div>${links}</div>
    `;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // modal de imagem
  const imageModal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  const imageModalClose = document.querySelector('.image-modal-close');

  window.openImageModal = function(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  function closeImageModal() {
    imageModal.classList.remove('show');
    document.body.style.overflow = '';
    modalImage.src = '';
  }

  imageModalClose.addEventListener('click', closeImageModal);
  imageModal.addEventListener('click', function(e) {
    if (e.target === imageModal) {
      closeImageModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (imageModal.classList.contains('show') && (e.key === 'Escape' || e.key === 'Esc')) {
      closeImageModal();
    }
  });
});  