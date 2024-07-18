import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/app/lib/mongooseConnect";
import CheckList from "@/app/models/checklist";

mongooseConnect();

//// saves checked items changes to save instead of create
// export async function POST(req, res){
//   const data = await req.json();
//   console.log(data)

//   const doc = await CheckList.create({list: data})
//   console.log(doc)

//   return NextResponse.json({
//     message: 'success',
//     doc
//   })
// }

export async function POST(req, res) {
  const {type, list} = await req.json();
  console.log(type);
  const existingList = await CheckList.findOneAndUpdate({type}, {list});
  if(existingList){
    console.log('exist editing')
    console.log(existingList)
    
    return NextResponse.json({
      message: 'success',
      existingList
    });
  }else{
    console.log('it does not exist');
    const newList = await CheckList.create({type, list});
    console.log(newList);
    
    return NextResponse.json({
      message: 'success',
      newList
    });
  }

}

export async function GET(req, res) {
  const url = new URL(req.url);
  console.log(url)
  const searchParams = url.searchParams;
  const type = searchParams.get('type');
  const data = await CheckList.findOne({type});
  console.log(data);
  return NextResponse.json({
    message: 'success',
    data
  });
}