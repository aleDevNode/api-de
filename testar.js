const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require('path')

async function mail(){

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "60031165afbacc",
          pass: "6adfdf65311e8c"
        }
      });
    const file = path.resolve('src','email','templates','login.ejs')
      const data = await ejs.renderFile(file, { name: 'Stranger' });
    
    const mainOptions = {
      from: '"Tester" testmail@zoho.com',
      to: 'totest@zoho.com',
      subject: 'Hello, world!',
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

mail()
// const teste = fs.readFile(file, (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
