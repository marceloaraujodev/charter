import { NextResponse } from 'next/server';
import Service from '@/app/models/service';
import Expense from '@/app/models/expenses';
import { mongooseConnect } from '@/app/lib/mongooseConnect';

mongooseConnect();

// create service order and adds price to the Expense model
export async function POST(req, res) {
  console.log('create service')
  const { id, vendor, service, price, date, status } = await req.json();
  // const data = await req.json();
  // console.log(data)

  if ((!id, !vendor, !service, !price, !date)) {
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
      date: date,
      status: null, // for first items post will be firt item added, edits will be on put
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
  // console.log(services)


  if (!services.length) {
    return NextResponse.json({ message: 'No services found' });
  }
  return NextResponse.json({ message: 'success', services });
}

// update service order by id, there is 2 ids, the frontend is mostly for displaying purposes. use _id for backend.
export async function PUT(req, res){
  const { _id, vendor, service, price, date } = await req.json();
  // const data = await req.json();
  // console.log(data)
  console.log(_id, vendor, service, price, date)
  const newDate = new Date(date)

  if (!_id || !vendor) {
    return NextResponse.json({ message: 'All fields are required!' });
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(
      _id, 
      { vendor, service, price: Number(price), date: newDate }, 
      { new: true }
    );

    console.log('----', updatedService);

    if(!updatedService){
      return NextResponse.json({ message: 'No service found with that ID!' });
    }

      // await expense.save();
      return NextResponse.json({ 
        message: 'Service updated and expense record adjusted successfully!'
      });
    

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' });
  }
}

export async function DELETE(req, res){
  const { _id } = await req.json();
  console.log(_id)

  try {
    // get service doc and delete it
    // const deletedService = await Service.findByIdAndDelete(id);
    const serviceDoc = await Service.findByIdAndDelete(_id);
  
    if(!serviceDoc){
      return NextResponse.json({ message: 'No service found with that ID!' });
    }
    
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' });
  }
}