import { NextResponse } from "next/server";

//Working with routes in the app router!
/* 
  1. the file name should be named route.js and the folder 
    should be named the route name you want. /hello folder hello
  2. import NextResponse
  3. the function name should match the HTTP method it handles
  4. return a NextResponse.json()
*/

// Name the function with the method! 
export async function GET(req, res) {
  return NextResponse.json('hello')
}
