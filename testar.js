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



// update event
await event.files.forEach(async (file) => {
  console.log(file);
//   fs.unlink(
//     path.resolve("src", "public", "images", "events", file.file_name),
//     (err) => {
//       if (err) throw err;
//       console.log("Arquivo deletado da pasta=> " + file.file_name);
//     }
//     );
   
 
//   const respDel = await File.destroy({
//     where: {
//       id: file.id,
//     },
//   });
//   if (respDel) console.log("file deletado com sucesso!");
// });
// const filesCreate = files.map((file) => ({
//   id: uuid(),
//   path: file.path,
//   file_name: file.filename,
//   type: file.mimetype,
// }));

// filesCreate.map(async (file) => {
//   if (files.length > 0) {
//     const fileMap = await File.create(file);
//     if (!fileMap) return console.log("no register files");
//     await EventFile.create({
//       id: uuid(),
//       file_id: fileMap.id,
//       event_id: id,
//     });
//   }
// });

// const eventUpdate = {
//   title: title ? title : event.title,
//   description: description ? description : event.description,
// };

// const responseEvent = await Event.update(eventUpdate, {
//   where: {
//     id,
//   },
});