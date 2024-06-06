// this is a sub route for the app router route is /api/products
import { NextResponse } from "next/server";

export async function POST(){
  return NextResponse.json('ok')
}