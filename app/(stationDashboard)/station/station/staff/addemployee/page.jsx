"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const addEmployee = () => {
    return (
        <>
            <div className="container mx-auto">


                <div className='text-2xl text-orange-400'>
                    Employee
                </div>

                <form class="space-y-4">
                    <div className='grid grid-cols-2 w-75'>
                        <div>
                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">First Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">Email ID</label>
                                <input
                                    type="email"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder='Enter email id'
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">Emp ID</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder='Enter employee id'
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">User ID</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder='Enter user id'
                                />
                            </div>

                        </div>
                        <div>
                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">Last Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder='Enter last name'
                                />
                            </div>

                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">Phone No</label>
                                <input
                                    type="tel"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder='Enter phone no'
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">Role</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder='Enter role'
                                />
                            </div>

                            <div className="flex items-center mb-2">
                                <label className="w-1/6 font-medium mr-2">Password</label>
                                <input
                                    type="password"
                                    className="border border-gray-300 px-4 py-2 rounded w-3/4"
                                    placeholder='Enter Password'
                                />
                            </div>
                        </div>
                    </div>

                </form>

                <div className='mt-7'>
                    <div className='text-2xl text-orange-400'>
                        Roles & Rights
                    </div>
                    <div className='ml-9'>
                        <table>
                            <tbody>
                                <div className='grid grid-cols-6 gap-3'>
                                    <th> </th>
                                    <th>All</th>

                                    <th>Create</th>

                                    <th>Read</th>

                                    <th>Update</th>

                                    <th>Delete</th>
                                </div>
                                <tr>
                                    <div className='grid grid-cols-6 gap-4 justify-center'>
                                        <td>Station</td>
                                        <td><input type='checkbox' className='ml-5'/></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                    </div>
                                </tr>
                                <tr>
                                    <div className='grid grid-cols-6 gap-4 justify-center'>
                                        <td>Sales</td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                    </div>
                                </tr> 
                                <tr>
                                    <div className='grid grid-cols-6 gap-4 justify-center'>
                                        <td>Purchase</td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                    </div>
                                </tr>
                                <tr>
                                    <div className='grid grid-cols-6 gap-4 justify-center'>
                                        <td>Catalog</td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                        <td><input type='checkbox' className='ml-5' /></td>
                                    </div>
                                </tr>

                                <tr>
                                <div className='al'>
                                <Button className='bg-blue-950 text-white m-1'>Cancel</Button>    
                                <Button className='bg-orange-400 text-white'>Save</Button>    
                                </div></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default addEmployee