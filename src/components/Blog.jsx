import React, { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext';

const Blog = () => {
    const { texts } = useContext(LanguageContext);
  return (
    <>
    <div className='text-2xl font-semibold  flex items-center justify-center mt-10 border border-gray-400 mx-30 md:mx-165 py-3 bg-blue-400 text-white rounded-3xl'>{texts.blog}</div>
    <div className='flex items-center justify-center    mx-4 h-32 rounded-lg  '>
   
    <div className='text-center mt-4 text-gray-500'>{texts.noblog}</div>

    </div>
    </>
  )
}

export default Blog