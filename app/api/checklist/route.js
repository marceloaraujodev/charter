import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import CheckList from "@/app/models/checklist";

mongooseConnect();

// populate all items on the page
export async function POST(req, res){
  const data = await req.json();
  console.log(data)

  const doc = await CheckList.create({list: data})
  console.log(doc)

  return NextResponse.json({
    message: 'success',
    doc
  })
}