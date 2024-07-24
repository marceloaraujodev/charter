import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';

mongooseConnect();

export async function POST(req, res) {
  const data = await req.json();
  console.log('data:-----------', data);

  const message = data.message;



    return NextResponse.json({
      message: 'success',
    });
  }
    