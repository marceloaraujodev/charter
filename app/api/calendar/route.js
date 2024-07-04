import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import Task from "@/app/models/task";


mongooseConnect();

// populate all items on the page
export async function GET(req, res){

  //{private: false} to show only public calendar
  const tasks = await Task.find({});
  // console.log(tasks);
  
  return NextResponse.json({
    message: 'success',
    tasks
  })
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
  console.log('enter');
  const data = await req.json();
  console.log(data)

  const updatedEvent = {
    start: data.start,
    end: data.end,
    time: data.time,
    title: data.title,
    description: data.description,
    publicView: data.publicView,
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