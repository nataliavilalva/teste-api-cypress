import {
  criarCustomer,
  listarCustomer,
  createCustomer,
  authorization,
} from "../fixtures/dataUtils";
import METHOD from "../fixtures/method.json";

context("customer", () => {
  it("criar customer", () => {
    cy.request({
      method: METHOD.POST,
      url: "/v1/customers",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEwNTQxNjUzLWIzMWMtNDcwZC05N2M5LWI1YWRkMzIxZTllOCJ9.eyJpZCI6InhjcTlyaDBtUW55WEVuZnJoU09nIiwiZW50ZXJwcmlzZUlkIjoiZWQ5ZjRmNjMtMzEzNi00MmUyLTg1N2EtMzk1MzZhNWVjNmFkIiwiZW50ZXJwcmlzZVNsdWciOiJ3aXNldXBsaXZlIiwib3JnYW5pemF0aW9uU2x1ZyI6Indpc2VyZWR1Y2FjYW8iLCJpYXQiOjE2NTI4OTc0MTR9.gYtHEY4icua33FTGK7axL_MghVqtLiQYwqDaW5SAXA_zbEcy6FvxYI_ULkWFWKXLlwRrRBD3LgcInLSNl3cAiYPlu_u7rxf444KdMs7NIJCkZHYMwRj3c4U79RmYmOH2-pM-I3z1IbkYPGfIDpH1aaXCvNrc7uWgzPGe9Ra_WxTO9PSjYlMO7UineHoWcGppU_TaBvj85kVTDh8SjkktVLKCmvr7izOBk6kGqzJ4nLP6eB0-GbU-LG2uvL4HqlGgaTvfleXQC5QCVquw29DF02gEtBlZetQ0jJa16ZMzizeZRrHyjK-BCLBuVYEFWDeWWMkRyJAPn3HwiV2oCUzaZgCQl1f2CLZZWa1CBtaKmaGWahVOMktiEpVlX-fKevXZHQ7gVvIhCLmA4TQ4qmFSqlIKRPZyJNDQRhmT3alVX9Cq0XtbrNaEjKvfl-MN4OIttEzvnP8fnhk0R4elSB6DxOnPQEYmJHNG5hyi3LSnAysbmf7x-Y6pR4ETwd0hD4tZRnHK8PtB8X4lGVhu9Qu2JTu1rN6xkB3Cl1aNLqluL2h9qikQdrsgne1onMX_UDYRuzidH7xD9xHGrBz7_DBGUqReNsQ0czCxyZwQW65uaMOGOrcHTipo4onuHG2-cOxuv6MvkmYvRSkWWjTNjzWwMY7bbInzZ5wDbieba7NZ8BI",
      },
      body: criarCustomer,
    }).then((response) => {
      expect(response).property("status").to.eq(201);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body).to.have.keys(
        "id",
        "name",
        "email",
        "document",
        "vindiData",
        "createdAt",
        "updatedAt",
        "deletedAt"
      );
      expect(body).to.contain({
        name: criarCustomer.name,
        email: criarCustomer.email,
        document: criarCustomer.document,
      });
    });
  });

  it("listar customer", () => {
    cy.request({
      method: METHOD.GET,
      url: `/v1/customers?email=${listarCustomer.email}`,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEwNTQxNjUzLWIzMWMtNDcwZC05N2M5LWI1YWRkMzIxZTllOCJ9.eyJpZCI6InhjcTlyaDBtUW55WEVuZnJoU09nIiwiZW50ZXJwcmlzZUlkIjoiZWQ5ZjRmNjMtMzEzNi00MmUyLTg1N2EtMzk1MzZhNWVjNmFkIiwiZW50ZXJwcmlzZVNsdWciOiJ3aXNldXBsaXZlIiwib3JnYW5pemF0aW9uU2x1ZyI6Indpc2VyZWR1Y2FjYW8iLCJpYXQiOjE2NTI4OTc0MTR9.gYtHEY4icua33FTGK7axL_MghVqtLiQYwqDaW5SAXA_zbEcy6FvxYI_ULkWFWKXLlwRrRBD3LgcInLSNl3cAiYPlu_u7rxf444KdMs7NIJCkZHYMwRj3c4U79RmYmOH2-pM-I3z1IbkYPGfIDpH1aaXCvNrc7uWgzPGe9Ra_WxTO9PSjYlMO7UineHoWcGppU_TaBvj85kVTDh8SjkktVLKCmvr7izOBk6kGqzJ4nLP6eB0-GbU-LG2uvL4HqlGgaTvfleXQC5QCVquw29DF02gEtBlZetQ0jJa16ZMzizeZRrHyjK-BCLBuVYEFWDeWWMkRyJAPn3HwiV2oCUzaZgCQl1f2CLZZWa1CBtaKmaGWahVOMktiEpVlX-fKevXZHQ7gVvIhCLmA4TQ4qmFSqlIKRPZyJNDQRhmT3alVX9Cq0XtbrNaEjKvfl-MN4OIttEzvnP8fnhk0R4elSB6DxOnPQEYmJHNG5hyi3LSnAysbmf7x-Y6pR4ETwd0hD4tZRnHK8PtB8X4lGVhu9Qu2JTu1rN6xkB3Cl1aNLqluL2h9qikQdrsgne1onMX_UDYRuzidH7xD9xHGrBz7_DBGUqReNsQ0czCxyZwQW65uaMOGOrcHTipo4onuHG2-cOxuv6MvkmYvRSkWWjTNjzWwMY7bbInzZ5wDbieba7NZ8BI",
      },
    }).then((response) => {
      expect(response).property("status").to.eq(200);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body[0]).to.have.keys(
        "id",
        "name",
        "email",
        "document",
        "phone",
        "vindiData",
        "createdAt",
        "updatedAt",
        "deletedAt"
      );
      expect(body[0]).to.contain({
        id: listarCustomer.id,
        name: listarCustomer.name,
        document: listarCustomer.document,
        email: listarCustomer.email,
        phone: null,
        createdAt: listarCustomer.createdAt,
        updatedAt: null,
        deletedAt: null,
      });
    });
  });

  it.only("criar customer", () => {
    cy.request({
      method: METHOD.POST,
      url: "/v1/customers",
      headers: {
        authorization: authorization,
      },
      body: createCustomer,
    }).then((response) => {
      expect(response).property("status").to.eq(201);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body).to.contain({
        name: createCustomer.name,
      });
    });
  });
});
