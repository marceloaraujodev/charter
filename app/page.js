'use client';
import MainLayout from '@/components/MainLayout';
import { useRouter } from 'next/navigation';



export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <MainLayout router={router}/>
    </>
  )
}
