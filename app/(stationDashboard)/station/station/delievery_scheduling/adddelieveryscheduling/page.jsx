"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


const adddelieveryscheduling = () => {
    const router = useRouter();
    return (
        <>
            <div className=' justify-between flex gap-1 pb-3 '>
                <div className='text-2xl text-orange-400'>
                    Upload DOCUMENT
                </div>
            </div>

            <form class="space-y-4">

                <div>
                    <div className="flex items-center mb-4">
                        <label className="w-1/6 font-medium mr-2">Doc Name*</label>
                        <input
                            type="text"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder="Enter document name"
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <label className="w-1/6 font-medium mr-2">Doc Type*</label>
                        <input
                            type="email"
                            className="border border-gray-300 px-4 py-2 rounded w-3/4"
                            placeholder='Enter document type'
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <label className="w-1/6 font-medium mr-2">Upload File*</label>
                        <div>
                            <input
                                type="file"
                                className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                placeholder='Enter employee id'
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <Button className="text-white bg-blue-950 m-1" onClick={()=>router.push('/station/customer')}>Cancel</Button>
                    <Button className="text-white bg-orange-400">Save</Button>
                    {/* delievery_scheduling */}
                </div>
            </form>
        </>
    )
}

export default adddelieveryscheduling