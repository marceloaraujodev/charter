import { NextResponse } from "next/server";
import Income from "@/app/models/income";

export async function POST(req, res) {
  console.log('create income entry')
  const { id, vendor, service, price, date, status } = await req.json();
  // const data = await req.json();
  // console.log(data)

  if ((!id, !vendor, !service, !price, !date)) {
    return NextResponse.json({
      error: 'All fields are required!',
    });
  }

  try {
    const newIncome = new Income({
      id: Number(id),
      vendor,
      service,
      price: Number(price),
      date: date,
      status: null, // for first items post will be first item added, edits will be on put
    });

    await newIncome.save();

    return NextResponse.json({
      message: 'Income entry added successfully!',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: 'An error occurred while saving the service',
    });
  }
}

export async function GET(req, res){

  const incomes = await Income.find();

  return NextResponse.json({success: true, incomes});
}

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
    const updatedIncome = await Income.findByIdAndUpdate(
      _id, 
      { vendor, service, price: Number(price), date: newDate }, 
      { new: true }
    );

    console.log('----', updatedIncome);

    if(!updatedIncome){
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
    const incomeDoc = await Income.findByIdAndDelete(_id);
  
    if(!incomeDoc){
      return NextResponse.json({ message: 'No income entry found with that ID!' });
    }
    
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' });
  }
}