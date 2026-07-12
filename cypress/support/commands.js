// Custom Cypress commands

Cypress.Commands.add('loginAsAdmin', () => {
  cy.session('admin', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('apiUrl')}/auth/login`,
      body: {
        email: Cypress.env('adminEmail'),
        password: Cypress.env('adminPassword'),
      },
    }).then((resp) => {
      window.localStorage.setItem('auth_token', resp.body.accessToken);
      window.localStorage.setItem('refresh_token', resp.body.refreshToken);
      window.localStorage.setItem('adminToken', resp.body.accessToken);
    });
  });
});

Cypress.Commands.add('resetTestData', () => {
  cy.loginAsAdmin();
  cy.request({
    method: 'DELETE',
    url: `${Cypress.config('apiUrl')}/test-reset`,
    headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
    failOnStatusCode: false,
  });
});
