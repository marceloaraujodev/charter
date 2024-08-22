import { NextResponse, NextRequest } from 'next/server';
import { mongooseConnect } from '@/app/lib/mongooseConnect';
import CheckList from '@/app/models/checklist';

mongooseConnect();

export async function POST(req, res) {
  const { type, list, action, currentListId } = await req.json();
  // console.log(list)

  // console.log('list from frontend:-----------', list);
  // console.log('type from frontend:-----------', type);
  // console.log('action from frontend:-----------', action);


  // checkedList
  if (action === 'checked') {
    const doc = await CheckList.create({ list: list, type: type });
    console.log(doc);

    return NextResponse.json({
      message: 'success',
      doc,
    });
  }else{
    const existingList = await CheckList.findOneAndUpdate({_id: currentListId}, {list}, {new: true});
    console.log('this is existing list from DB:', existingList);
  
    // no list, create one
    if(!existingList){
      // console.log('it does not exist create new list');
      const newList = await CheckList.create({type, list});
      // console.log(newList);
  
      return NextResponse.json({
        message: 'success',
        newList
      });
    }
  
    console.log('should be the updated list',existingList)
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
  const {listId, item } = await req.json();

  const doc = await CheckList.findById(listId);
  console.log('this is doc.list',doc.list)

  if(!doc){
    return NextResponse.json({ message: 'List not found' }, { status: 404 });
  }

  doc.list = doc.list.filter(i => i.id!== item.id);
  await doc.save();

  return NextResponse.json({
    message: 'success',
    // updatedDoc: doc,
  });
}