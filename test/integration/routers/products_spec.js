import supertest from "supertest";
import chai, { expect, request } from "chai";
import setupApp from "../../../src/app";
import Product from "../../../src/models/product";

global.setupApp = setupApp;
global.supertest = supertest;
global.expect = chai.expect;

describe("Routes: Products", () => {
  let request;
  let app;

  before(async () => {
    app = await setupApp();
    request = supertest(app);
  });

  after(async () => await app.database.connection.close());

  const defaultId = "56cb91bdc3464f14678934ca";

  const defaultProduct = {
    name: "Default product",
    description: "default description",
    price: 100,
  };

  const expectedProduct = {
    __v: 0,
    _id: defaultId,
    name: "Default product",
    description: "default description",
    price: 100,
  };

  beforeEach(async () => {
    await Product.deleteMany();

    const product = new Product(defaultProduct);
    product._id = "56cb91bdc3464f14678934ca";
    return await product.save();
  });

  afterEach(async () => await Product.deleteMany());

  describe("GET /products", () => {
    it("should return a list of products", (done) => {
      request.get("/products").end((err, res) => {
        expect(res.body).to.eql([expectedProduct]);
        done(err);
      });
    });

    context("when an id is specified", (done) => {
      it("should return 200 with one product", (done) => {
        request.get(`/products/${defaultId}`).end((err, res) => {
          expect(res.statusCode).to.eql(200);
          expect(res.body).to.eql([expectedProduct]);
          done(err);
        });
      });
    });
  });

  describe("POST /products", () => {
    context("when posting a product", () => {
      it("should return a new product with status code 201", (done) => {
        const customId = "56cb91bdc3464f14678934ba";

        const newProduct = Object.assign(
          {},
          { _id: customId, __v: 0 },
          defaultProduct
        );

        const expectedSavedProduct = {
          __v: 0,
          _id: customId,
          name: "Default product",
          description: "default description",
          price: 100,
        };

        request
          .post("/products")
          .send(newProduct)
          .end((err, res) => {
            expect(res.statusCode).to.eql(201);
            expect(res.body).to.eql(expectedSavedProduct);
            done(err);
          });
      });
    });
  });

  describe("PUT /products/:id", () => {
    context("when editing a product", () => {
      it("should updated the product and return 200 as status code", (done) => {
        const customProduct = {
          name: "Custom name",
        };

        const updatedProduct = Object.assign({}, customProduct, defaultProduct);

        request
          .put(`/products/${defaultId}`)
          .send(updatedProduct)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done(err);
          });
      });
    });
  });

  describe("Delete /products/:id", () => {
    context("when deleting a product", () => {
      it("should delete a product and return 204 as status code", (done) => {
        request.delete(`/products/${defaultId}`).end((err, res) => {
          expect(res.status).to.eql(204);
          done(err);
        });
      });
    });
  });
});

//Como a maioria dos testes precisará de um produto,
//tanto para inserir quanto para verificar nas buscas,
//criamos uma constante chamada defaultProduct para ser reusada pelos casos de teste.
//O próximo passo é descrever a nossa primeira suíte de testes:

//Adicionamos mais um describe para deixar claro que todas as
//suítes de teste dentro dele fazem parte do método http GET na rota /products.
//Isso facilita a legibilidade do teste e deixa a saída do terminal mais clara.

//A função it também é uma global do Mocha e é responsável por descrever um caso de teste.
//Descrições de casos de teste seguem um padrão declarativo,
//como no exemplo acima: “Isso deve retornar uma lista de produtos”.
//Note que também é passado um parâmetro chamado done para o caso de teste,
//isso ocorre porque testes que executam funções assíncronas, como requisições http,
//precisam informar ao Mocha quando o teste finalizou e fazem isso chamando a função done.
//Vejamos na implementação a seguir:

//Na implementação do teste usamos o supertest que exportamos globalmente como request no helpers.js.
//O supertest nos permite fazer uma requisição http para uma determinada rota e verificar a sua resposta.
//Quando a requisição terminar a função end será chamada pelo supertest e vai receber a resposta ou um erro,
//caso ocorra. No exemplo acima é verificado se
//o primeiro elemento da lista de produtos retornada é igual ao nosso defaultProduct.
//O expect usado para fazer a asserção faz parte do Chai e foi exposto globalmente no helpers.js.
//Para finalizar, notificamos o Mocha que o teste finalizou chamando a função done que recebe err como parâmetro,
//caso algum erro ocorra ele irá mostrar a mensagem de erro no terminal.
