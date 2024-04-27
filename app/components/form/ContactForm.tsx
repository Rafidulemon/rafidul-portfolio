"use client";

import React from 'react'
import { TextInput } from '../typography/TextInput'
import { TextArea } from '../typography/TextArea'
import Button from '../display/Button'
import Link from 'next/link';

function ContactForm() {
  return (
    <div className='w-full'>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <TextInput label="Your Name" placeholder='Please enter your name here...'/>
        </div>
        <div className="mb-4">
          <TextInput label="Your Email" placeholder='Please enter your email here...'/>
        </div>
        <div className="mb-8">
          <TextArea label="Message" placeholder='Type your message here...' className='h-[250px]'/>
        </div>
        <Link href={"/"}>
          <Button theme='primary' isWidthFull>Send</Button>
        </Link>
      </form>
    </div>
  )
}

export default ContactForm
