import { userCadastrer } from "../fixtures/dataUtils";
import METHOD from "../fixtures/method.json";

context("login", () => {
  it("realizar login", () => {
    cy.login(userCadastrer.email, userCadastrer.password).then((response) => {
      expect(response).property("status").to.eq(200);
    });
  });

  it("falha ao realizar login", () => {
    cy.login(userCadastrer.email, "senhaerrada").then((response) => {
      expect(response).property("status").to.eq(401);
      expect(response).property("body").to.contain({
        message: "Email e/ou senha inválidos",
      });
    });
  });
});
