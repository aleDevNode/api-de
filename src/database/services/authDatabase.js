const bcrypt = require("bcrypt");
const userDatabase = require("./userDatabase");
const { User,Member,File } = require("../../models");
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
          attributes:['name','full_name','email'],
          include:{
            model:File,
            as:'file',
            attributes:['id','path']

          }
      }
    });
    if (!user) throw "User or Password invalid! USER";
    if (!bcrypt.compareSync(password, user.password))
    throw "User or Password invalid! PASS";
    const usuToken = {
      id: user.id,
      name: user.member.full_name,
      login:user.login,
      func:user.member.func,
      email: user.member.email,
      avatar:user.member.file.path,
      status:user.status
    };
   
    const token = jwt.sign(usuToken, JwtKey, { expiresIn: "8h" });
    if (!token) throw "token invalid!";
    return { token };
  },
};
