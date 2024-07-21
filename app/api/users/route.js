import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import hashPassword from '@/app/utils/hashPassword';

import User from '@/app/models/user';

mongooseConnect();

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
      console.log('this is users being returned',users)
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

export async function PUT(req, res){
  const data = await req.json();
  console.log(data)

  const hashedPassword = await hashPassword(data.password);
  data.password = hashedPassword;

  console.log('should display new pass hashed', data);

  const user = await User.findOneAndUpdate({email: data.email}, data, { new: true });

  return NextResponse.json({
    message:'success',
    user,
  })
  // try {
  //   const {session} = await req.json();
  //   if(!session.user ||!session.user.role){
  //     return NextResponse.json({
  //       message: 'fail',
  //     }, { status: 401 })
  //   }else{
  //     const { id, name, email } = req.body;
  //     const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
  //     return NextResponse.json({
  //       message:'success',
  //       user,
  //     })
  //   }
  // } catch (error) {
  //   console.log(error)
  //   return NextResponse.json({
  //     message:'server error',
  //   }, { status: 500 })
  // }
}

export async function DELETE(req, res){
  const url = new URL(req.url);
  console.log(url)
  const searchParams = url.searchParams;
  const id = searchParams.get('id');
  console.log(id)

  await User.findOneAndDelete({_id: id});

  return NextResponse.json({
    message:'success',
  })
}