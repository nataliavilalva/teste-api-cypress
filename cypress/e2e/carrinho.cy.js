import METHOD from "../fixtures/method.json";

context("carrinho", () => {
  it(" Buscar carrinhos cadastrados", () => {
    cy.request({
      method: METHOD.GET,
      url: `https://serverest.dev/carrinhos`,
    }).then((response) => {
      expect(response).property("status").to.eq(200);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body).property("carrinhos").to.not.empty;
    });
  });

  it(" Buscar carrinhos por id", () => {
    cy.request({
      method: METHOD.GET,
      url: `https://serverest.dev/carrinhos/qbMqntef4iTOwWfg`,
    }).then((response) => {
      expect(response).property("status").to.eq(200);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body).to.contain({
        _id: "qbMqntef4iTOwWfg",
      });
      expect(body).property("produtos").to.not.empty;
    });
  });

  it(" Buscar carrinhos não existente", () => {
    cy.request({
      method: METHOD.GET,
      url: `https://serverest.dev/carrinhos/qbMqntef4iTOwW555`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.eq(400);
      expect(response).property("body").to.contain({
        message: "Carrinho não encontrado",
      });
    });
  });
});
