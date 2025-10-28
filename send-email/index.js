const express = require('express');
const app = express()
const nodemailer = require("nodemailer");
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')

app.set('view engine', 'ejs')


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'shawonredwanhussain@gmail.com',
        pass:'lsxdylaqhwlpmarj'
    }
})


app.get('/send-mail',async (req, res) => {
    try {
      const templatePath = path.join(__dirname, "views", "email-template.ejs");
      const htmlContent = await ejs.renderFile(templatePath, { name: "Redwan" });

      const info = await transporter.sendMail({
        from: '"Redwan" <shawonredwanhussain@gmail.com>',
        to: "shawonredwanhussain2@gmail.com",
        subject: "mail send",
        //   text: "mail send new user",
        html: htmlContent,
        attachments: [
          {
            filename: "data.pdf",
            path: path.join(__dirname, "public", "files", "data.pdf"),
          },
        ],
      });

      res.json({ message: "email send Successfully", info });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'failed to send email',error});
    }
})





app.listen(3000, () => {
    console.log('server runing 3000 port')
})