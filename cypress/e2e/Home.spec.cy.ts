describe('홈페이지', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('인증 및 프로필', () => {
    const id = 'testId';
    const nickname = 'testNick';
    const password = '1234';
    const changedNickname = 'tttt';

    beforeEach(() => {
      cy.findByAltText('menu-icon').click();
      cy.findByText('로그인').click();
      cy.url().should('include', 'splash');
    });

    it('회원가입을 할 수 있다.', () => {
      cy.findByTestId('signup-button').click();
      cy.url().should('include', 'signup');
      cy.findByPlaceholderText('아이디').type(id).should('have.value', id);
      cy.findByPlaceholderText('닉네임').type(nickname).should('have.value', nickname);
      cy.findByPlaceholderText('비밀번호').type(password).should('have.value', password);
      cy.findByPlaceholderText('비밀번호 확인').type(password).should('have.value', password);

      cy.findByTestId('submit').click();
    });

    it('로그인하고 닉네임 변경을 할 수 있다.', () => {
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

      // 닉네임 변경 테스트
      cy.findByText('내 정보 관리').click();
      cy.findByText('수정').click();
      cy.findByPlaceholderText('변경할 닉네임을 입력해주세요').type(changedNickname);
      cy.findByText('변경하기').click();
      cy.findByTestId('nickname').should('have.text', changedNickname);

      // 다시 원상 복구
      cy.findByText('수정').click();
      cy.findByPlaceholderText('변경할 닉네임을 입력해주세요').clear().type(nickname);
      cy.findByText('변경하기').click();
      cy.findByTestId('nickname').should('have.text', nickname);

      // 프로필 페이지로 돌아오면 잘 변경되었음을 확인
      cy.findByAltText('back-button').click();
      cy.findByText(nickname).should('exist');
    });
  });
});
