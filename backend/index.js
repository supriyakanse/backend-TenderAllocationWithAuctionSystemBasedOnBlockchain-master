const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',

  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'supriyak8403@gmail.com',
    pass: 'iogb dpsz yrrp rhss'
  }
});

// Route to send emails
app.post('/api/send-emails', (req, res) => {
  
  const mailOptions = {
    from: 'supriyak8403@gmail.com',
    to: req.body.emails,
    subject: req.body.sub,
    text: req.body.msg
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json('Email sent successfully');
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
