import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import Task from "@/app/models/task";



mongooseConnect();

export async function POST(req, res){
  const data = await req.json();
  console.log(data);

  const newTask = new Task(data);
  await newTask.save();

  return NextResponse.json({
    message: 'success',
    data: newTask
  })
}

export async function GET(req, res){
  
}

// req.json() wont work delete does not take req I guess
export async function DELETE(req, res){

  -
  console.log('hi');
  return NextResponse.json({message: 'success'})
}