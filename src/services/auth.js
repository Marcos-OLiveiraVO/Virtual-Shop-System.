import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

class Auth {
  constructor(User) {
    this.User = User;
  }

  async authenticate(data) {
    const user = await this.User.findOne({ email: data.email });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return false;
    }

    return user;
  }
}

export default Auth;
