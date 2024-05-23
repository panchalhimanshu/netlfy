import Link from 'next/link'
import React from 'react'

function manindash() {
  return (
    <div className='flex justify-center items-center w-full h-full mt-[50vh] gap-4'>


        <Link className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' href="station">Station</Link>
        <Link className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' href="admin">Admin</Link>
        <Link className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700' href="warehouse">Warehouse</Link>
        
    </div>
  )
}

export default manindash