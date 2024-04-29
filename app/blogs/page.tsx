import React from 'react'
import PageTitle from '../components/typography/PageTitle'
import { Text } from '../components/typography/Text'

function blogs() {
  return (
    <div className='w-full pt-16 md:py-20'>
      <PageTitle name='BLOGS'/>
      <div className='my-16 h-full md:min-h-[500px] w-full text-center items-center'>
        <Text text='Blogs will be added soon...'/>
      </div>
    </div>
  )
}

export default blogs
