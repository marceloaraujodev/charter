import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import Vendor from '@/app/models/vendors';



mongooseConnect();

export async function POST(req, res){
  const data = await req.json();
  // console.log(data)

  const vendor = await Vendor.create(data);

  console.log('this should display new vendor', vendor)

  return NextResponse.json({
    message:'success',
  })
}

export async function GET(req, res){
  const vendors = await Vendor.find();
  // console.log('this should display all vendors', vendors)
  return NextResponse.json({
    message:'success',
    vendors
  })
}

// trying 
export async function PUT(req, res){
  try {
    const data = await req.json();

    const updatedData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
    }

    console.log('---------',updatedData)
    // console.log(' this should be the vendor editing route user',data)
    const vendor = await Vendor.findByIdAndUpdate(data._id, updatedData);


    return NextResponse.json({
      success: true,
      vendor
    })
    
  } catch (error) {
    return NextResponse.json({
      message:'fail',
    })
  }
}

export async function DELETE(req, res){
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const id = searchParams.get('id');

  await Vendor.findOneAndDelete({_id: id});

  return NextResponse.json({
    message:'success',
  })
}