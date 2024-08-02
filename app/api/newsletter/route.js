import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import Newsletter from '@/app/models/newsletter';

mongooseConnect();
export async function POST(req, res) {
  const data = await req.json();
  console.log('list:-----------', data);
  try {
    const newEmail = {
      email: data.email,
      active: true,
    }
    console.log(newEmail)
  
    const newList = new Newsletter(newEmail)
    await newList.save();
  
    return NextResponse.json({
      message: 'success',
      newEmail
    });
    
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: 'fail',
    });
  }
}