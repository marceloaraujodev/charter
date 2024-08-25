import { NextResponse } from 'next/server';
import Service from '@/app/models/service';
import Expense from '@/app/models/expenses';
import { mongooseConnect } from '@/app/lib/mongooseConnect';

mongooseConnect();

export async function GET(req, res){

  const expenses = await Expense.find();
  // console.log(expenses)

  return NextResponse.json({
    message: 'success',
    expenses: expenses,
  })
}