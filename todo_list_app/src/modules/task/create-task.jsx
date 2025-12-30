'use client'
import { BASE_URL } from '../../config/constants'
import axios from 'axios'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useCreateTask } from '../operations/operation.service'


function CreateTaskPopup({ open, setOpen, form, setForm, saveform, mode }) {

    const useCreateMutate = useCreateTask()

    console.log(open);

    console.log(mode);



    const submitForm = async (e) => {
        e.preventDefault()
        try {
            console.log("form:", form)
            useCreateMutate.mutate(form, {
                onSuccess: () => {
                    alert("task created successfully!")
                    setOpen(false)
                },
                onError: () => {
                    alert("something went wrong while creating task!")
                }
            })
        }
        catch (err) {
            console.error("error:", err)
        }
    }
    return (
        <>
            <div>
                <div className='bg-[#F5F2EA] h-fit w-[450px] px-5 pt-4 pb-5 rounded-md ' >
                    <div className='flex justify-end '>
                        <button onClick={() => setOpen(prev => !prev)}>
                            <X className='cursor-pointer' />
                        </button>

                    </div>
                    <h1 className='text-xl text-gray-900 font-semibold text-center pt-2'>Create Tasks</h1>
                    <form onSubmit={submitForm} className='flex flex-col mt-10  gap-5'>
                        <input
                            type="text"
                            name="task_title"
                            value={form.task_title}
                            onChange={saveform}
                            className="h-[45px] w-full border bg-gray-50 border-gray-600 px-6 rounded-md"
                            placeholder="Enter task title"
                            required
                        />
                        <textarea
                            type="text"
                            name="desc"
                            value={form.desc}
                            onChange={saveform}
                            className="h-[150px] bg-gray-50 w-full border border-gray-600 pl-4 py-2 rounded-md"
                            placeholder="Enter task description"
                            required
                        />

                        <select
                            onChange={saveform}
                            value={form.priority}
                            name="priority"
                            className="h-[45px] w-full border bg-gray-50 cursor-pointer border-gray-600 px-6 rounded-md"
                        >
                            {/* <option value="">Select priority</option> */}
                            <option value="Low" className='cursor-pointer' >Low</option>
                            <option value="High" className='cursor-pointer'>High</option>
                            <option value="Medium" className='cursor-pointer'>Medium</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full h-10 flex justify-center items-center bg-orange-300 rounded-md font-bold cursor-pointer"
                        >
                            create task
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateTaskPopup