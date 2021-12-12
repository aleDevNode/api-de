const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require('path')

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "60031165afbacc",
    pass: "6adfdf65311e8c"
  }
});
async function mail(nameFile,obj,to,from,subject){
  const file = path.resolve("src", "email", "templates", nameFile + '.ejs');
  const data = await ejs.renderFile(file, obj);
  const mainOptions = {
    from,
    to,
    subject,
    html: data
  };
  
  transport.sendMail(mainOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });

}

module.exports = mail;
