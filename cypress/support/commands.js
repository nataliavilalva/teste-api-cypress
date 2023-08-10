import METHOD from "../fixtures/method.json";
import { userCadastrer } from "../fixtures/dataUtils";
var faker = require("faker-br");
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: METHOD.POST,
    url: "https://serverest.dev/login",
    body: {
      email: email,
      password: password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    // expect(response).property("status").to.eq(200);
    // const authorization = response.body.authorization;
    return response;
  });
});

Cypress.Commands.add("cadastrarUsuario", () => {
  cy.request({
    method: METHOD.POST,
    url: "https://serverest.dev/usuarios",
    body: {
      nome: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: "true",
    },
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("cadastrarProduto", (authorization) => {
  const produto = {
    nome: faker.name.firstName(),
    preco: faker.random.number(),
    descricao: faker.lorem.word(),
    quantidade: faker.random.number(),
  };
  cy.request({
    method: METHOD.POST,
    url: "https://serverest.dev/produtos",
    headers: {
      authorization: authorization,
    },
    body: produto,
  }).then((response) => {
    const idProduto = response.body._id;
    return [idProduto, produto];
  });
});

Cypress.Commands.add("listarProdutoId", (id) => {
  cy.request({
    method: METHOD.GET,
    url: `https://serverest.dev/produtos/${id}`,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("deletar", (authorization, id, endpoint) => {
  console.log(endpoint);
  cy.request({
    method: METHOD.DELETE,
    url: `https://serverest.dev/${endpoint}/${id}`,
    headers: {
      authorization: authorization,
    },
  }).then((response) => {
    expect(response).property("status").to.eq(200);
    const { body } = response;
    expect(body).to.contain({
      message: "Registro excluído com sucesso",
    });
  });
});
