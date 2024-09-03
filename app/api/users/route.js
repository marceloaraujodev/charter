import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import hashPassword from '@/app/utils/hashPassword';

import User from '@/app/models/user';

mongooseConnect();

// Handles user Session & Sends users back to the frontend
export async function POST(req, res) {
  try {
    const {session} = await req.json();
    // console.log(session)
    // console.log(session.user.role)
    if(!session.user || !session.user.role){
      return NextResponse.json({
        message: 'fail',
      }, { status: 401 })
    }else{
      const users = await User.find();
      return NextResponse.json({
        message: 'success',
        users,
      })
    }
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message: 'server error',
    }, { status: 500 })
  }

}

// Edit users 
export async function PUT(req, res){
  const data = await req.json();
  console.log('should logg edit data from user form--------',data)

  const hashedPassword = await hashPassword(data.password);
  data.password = hashedPassword;

  console.log('should display new pass hashed', data);

  const user = await User.findOneAndUpdate({_id: data._id}, data, { new: true });

  return NextResponse.json({
    message:'success',
    user,
  })

}

export async function DELETE(req, res){
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const id = searchParams.get('id');

  await User.findOneAndDelete({_id: id});

  return NextResponse.json({
    message:'success',
  })
}