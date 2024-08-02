import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import User from "@/app/models/user";
import bcrypt from 'bcrypt';
import hashPassword from '@/app/utils/hashPassword';

mongooseConnect();

export async function GET(req, res) {
  const url = new URL(req.url);
  console.log(url)
  const searchParams = url.searchParams;
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  
  const user = await User.findOne({email: email});
  console.log('user.forgotPasswordToken:',user.forgotPasswordToken)
  
  const isTokenValid = await bcrypt.compare(token, user.forgotPasswordToken)

  if (!isTokenValid) {
    return NextResponse.json({ message: 'Token is invalid or has expired' }, { status: 400 });
  }

  console.log(user)
  console.log(isTokenValid)

  return NextResponse.json({
    message: 'success',
  })
}
// Reset password and save
export async function POST(req, res){
  const data = await req.json();
  console.log(data)

  const hashedPassword = await hashPassword(data.password)
 
  await User.findOneAndUpdate({email: data.email}, {
    password: hashedPassword,
    forgotPasswordExpires: Date.now()
  });

  return NextResponse.json({
    message: 'success',
    })
}
