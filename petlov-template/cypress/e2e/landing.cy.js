// testes.cy.js

describe('Página Inicial - Conectando corações, mudando vidas!', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Deve validar o título', () => {
    cy.get('h1').should('have.text', 'Conectando corações, mudando vidas!');
  });

  it('Deve validar o subtítulo', () => {
    cy.get('main > p').should('have.text', 'Ajudamos pessoas a encontrarem pontos de doação de forma eficiente.');
  });

  it('Deve validar o link do botão', () => {
    cy.get('a[href="/signup"]').should('exist');
    cy.get('a[href="/signup"] strong').should('have.text', 'Cadastre um ponto de doação');
  });
});
