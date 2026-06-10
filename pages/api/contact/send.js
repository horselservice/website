import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export default async function sendHandler(req, res) {

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(422).json({ message: 'Invalid form data' })
  }

  try {
    await transporter.sendMail({
      from: 'noreply@horselservice.se',
      to: 'info@horselservice.se',
      subject: 'Nytt meddelande från webbplatsen',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    })

    res.status(200).send('Email sent successfully')
  } catch (error) {
    res.status(500).send('Failed to send email')
  }
}
