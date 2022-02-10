const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
require("dotenv").config();

// const {google} = require('googleapis')
// const {OAuth2} = google.auth;

// const email = process.env.USER_EMAIL
// const clientId = process.env.CLIENT_ID
// const clientSecret = process.env.CLIENT_SECRET
// const refreshToken = process.env.REFRESH_TOKEN

// const OAuth2_client = new OAuth2(clientId,clientSecret)

// OAuth2_client.setCredentials({refresh_token:refreshToken})

// const accessToken = OAuth2_client.getAccessToken();

var transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SEND_BLUE, // generated ethereal user
    pass: process.env.PASS_SEND_BLUE, // generated ethereal password
  },
});

// var transport = nodemailer.createTransport({
//   service:'gmail',
//   auth: {
//     type:'OAuth2',
//     user:email,
//     clientId,
//     clientSecret,
//     // refreshToken,
//     // accessToken
//   },

// });

async function mail(nameFile, obj, to, from, subject) {
  const file = path.resolve("src", "email", "templates", nameFile + ".ejs");
  const data = await ejs.renderFile(file, obj);
  const mainOptions = {
    from,
    to,
    subject,
    html: data,
  };

  transport.sendMail(mainOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
      console.log("email: " + mainOptions.to);
    }
  });
}

module.exports = mail;
