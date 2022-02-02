const nodemailer = require('nodemailer')
const { convert } = require('html-to-text')
const juice = require('juice')
const util = require('util')
const pug = require('pug')

const emailConfig = require('../config/email')

// Send Mail Synchronous

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
})

// generate HTML
const generateHTML = () => {
  const html = pug.renderFile(`${__dirname}/../views/emails/reset-password.pug`)
  return juice(html)
}

// send mail with defined transport object
transport.sendMail({
  from: '"UpTask" <no-reply@uptask.com>', // sender address
  to: 'email@email.com', // list of receivers
  subject: 'Password reset ✔', // Subject line
  text: 'Hello world?', // plain text body
  html: generateHTML() // html body
})
