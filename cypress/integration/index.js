describe('지하철 노선도 어드민', () => {

  // 페이지 접속
  beforeEach(() => {
    cy.visit('http://localhost:1234/')
  })

  it('메인페이지 접근시 역 관리 페이지로 이동', () => {
    cy.visit('http://localhost:1234/');
    cy.get('h2').contains('역 관리');
    cy.get('.auth').contains('로그인');
  });
})
