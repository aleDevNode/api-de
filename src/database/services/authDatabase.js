const bcrypt = require("bcrypt");
const userDatabase = require("./userDatabase");
const { User,Member } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JwtKey = process.env.JWT_PASS;

module.exports = {
  auth: async (body) => {
    const { login, password } = body;
    const user = await User.findOne({
      where: {
        login,
      },
      include:{
          model:Member,
          as:'member',
          attributes:['full_name','email']
      }
    });
 
   
    if (!user) throw "User or Password invalid! USER";
    if (!bcrypt.compareSync(password, user.password))
      throw "User or Password invalid! PASS";
    const usuToken = {
      id: user.id,
      name: user.member.full_name,
      email: user.member.email,
    };
    const token = jwt.sign(usuToken, JwtKey, { expiresIn: "8h" });
    if (!token) throw "token invalid!";
    return { token };
  },
};
