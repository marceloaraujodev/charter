import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import User from "@/app/models/user";
import bcrypt from 'bcrypt';

mongooseConnect();

// Login
// export async function POST(req, res){
//   try {
//     const data = await req.json();
//     // console.log(data)
  
//     const user = await User.findOne({email: data.email}).select('+password');
//     const compare = await bcrypt.compare(data.password, user.password);
  
//     console.log(compare)
//     console.log(user)
  
//     // await User.create(newAdmin)
  
//     return NextResponse.json({
//       message: 'success',
//       auth: true,
//       user
//     })
    
//   } catch (error) {
//     return NextResponse.json({
//       message: 'fail'
//     })
//   }
// }



//// create user 
// mongooseConnect();
// export async function POST(req, res){
//   const data = await req.json();
//   console.log(data)

//   const saltRounds = 10;
//   const newAdmin = {
//     name: 'Marcelo',
//     email: 'ppzmarcelo@gmail.com',
//     password: '123',
//     role: 'admin'
//   }
//   console.log(newAdmin)
  
//   // hashing the first passa
//   const salt = await bcrypt.genSalt(saltRounds);
//   const hash = await bcrypt.hash(newAdmin.password, salt);
//   console.log(hash);
//   newAdmin.password = hash;
//   console.log(newAdmin);


//   // console.log('this should be saved to db', newAdmin)
//   // await User.create(newAdmin)

//   return NextResponse.json({
//     message: 'success',
    
//   })
// }