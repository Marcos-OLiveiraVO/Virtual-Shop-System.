import AuthService from "../../../src/services/auth";
import bcrypt from "bcrypt";
import Util from "util";
import sinon from "sinon";

const hashSync = Util.promisify(bcrypt.hash);

describe("Service: Auth", () => {
  context("authenticate", async () => {
    it("should authenticate a user", async () => {
      const fakeUserModel = {
        findOne: sinon.stub(),
      };

      const user = {
        name: "John",
        email: "jhondoe@mail.com",
        password: "12345",
      };

      const authService = new AuthService(fakeUserModel);
      const hashedPassword = await hashSync("12345", 10);
      const userFromDatabase = { ...user, password: hashedPassword };

      fakeUserModel.findOne
        .withArgs({ email: "jhondoe@mail.com" })
        .resolves(userFromDatabase);

      const res = await authService.authenticate(user);

      expect(res).to.eql(userFromDatabase);
    });

    it("should return false when the password does not match", async () => {
      const user = {
        email: "jhondoe@mail.com",
        password: "12345",
      };

      const fakeUserModel = {
        findOne: sinon.stub(),
      };

      fakeUserModel.findOne.withArgs({
        email: user.email,
        password: "'aFakeHashedPass",
      });

      const authService = new AuthService(user);
      const response = await authService.authenticate(user);

      expect(response).to.be.false;
    });
  });
});
