import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import hashPassword from '@/app/utils/hashPassword';
import User from '@/app/models/user';

mongooseConnect();

export async function POST(req, res) {
  const data = await req.json();

  const newUser = {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    phone: data.phone,
    role: data.type,
  }
  const hash = await hashPassword(newUser.password)
  newUser.password = hash;
  // console.log('new user after pass has', newUser);
  
  const user = await User.create(newUser);
  console.log('user after saved to db', user);

  return NextResponse.json({
    message: 'success',
  })
}

