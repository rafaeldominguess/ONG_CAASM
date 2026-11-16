const fs = require('fs');
const path = require('path');

describe('Suite de Testes Unitários e de Integração - Clube Amigos dos Animais SM', () => {
  beforeEach(() => {
    // Carrega a estrutura real do index.html no ambiente DOM simulado
    const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;

    // Limpa o cache do módulo e executa o script.js real
    jest.resetModules();
    require('./script.js');
  });

  // TESTES UNITÁRIOS (Comportamento do Menu Responsivo em script.js)
  test('Unitário 1: Deve alternar a classe "active" no menu ao clicar no botão hambúrguer', () => {
    const btnMenu = document.getElementById('btn-menu');
    const navPrincipal = document.querySelector('.nav-principal');

    expect(navPrincipal.classList.contains('active')).toBe(false);

    // Primeiro clique: abre o menu
    btnMenu.click();
    expect(navPrincipal.classList.contains('active')).toBe(true);

    // Segundo clique: fecha o menu
    btnMenu.click();
    expect(navPrincipal.classList.contains('active')).toBe(false);
  });

  test('Unitário 2: Deve fechar o menu automaticamente ao clicar em qualquer link de navegação', () => {
    const btnMenu = document.getElementById('btn-menu');
    const navPrincipal = document.querySelector('.nav-principal');
    const primeiroLink = document.querySelector('.nav-principal a');

    // Abre o menu mobile
    btnMenu.click();
    expect(navPrincipal.classList.contains('active')).toBe(true);

    // Clica num link de âncora
    primeiroLink.click();
    expect(navPrincipal.classList.contains('active')).toBe(false);
  });

  // TESTES DE INTEGRAÇÃO (Integridade do DOM, Requisitos RF01-RF04 e Segurança/Acessibilidade)
  test('Integração 1: Deve renderizar a estrutura institucional (RF01) e os 4 cartões de apoio com PIX (RF02)', () => {
    const titulo = document.querySelector('h1').textContent;
    const secaoApoio = document.getElementById('comoapoiar');
    const cardsDoacao = secaoApoio.querySelectorAll('.cards-doacao');

    expect(titulo).toContain('Clube Amigos dos animais SM');
    expect(cardsDoacao.length).toBe(4);
    expect(secaoApoio.textContent).toContain('16.927.511/0001-93');
  });

  test('Integração 2: Deve garantir links de WhatsApp seguros (RF03 / RNF02) e atributos alt de acessibilidade (RF04 / RNF04)', () => {
    const linksWhatsApp = document.querySelectorAll('a[href*="wa.me"]');
    const imagensGaleria = document.querySelectorAll('#galeria img');

    expect(linksWhatsApp.length).toBeGreaterThanOrEqual(4);
    linksWhatsApp.forEach(link => {
      expect(link.getAttribute('href')).toContain('https://wa.me/5555984373791?text=');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });

    expect(imagensGaleria.length).toBe(8);
    imagensGaleria.forEach(img => {
      expect(img.getAttribute('alt')).toBeTruthy();
    });
  });
});