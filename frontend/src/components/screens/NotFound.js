import React from 'react'
import MetaData from '../MetaData'

const NotFound = () => {
  return (
    <div className='container py-2 mx-auto flex flex-col justify-center items-center bg-gray-700 h-[calc(100vh_-_13rem)]'>
      <MetaData title={'404! Not Found - CyberTronic'}/>
        <h1 className='text-white text-3xl font-bold'>404! Not Found</h1>
        <h2 className='text-white text-2xl mt-10'>The page you are looking is ran away from our server.</h2>
    </div>
  )
}

export default NotFound