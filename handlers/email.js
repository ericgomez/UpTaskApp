const nodemailer = require('nodemailer')
const { convert } = require('html-to-text')
const juice = require('juice')
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
const generateHTML = (file, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${file}.pug`,
    options
  )
  return juice(html)
}

// send mail with defined transport object
exports.sendEmail = async options => {
  const html = generateHTML(options.file, options)
  const text = convert(html)

  await transport.sendMail({
    from: '"UpTask" <no-reply@uptask.com>', // sender address
    to: options.user.email, // list of receivers
    subject: options.subject, // Subject line
    text,
    html
  })
}
