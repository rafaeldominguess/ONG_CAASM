// Seleciona o ícone do hambúrguer e o menu de navegação
const btnMenu = document.getElementById('btn-menu');
const navPrincipal = document.querySelector('.nav-principal');

// Adiciona um evento de clique no ícone
btnMenu.addEventListener('click', () => {
  // Alterna a classe 'active' no nav
  navPrincipal.classList.toggle('active');
});

// Opcional: Fecha o menu automaticamente quando o usuário clica em algum link
const navLinks = document.querySelectorAll('.nav-principal a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navPrincipal.classList.remove('active');
  });
});