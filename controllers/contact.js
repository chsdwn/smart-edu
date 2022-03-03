const nodemailer = require('nodemailer')

exports.send = async (req, res) => {
  try {
    const { name, email, message } = req.body

    const html = `
      <h1>From:</h1>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
      </ul>

      <h1>Message:</h1>
      <p>${message}</p>
    `

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    })

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Smart EDU Contact Form" <adense2@gmail.com>', // sender address
      to: process.env.MAIL_USER, // list of receivers
      subject: 'Smart EDU Contact Form Message', // Subject line
      html
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash('success', 'Successfully sent.')
  } catch {
    req.flash('error', 'An error occured.')
  } finally {
    res.status(200).redirect('/contact')
  }
}
