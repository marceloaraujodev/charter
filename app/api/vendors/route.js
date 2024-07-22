import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import Vendor from '@/app/models/vendors';


mongooseConnect();

export async function POST(req, res){
  const data = await req.json();
  console.log(data)

  const vendor = await Vendor.create(data);

  console.log('this should display new vendor', vendor)

  return NextResponse.json({
    message:'success',
  })
}

export async function GET(req, res){
  const vendors = await Vendor.find();
  console.log('this should display all vendors', vendors)
  return NextResponse.json({
    message:'success',
    vendors
  })
}