'use client'
import React, { useEffect, useId, useState } from 'react'
import CreateTaskPopup from '../task/create-task'
import { Plus, X, CircleCheckBig } from 'lucide-react';
import TaskCard from '../task/show-tasks'
import { useGetTask } from './operation.service'
import { useDeleteTask, useUpdateTask, useGetSingleTask } from '../operations/operation.service'

function Operations() {
    const [openDeleteModel, setOpenDeleteModel] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [userId, setUserId] = useState(null)
    const [open, setOpen] = useState(false)

    const { data: taskData } = useGetTask()
    const { data: singleTaskData } = useGetSingleTask(userId)

    let mode;
    if (!userId) {
        mode = 'create'
    } if (userId) {
        mode = 'update'
    }

    console.log("single data:", singleTaskData);

    const [form, setForm] = useState({
        task_title: '',
        desc: '',
        priority: "Low",
        createdBy: "9b521f52-7699-4574-bf54-0b7fea493e7d"
    })

    useEffect(() => {
        if (singleTaskData) {
            setForm({
                task_title: singleTaskData.task_title ?? '',
                desc: singleTaskData.desc ?? '',
                priority: singleTaskData.priority ?? 'Low',
                createdBy: singleTaskData.createdBy,
            });
        }
    }, [singleTaskData]);

    const deleteMutation = useDeleteTask();

    const deleteTask = async () => {
        console.log("id:", userId);
        if (!userId) return "user id not provided"

        if (confirmed) {
            deleteMutation.mutate(userId, {
                onSuccess: () => {
                    alert(`${id} dleted successfully`)
                    setUserId(null)
                },
                onError: () => {
                    alert(`something went wrong while deleting the task:${id}`)
                }
            })
        }

        setOpenDeleteModel(false)
    }

    const saveform = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className='w-full bg-gray-200'>

            <div className='h-screen w-full p-5' >
                <div className='flex justify-end pr-10 '>
                    <div className='flex font-bold gap-2 items-center'>
                        Create Task
                        <button className='flex text-lg text-gray-700 items-center cursor-pointer border p-2 border-gray-400 rounded-[50%] bg-green-500 text-white font-bold' onClick={() => setOpen(() => true)}>
                            <Plus />
                        </button>
                    </div>
                </div>
                {/* list the tasks */}
                <div className='pt-5 px-2'>
                    <h1 className='text-2xl font-bold text-gray-900 pb-5'>Your Tasks List</h1>
                    <div className='flex flex-col gap-4'>
                        {
                            taskData?.data?.map((taskData, i) => (
                                <div key={i}>
                                    <TaskCard setUserId={setUserId} setOpen={setOpen} taskData={taskData} setOpenDeleteModel={setOpenDeleteModel} />
                                </div>
                            ))
                        }
                    </div>


                </div>

            </div>
            <div className={`absolute top-[20%] left-[45%] right-[50%] ${open ? 'block' : 'hidden'} `} >
                <div className='z-10 shadow-md'>

                    <CreateTaskPopup form={form} userId={userId} setUserId={setUserId} saveform={saveform} setForm={setForm} open={open} setOpen={setOpen} mode={mode} />
                </div>
            </div>
            <div className='relative top-[50%] left-[50%] bottom-[50%] right-[50%] z-99 '>
                {
                    openDeleteModel ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                            <div className="w-[450px] h-[120px] bg-white rounded-lg p-4 relative">
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        <button
                                            className="absolute top-3 right-3"
                                            onClick={() => setOpenDeleteModel(false)}
                                        >
                                            <X />
                                        </button>
                                    </div>

                                    <h1 className='text-xl font-semibold px-4 pt-1 '>Are you Sure to delete the task?</h1>
                                    <div className='flex justify-end'>
                                        <div className='flex gap-2 items-center'>
                                            <button onClick={() => setConfirmed(false)} className='w-[80px] h-[30px] bg-red-500 gap-[2px] text-white font-semibold hover:bg-red-800 hover:animate-pulse flex justify-center items-center rounded-md cursor-pointer'>
                                                <X size={18} /> <p>No</p>
                                            </button>
                                            <button onClick={() => {
                                                setConfirmed(true)
                                                deleteTask()
                                            }} className='w-[80px] h-[30px] bg-green-500 gap-[2px] text-white font-semibold hover:bg-green-600 hover:animate-pulse flex justify-center items-center rounded-md cursor-pointer'>
                                                <CircleCheckBig /> <p>Yes</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}

export default Operations