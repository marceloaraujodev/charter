import { NextResponse } from 'next/server';
import Service from '@/app/models/service';
import { mongooseConnect } from '@/app/lib/mongooseConnect';

mongooseConnect();

// create service order
export async function POST(req, res) {
  const { id, vendor, service, price } = await req.json();

  if ((!id, !vendor, !service, !price)) {
    return NextResponse.json({
      error: 'All fields are required!',
    });
  }

  try {
    const newService = new Service({
      id: Number(id),
      vendor,
      service,
      price: Number(price),
    });

    await newService.save();

    return NextResponse.json({
      message: 'User created successfully!',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'An error occurred while saving the service',
    });
  }
}

// get all services order 
export async function GET(req, res) {
  const services = await Service.find();

  if (!services.length) {
    return NextResponse.json({ message: 'No services found' });
  }
  return NextResponse.json({ message: 'success', services });
}

// update service order by id, there is 2 ids, the frontend is mostly for displaying purposes. use _id for backend.
export async function PUT(req, res){
  const data = await req.json();
  try {
    const updatedService = await Service.findByIdAndUpdate(data._id, data, { new: true });
  
    return NextResponse.json({ message: 'success'});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' });
  }

}