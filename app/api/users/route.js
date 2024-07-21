import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';

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
      console.log(users)
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
