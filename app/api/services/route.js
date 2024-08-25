import { NextResponse } from 'next/server';
import Service from '@/app/models/service';
import Expense from '@/app/models/expenses';
import { mongooseConnect } from '@/app/lib/mongooseConnect';

mongooseConnect();

// create service order and adds price to the Expense model
export async function POST(req, res) {
  const { id, vendor, service, price, date } = await req.json();
  // const data = await req.json();
  // console.log(data)

  const currentDate = new Date();
  const month = currentDate.getMonth();

  if ((!id, !vendor, !service, !price)) {
    return NextResponse.json({
      error: 'All fields are required!',
    });
  }

  try {

    const expense = new Expense({
      month: month,
      amounts: Number(price),
    });

    await expense.save();

    const newService = new Service({
      id: Number(id),
      vendor,
      service,
      price: Number(price),
      date: date,
      expense: expense._id
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
  const { _id, vendor, service, price } = await req.json();
  // const data = await req.json();
  // console.log(data)
  const currentDate = new Date();
  const month = currentDate.getMonth()

  if (!data._id ||!data.vendor ||!data.service ||!data.price) {
    return NextResponse.json({ message: 'All fields are required!' });
  }

  try {
    const updatedService = await Service.findByIdAndUpdate(_id, { vendor, service, price: Number(price) }, { new: true });
  
    if(!updatedService){
      return NextResponse.json({ message: 'No service found with that ID!' });
    }

    let expense = await Expense.findOne({ month: month });
    if(expense){
      // remove old price
      expense.amounts = expense.amounts.filter(amount => amount!== updatedService.price)
      expense.amounts.push(Number(price))
    }else{
      expense = new Expense({
        month: month,
        amounts: [Number(price)],
      });

      await expense.save();
      return NextResponse.json({ 
        message: 'Service updated and expense record adjusted successfully!'
      });
    }

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'server error' });
  }

}

export async function DELETE(req, res){
  const { id } = await req.json();

  const currentDate = new Date();
  const month = currentDate.getMonth(); // Get month index (0-11)

  try {
    // get service doc and delete it
    // const deletedService = await Service.findByIdAndDelete(id);
    const serviceDoc = await Service.findById(id);
    
  
    if(!serviceDoc){
      return NextResponse.json({ message: 'No service found with that ID!' });
    }
    const expenseDocId = serviceDoc.expense;
    console.log('expenseDoc------', expenseDocId)

    if(!expenseDocId){
      return NextResponse.json({ message: 'No expense found with that ID!' });
    }

    await Service.findByIdAndDelete(id);
    await Expense.findByIdAndDelete(expenseDocId);
    // const x = await Expense.findById(expenseDocId);
    // console.log(x)
    
    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'error' });
  }
}