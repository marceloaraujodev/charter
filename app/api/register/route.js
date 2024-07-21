import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import bcrypt from 'bcrypt';
import User from '@/app/models/user';

mongooseConnect();

export async function POST(req, res) {
  const data = await req.json();

  const saltRounds = 10;

  const newUser = {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    phone: data.phone,
    role: data.type,
  }
  // console.log('new user before pass hash', newUser);
  
  
  // hashing the first passa
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(newUser.password, salt);
  console.log(hash);
  newUser.password = hash;
  console.log('new user after pass has', newUser);
  
  const user = await User.create(newUser);
  console.log('user after saved to db', user);

  return NextResponse.json({
    message: 'success',
  })
}
