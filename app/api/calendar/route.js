import { NextResponse } from "next/server";

export async function POST(req, res){

  return NextResponse.status(200).json('ok')
}