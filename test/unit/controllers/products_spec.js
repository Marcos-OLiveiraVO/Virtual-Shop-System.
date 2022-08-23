import chai, { expect, should } from "chai";
import { afterEach, beforeEach } from "mocha";
import sinon from "sinon";
import ProductsController from "../../../src/controllers/products";
import Product from "../../../src/models/product";

global.expect = chai.expect;

describe("Controllers: Products", () => {
  const defaultProduct = [
    {
      __v: 0,
      _id: "56cb91bdc3464f14678934ca",
      name: "Default product",
      description: "product description",
      price: 100,
    },
  ];

  const defaultRequest = {
    params: {},
  };

  describe("get() products", () => {
    it("should return a list of products", async () => {
      const response = {
        send: sinon.spy(),
      };

      Product.find = sinon.stub();
      Product.find.withArgs({}).resolves(defaultProduct);

      const productsController = new ProductsController(Product);

      await productsController.get(defaultRequest, response);

      sinon.assert.calledWith(response.send, defaultProduct);
    });

    it("should return 400 when an err occurs", async () => {
      const request = {};
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      response.status.withArgs(400).returns(response);
      Product.find = sinon.stub();
      Product.find.withArgs({}).rejects({ message: "Error" });

      const productsController = new ProductsController(Product);

      await productsController.get(request, response);

      sinon.assert.calledWith(response.send, "Error");
    });
  });

  describe("getById()", () => {
    it("should return one product", async () => {
      const fakeId = "a-fake-id";
      const request = {
        params: {
          id: fakeId,
        },
      };

      const response = {
        send: sinon.spy(),
      };

      Product.find = sinon.stub();
      Product.find.withArgs({ _id: fakeId }).resolves(defaultProduct);

      const productsController = new ProductsController(Product);
      await productsController.getById(request, response);

      sinon.assert.calledWith(response.send, defaultProduct);
    });
  });

  describe("create() product", () => {
    it("should return a new product successfully", async () => {
      const requestWithBody = Object.assign(
        {},
        { body: defaultProduct[0] },
        defaultProduct
      );

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeProduct {
        save() {}
      }

      response.status.withArgs(201).returns(response);
      sinon.stub(fakeProduct.prototype, "save").withArgs().resolves();

      const productsController = new ProductsController(fakeProduct);

      await productsController.create(requestWithBody, response);
      sinon.assert.calledWith(response.send);
    });
  });

  context("when an error occurs", () => {
    it("should return 422", async () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeProduct {
        save() {}
      }

      response.status.withArgs(422).returns(response);
      sinon
        .stub(fakeProduct.prototype, "save")
        .withArgs()
        .rejects({ message: "Error" });

      const productsController = new ProductsController(fakeProduct);

      await productsController.create(defaultRequest, response);

      sinon.assert.calledWith(response.status, 422);
    });
  });

  describe("update() product", () => {
    it("should respond with 200 when the product has been update", async () => {
      const fakeId = "a-fake-id";
      const updatedProduct = {
        _id: fakeId,
        name: "Updated name",
        description: "Updated description",
        price: 150,
      };

      const request = {
        params: {
          id: fakeId,
        },
        body: updatedProduct,
      };

      const response = {
        sendStatus: sinon.spy(),
      };

      class fakeProduct {
        static updateOne() {}
      }

      const updateOneStub = sinon.stub(fakeProduct, "updateOne");
      updateOneStub
        .withArgs({ _id: fakeId }, updatedProduct)
        .resolves(updatedProduct);

      const productsController = new ProductsController(fakeProduct);

      await productsController.update(request, response);
      sinon.assert.calledWith(response.sendStatus, 200);
    });
  });

  context("when an error occurs", () => {
    it("should return 422", async () => {
      const fakeId = "a-fake-id";

      const updatedProduct = {
        _id: fakeId,
        name: "Updated product",
        description: "Updated Description",
        price: 150,
      };

      const request = {
        params: {
          id: fakeId,
        },
        body: updatedProduct,
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeProduct {
        static updateOne() {}
      }

      const updateOneStub = sinon.stub(fakeProduct, "updateOne");
      updateOneStub
        .withArgs({ _id: fakeId }, updatedProduct)
        .rejects({ message: "Error" });
      response.status.withArgs(422).returns(response);

      const productsController = new ProductsController(fakeProduct);

      await productsController.update(request, response);
      sinon.assert.calledWith(response.send, "Error");
    });
  });

  describe("delete() product", async () => {
    it("should response with 204 when the product has been deleted", async () => {
      const fakeId = "a-fake-id";

      const request = {
        params: { id: fakeId },
      };

      const response = {
        sendStatus: sinon.spy(),
      };

      class fakeProduct {
        static deleteOne() {}
      }

      const deleteOneStub = sinon.stub(fakeProduct, "deleteOne");
      deleteOneStub.withArgs({ _id: fakeId }).resolves([1]);

      const productsController = new ProductsController(fakeProduct);

      await productsController.remove(request, response);
      sinon.assert.calledWith(response.sendStatus, 204);
    });
  });

  context("when an error occurs", () => {
    it("should return 400", async () => {
      const fakeId = "a-fake-id";

      const request = {
        params: { id: fakeId },
      };

      const response = {
        send: sinon.spy(),
        status: sinon.stub(),
      };

      class fakeProduct {
        static deleteOne() {}
      }

      const deleteOneStub = sinon.stub(fakeProduct, "deleteOne");
      deleteOneStub.withArgs({ _id: fakeId }).rejects({ message: "Error" });
      response.status.withArgs(400).returns(response);

      const productsController = new ProductsController(fakeProduct);

      await productsController.remove(request, response);
      sinon.assert.calledWith(response.send, "Error");
    });
  });
});
