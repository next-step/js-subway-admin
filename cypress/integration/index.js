describe('지하철 노선도 어드민', () => {

  // 페이지 접속
  before(() => {
    cy.visit('http://localhost:1234/');
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('메인페이지 접근시 역 관리 페이지로 이동', () => {
    cy.get('h2').contains('역 관리').should('exist');
    cy.on('window:alert', (message) => {
      assert.equal(message, '지하철 노선도 앱을 사용하기 위해서는 로그인이 필요합니다.');
    });
    cy.get('.auth').contains('로그인').should('exist');
  });

  describe('로그인', () => {

    it('로그인 실패', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('.auth').contains('로그인').should('exist');
      cy.get('#email').type('a@a.a');
      cy.get('#password').type('1234').type('{enter}')
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('이메일 또는 비밀번호가 일치하지 않습니다.');
        });
    });

    it('회원가입 실패', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('.auth').contains('회원가입').should('exist');
      cy.get('[href="/signup"]').click();
      cy.get('#email').type('a@a.a');
      cy.get('#name').type('황준일');
      cy.get('#password').type('1234');
      cy.get('#password-confirm').type('12345{enter}')
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('비밀번호 확인이 일치하지 않습니다.');
        });
    });

    it('회원가입 성공', () => {
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('#password-confirm').type('{backspace}{enter}')
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('회원가입이 완료되었습니다.');
        });
    });

    it('로그인 성공', () => {
      window.localStorage.setItem('USER_REPOSITORY', JSON.stringify([{
        email: 'a@a.a',
        password: '1234',
        name: '황준일',
      }]));
      const stub = cy.stub();
      cy.on('window:alert', stub);
      cy.get('.auth').contains('로그인').should('exist');
      cy.get('#email').type('a@a.a');
      cy.get('#password').type('1234{enter}')
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('로그인이 완료되었습니다.');
        });
    });

  })
})
