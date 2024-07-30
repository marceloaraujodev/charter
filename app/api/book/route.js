import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import Task from '@/app/models/task';
import Customer from '@/app/models/customer';
import validator from 'validator';

mongooseConnect();

function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
  return `${hours}:${minutes}`;
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('data:-----------', data);

    // validation 
    if (!data.name || !data.lastName || !data.email || !data.phone || !data.date) {
      return NextResponse.json({
        message: 'Missing required fields',
      }, { status: 400 });
    }

    const isEmailValid = validator.isEmail(data.email);

    if(!isEmailValid) {
      return NextResponse.json({
        message: 'Missing required fields',
      }, { status: 400 });
    }
  
    const date = data.date;
  
    const doc = await Task.findOne({start: date, charter: true})
    console.log(doc)
  
    const availability = doc ? 'not available' : 'available';

    if (availability === 'available') {
      // const formatedTime = convertTimestampToTime(new Date().getTime());

      // check if customer exists
      const customer = await Customer.findOneAndUpdate(
        {email: data.email},
        // create a new customer
        {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        },
        { 
          new: true,
          upsert: true // createss a new doc if doc does not exist
        }
      );

      const createEvent = {
        start: data.date,
        end: '',
        time: '',
        title: `Charter`,
        description: data.message,
        publicView: false,
        charter: true,
        customer: customer._id,
      }
      console.log('this is create event', createEvent);
      // add customer event to calendar
      const newTask = new Task(createEvent);
      await newTask.save();

    }
  
    return NextResponse.json({
      message: 'success',
      availability
    });
    
  } catch (error) {
    console.log(error.message)
  }

}

    