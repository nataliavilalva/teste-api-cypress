import { it } from "faker-br/lib/locales";
import { authorization, mouse, userCadastrer } from "../fixtures/dataUtils";
import METHOD from "../fixtures/method.json";

var faker = require("faker-br");

context("produtos", () => {
  it("listar produtos", () => {
    cy.request({
      method: METHOD.GET,
      url: "https://serverest.dev/produtos",
    }).then((response) => {
      expect(response).property("status").to.eq(200);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body).property("produtos").to.not.empty;
    });
  });

  it("listar produtos com nome Logitech MX Vertical", () => {
    cy.request({
      method: METHOD.GET,
      url: `https://serverest.dev/produtos?nome=${mouse.nome}`,
    }).then((response) => {
      expect(response).property("status").to.eq(200);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body).property("quantidade").to.eq(1);
      expect(body).property("produtos").to.not.empty;
      expect(body)
        .property("produtos")
        .to.deep.equal([{ ...mouse, quantidade: 0 }]);
    });
  });

  it(" Buscar produto por ID", () => {
    cy.listarProdutoId(mouse._id).then((response) => {
      expect(response).property("status").to.eq(200);
      expect(response).property("body").to.not.empty;
      const { body } = response;
      expect(body).to.contain({
        _id: mouse._id,
        nome: mouse.nome,
      });
    });
  });

  it("Cadastrar produto", () => {
    cy.login(userCadastrer.email, userCadastrer.password).then((response) => {
      cy.request({
        method: METHOD.POST,
        url: `https://serverest.dev/produtos`,
        headers: {
          authorization: response.body.authorization,
        },
        body: {
          nome: faker.commerce.productName(),
          preco: faker.commerce.price(),
          descricao: faker.lorem.word(),
          quantidade: faker.random.number(),
        },
      }).then((response) => {
        expect(response).property("status").to.eq(201);
        expect(response).property("body").to.not.empty;
        const { body } = response;
        expect(body).to.contain({
          message: "Cadastro realizado com sucesso",
        });
      });
    });
  });

  it("Editar produto", () => {
    cy.login(userCadastrer.email, userCadastrer.password).then((response) => {
      cy.request({
        method: METHOD.PUT,
        url: `https://serverest.dev/produtos/BeeJh5lz3k6kSIzA`,
        headers: {
          authorization: response.body.authorization,
        },
        body: {
          nome: "Produto Editado 2",
          preco: 100,
          descricao: "teclado",
          quantidade: 10,
        },
      }).then((response) => {
        expect(response).property("status").to.eq(200);
        expect(response).property("body").to.not.empty;
        const { body } = response;
        expect(body).to.contain({
          message: "Registro alterado com sucesso",
        });
      });
    });
  });

  it("Deletar produto", () => {
    cy.login(userCadastrer.email, userCadastrer.password).then((response) => {
      cy.cadastrarProduto(response.body.authorization).then((idProduto) => {
        cy.deletar(response.body.authorization, idProduto, "produtos");
      });
    });
  });
});
//criar um cenário que cadastre o produto e use o id para buscar

it("Cadastrar produto e buscar por ID", () => {
  cy.login(userCadastrer.email, userCadastrer.password).then((response) => {
    cy.cadastrarProduto(response.body.authorization).then(
      ([idProduto, produto]) => {
        cy.listarProdutoId(idProduto).then((response) => {
          expect(response).property("status").to.eq(200);
          expect(response.body).to.contain({
            descricao: produto.descricao,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: produto.quantidade,
          });
        });
      }
    );
  });
});
// cadastrar, listar e deletar
it.only("Cadastrar produto, listar e deletar", () => {
  cy.login(userCadastrer.email, userCadastrer.password).then((response) => {
    const authorization = response.body.authorization;
    cy.cadastrarProduto(authorization).then(([idProduto, produto]) => {
      cy.listarProdutoId(idProduto).then((response) => {
        cy.deletar(authorization, idProduto, "produtos");
      });
    });
  });
});
//cadastrar, listar e editar
it("Cadastrar produto, listar e editar", () => {
  cy.login(userCadastrer.email, userCadastrer.password).then((response) => {
    const authorization = response.body.authorization;
    cy.cadastrarProduto(authorization).then(([idProduto, produto]) => {
      cy.listarProdutoId(idProduto).then((response) => {
        
      });
    });
  });
})