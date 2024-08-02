import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import sendMail from '@/app/utils/sendEmail';

mongooseConnect();

// message: 'tttt',
// email: 'marcelo.dev.coder@gmail.com',
// phone: '47992009823',
// name: 'Marcelo Araujo'

export async function POST(req, res) {
  const {message, email: senderEmail, phone, name} = await req.json();
  console.log('data:-----------', {message, senderEmail, phone, name});

// create transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL, 
//     pass: process.env.APP_PASSWORD 
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // send mail function
// async function sendMail() {
//   let mailOptions = {
//     from: senderEmail, 
//     to: process.env.EMAIL, 
//     subject: 'Aphrodite Charters Website Message', 
//     text: `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`  
//   };

//   try {
//     let info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// }
const mailOptions = {
  from: senderEmail, 
  to: process.env.EMAIL, 
  subject: 'Aphrodite Charters Website Message', 
  text: `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`  
};

sendMail(mailOptions)

try {
  await sendMail();

  return NextResponse.json({
    message: 'success',
  });
} catch (error) {
  return NextResponse.json({
      message: 'failure',
      error: error.message,
    }, { status: 500 });
  }
}

    