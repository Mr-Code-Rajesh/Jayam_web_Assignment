import React from 'react'
import {HashLoader} from 'react-spinners';

// Notes : A simple spinner component using HashLoader from react-spinners library.
// Purpose: To indicate loading state in the application.

const Spinner = () => {
  return (
    <div className='flex items-center flex-col justify-center gap-1 m-5'>
      <HashLoader color="#36d7b7" className=' w-32 h-32' />
      <span className='ml-2 text-gray-600 font-medium'>Loading...</span>
    </div>
  )
}

export default Spinner

