import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import CheckList from '@/app/models/checklist';

mongooseConnect();
export async function POST(req, res) {
  try {
    const data = await req.json();
    console.log('data', data)
  
    const newList = new CheckList(data)
    await newList.save();
  
    return NextResponse.json({
      message: 'success',
    });
    
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: 'fail',
    });
  }
}

export async function GET(req, res) {
  try {
    // const data = await req.json();
    const lists = await CheckList.find()

    return NextResponse.json({
      message: 'success',
      lists
    });
    
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: 'fail',
    });
  }
}

export async function DELETE(req, res) {
  const {listId} = await req.json();
  console.log('listId from delete', listId)
  try {
    await CheckList.deleteOne({_id: listId})
    return NextResponse.json({message: 'success'});
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: 'fail'});
  }
}