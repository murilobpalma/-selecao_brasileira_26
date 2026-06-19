// =============================================
//   BRASIL 2026 — JavaScript Principal
// =============================================

// Marca link ativo na navbar conforme a página atual
document.addEventListener('DOMContentLoaded', function () {

  // ---- NAVBAR: ativa o link da página atual ----
  const links = document.querySelectorAll('#navMenu .nav-link');
  const atual = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === atual) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // ---- FILTRO DE JOGADORES ----
  const filtros = document.querySelectorAll('#filtroBtn button');
  if (filtros.length) {
    filtros.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filtros.forEach(b => {
          b.classList.remove('btn-success');
          b.classList.add('btn-outline-success');
        });
        btn.classList.remove('btn-outline-success');
        btn.classList.add('btn-success');

        const filtro = btn.dataset.filter;
        const cards = document.querySelectorAll('.jogador-card');

        cards.forEach(function (card) {
          if (filtro === 'todos' || card.dataset.pos === filtro) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });

        // Mostra/oculta headers de seção
        const headers = document.querySelectorAll('h3.fw-bold.text-success');
        headers.forEach(function (header) {
          if (filtro === 'todos') {
            header.style.display = '';
          } else {
            header.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- FORMULÁRIO DO BOLÃO ----
  const form = document.getElementById('formBolao');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validação Bootstrap nativa
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Coleta dados
      const dados = {
        nome:     document.getElementById('nome').value.trim(),
        email:    document.getElementById('email').value.trim(),
        estado:   document.getElementById('estado').value,
        campeao:  document.getElementById('campeao').value,
        fase:     document.getElementById('faseChega').value,
        palpites: {
          brasXmex: (document.getElementById('gol1bra').value || '?') + ' x ' + (document.getElementById('gol1mex').value || '?'),
          brasXcro: (document.getElementById('gol2bra').value || '?') + ' x ' + (document.getElementById('gol2cro').value || '?'),
          brasXser: (document.getElementById('gol3bra').value || '?') + ' x ' + (document.getElementById('gol3ser').value || '?'),
        }
      };

      console.log('Aposta registrada:', dados);

      // Exibe mensagem de sucesso
      const msg = document.getElementById('msgSucesso');
      msg.classList.remove('d-none');
      msg.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Reseta o formulário
      form.reset();
      form.classList.remove('was-validated');

      // Oculta a mensagem após 6 segundos
      setTimeout(function () {
        msg.classList.add('d-none');
      }, 6000);
    });
  }

  // ---- ANIMAÇÃO DE ENTRADA NOS CARDS ----
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .lenda-card, .jogo-card, .card-stat, .curiosidade-card').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
