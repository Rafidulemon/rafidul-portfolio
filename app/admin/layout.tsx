import type { Metadata } from "next";
import React from 'react'
import LeftMenu from '../components/admin/LeftMenu'

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Portfolio website of Md. Rafidul Islam",
};


export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='grid  grid-cols-12 gap-4 -mx-10'>
      <div className='md:col-span-3 lg:col-span-2'>
        <LeftMenu/>
      </div>
      <div className="flex flex-row md:col-span-9 lg:col-span-10 p-6 bg-black">{children}</div>
    </div>
  )
}