import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import CheckList from '@/app/models/checklist';

mongooseConnect();



export async function POST(req, res) {
  const { type, list, action } = await req.json();
  console.log('list from frontend:-----------', list);
  // console.log(action);

  // checkedList
  if (action === 'checked') {
    const doc = await CheckList.create({ list: list, type: type });
    console.log(doc);

    return NextResponse.json({
      message: 'success',
      doc,
    });
  }else{
    const existingList = await CheckList.findOneAndUpdate({type}, {list}, {new: true});
    // console.log('this is existing list from DB:', existingList);
  
    // no list, create one
    if(!existingList){
      // console.log('it does not exist create new list');
      const newList = await CheckList.create({type, list});
      console.log(newList);
  
      return NextResponse.json({
        message: 'success',
        newList
      });
    }
  
    // console.log('should be the updated list',existingList)
    return NextResponse.json({
      message: 'success',
      // existingList
    });

  }

}

export async function GET(req, res) {
  const url = new URL(req.url);
  // console.log(url)
  const searchParams = url.searchParams;
  const type = searchParams.get('type');
  const data = await CheckList.findOne({ type });
  // console.log(data);
  return NextResponse.json({
    message: 'success',
    data,
  });
}

export async function PUT(req, res) {
  const { item, type } = await req.json();
  console.log('item to delete', item);

  const doc = await CheckList.findOne({ type })

  doc.list = doc.list.filter(i => i.id!== item.id);
  console.log('doc:', doc)

  await doc.save();

  return NextResponse.json({
    message: 'success',
    // updatedDoc: doc,
  });
}