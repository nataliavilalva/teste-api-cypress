import { userCadastrer } from "../fixtures/dataUtils";
import METHOD from "../fixtures/method.json";

var faker = require("faker-br");

context("usuarios", () => {
  it("cadastrar usuario já existente", () => {
    cy.request({
      method: METHOD.POST,
      url: "https://serverest.dev/usuarios",
      body: userCadastrer,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.eq(400);
      expect(response).property("body").to.contain({
        message: "Este email já está sendo usado",
      });
    });
  });

  it.only("cadastrar usuario", () => {
    cy.cadastrarUsuario().then((response) => {
      expect(response).property("status").to.eq(201);
      expect(response).property("body").to.contain({
        message: "Cadastro realizado com sucesso",
      });
    });
  });

  it.only("cadastrar usuario teste", () => {
    cy.request({
      method: METHOD.POST,
      url: "https://serverest.dev/usuarios",
      body: {
        nome: "natalia qca",
        email: "nataliaqcao@qa.com.br",
        password: "teste",
        administrador: "true",
      },
    }).then((response) => {
      expect(response).property("status").to.eq(201);
      expect(response).property("body").to.contain({
        message: "Cadastro realizado com sucesso",
      });
    });
  });
});
