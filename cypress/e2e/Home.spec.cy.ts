describe('홈페이지', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('회원가입 & 로그인 & 닉네임변경', () => {
    const id = 'testId';
    const nickname = 'testNick';
    const password = '1234';

    beforeEach(() => {
      cy.findByAltText('menu-icon').click();
      cy.findByText('로그인').click();
      cy.url().should('include', 'splash');
    });

    it('회원가입을 할 수 있다', () => {
      cy.findByTestId('signup-button').click();
      cy.url().should('include', 'signup');
      cy.findByPlaceholderText('아이디').type(id).should('have.value', id);
      cy.findByPlaceholderText('닉네임').type(nickname).should('have.value', nickname);
      cy.findByPlaceholderText('비밀번호').type(password).should('have.value', password);
      cy.findByPlaceholderText('비밀번호 확인').type(password).should('have.value', password);

      cy.findByTestId('submit').click();
    });

    it('로그인하고 닉네임이 제대로 확인된다', () => {
      // 로그인
      cy.get('.login-link').click();
      cy.url().should('include', 'login');
      cy.findByPlaceholderText('아이디를 입력하세요').type(id).should('have.value', id);
      cy.findByPlaceholderText('비밀번호를 입력하세요').type(password).should('have.value', password);
      cy.findByTestId('login-button').click();

      // 마이페이지 이동
      cy.findByAltText('menu-icon').click();
      cy.findByText('마이페이지').click();
      cy.findByText(nickname).should('exist');
    });
  });
});
