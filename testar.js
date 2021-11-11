// const fs = require("fs");
// const nodemailer = require("nodemailer");
// const ejs = require("ejs");

// const transporter = nodemailer.createTransport({
//   host: 'smtp.zoho.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'testmail@zoho.com',
//     pass: '123456'
//   }
// });

// const data = await ejs.renderFile(__dirname + "/test.ejs", { name: 'Stranger' });

// const mainOptions = {
//   from: '"Tester" testmail@zoho.com',
//   to: 'totest@zoho.com',
//   subject: 'Hello, world!',
//   html: data
// };

// transporter.sendMail(mainOptions, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Message sent: ' + info.response);
//   }
// });