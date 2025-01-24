import React from 'react'
import { Text } from './Text'
import { Line } from '../display/Line'

type TitleProps = {
    name?: string;
  };

  const PageTitle = (props: TitleProps) => {
    const {
        name = "",
      } = props;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Text text={name} className="text-[24px] md:text-[30px] lg:text-[35px] xl:text-[40px] text-primary dark:text-primary_dark" isNosifer />
      <div className="w-full flex flex-row gap-[0px] items-center justify-center">
        <Line className="border-cyan-200 border-b-[3px] rounded-l-3xl" widthValue="50px"/>
        <Line className="border-cyan-500 border-b-[3px]" widthValue="90px"/>
        <Line className="border-cyan-200 border-b-[3px] rounded-r-3xl" widthValue="50px"/>
      </div>
    </div>
  )
}

export default PageTitle
