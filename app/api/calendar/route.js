import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import { getServerSession } from 'next-auth/next';
import Task from "@/app/models/task";
import Customer from "@/app/models/customer";



mongooseConnect();

// populate all items on the page
export async function GET(req, res){

  // await corsMiddleware(req, NextResponse);
  // console.log('passed cors middleware');
  const session = await getServerSession({ req, res });
  // console.log('this should be session, if null you need to login', session)

  // if user logged in gets all the calendar
  if(session?.user?.email){
    const tasks = await Task.find().populate('customer');
    // console.log(tasks);
    
    return NextResponse.json({
      message: 'success',
      tasks
    })

  }else{
    const tasks = await Task.find({publicView: true});
    
    return NextResponse.json({
      message: 'success',
      tasks
    },{
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': ['https://www.aphroditecharters.com'],
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }})
  }
}

// adds task
export async function POST(req, res){
  const data = await req.json();
  // console.log(data);

  const newTask = new Task(data);

  await newTask.save();

  return NextResponse.json({
    message: 'success',
    data: newTask
  })
}

// edit / save task
export async function PUT(req, res){
  const data = await req.json();
  // console.log(data)

  const updatedEvent = {
    start: data.start,
    end: data.end,
    time: data.time,
    title: data.title,
    description: data.description,
    publicView: data.publicView,
    charter: data.charter
  }

  const newUpdatedEvent = await Task.findOneAndUpdate({eventId:data.eventId}, updatedEvent, { new: true});
  console.log(newUpdatedEvent)
  return NextResponse.json({
    message: 'success', 
    newUpdatedEvent
  })
}

// if I set up the modal to display events dynamic I will use req.query here.
// req.json() wont work delete does not take req I guess
export async function DELETE(req, res){
  const eventId = req.headers.get('eventId')
  await Task.deleteOne({eventId: eventId})

  return NextResponse.json({message: 'success'})
}