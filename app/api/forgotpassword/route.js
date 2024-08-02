import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import User from '@/app/models/user';
import crypto from 'crypto';
import bcrypt from 'bcrypt'; 
import sendMail from '@/app/utils/sendEmail';

mongooseConnect();

async function hashToken(token){
  const saltRounds = 10;
  return await bcrypt.hash(token, saltRounds);
}

function generateToken(){
  return crypto.randomBytes(20).toString('hex')
}

export async function POST(req, res) {
  const {email} = await req.json();
  console.log('list:-----------', email);
  try {
    const forgotPasswordToken = generateToken();
    const encryptedToken = await hashToken(forgotPasswordToken);
    const forgotPasswordExpires = Date.now() + 60 * 60 * 1000
    const user = await User.findOneAndUpdate({email}, {forgotPasswordToken: encryptedToken, forgotPasswordExpires});
    
    if(!user){
      return NextResponse.json({
        message: 'User not found',
      }, { status: 404 });
    }

    let mailOptions = {
      from: process.env.EMAIL, 
      to: email, 
      subject: 'Aphrodite charters email recovery', 
      text: `Recovery link: 
      https://www.aphroditecharters.com/reset-password/?token=${forgotPasswordToken}&email=${encodeURIComponent(email)}`  
    };

    sendMail(mailOptions);

    return NextResponse.json({
      message: 'success',
      user
    });
    
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: 'fail',
    });
  }
}