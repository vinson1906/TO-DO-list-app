'use client'
import { Edit, X } from 'lucide-react'



function TackCard({ setUserId, setOpen, taskData, setOpenDeleteModel }) {


    let color;

    switch (taskData.priority) {

        case 'Low':
            color = 'bg-green-500'
            break;
        case 'High':
            color = 'bg-red-700'
            break
        case 'Medium':
            color = 'bg-blue-400'
            break
    }

    return (
        <>
            <div className='bg-white h-[155px] w-[800px] shadow-md rounded-md '>
                <div className='flex justify-end pt-3 pr-2 '>
                    <div className='flex gap-2 items-center'>
                        <button onClick={() => { setUserId(taskData.id), setOpen((prev) => !prev) }}>
                            <Edit size={18} className='cursor-pointer text-gray-500 hover:text-gray-900' />
                        </button>
                        <button onClick={() => { setOpenDeleteModel(true), setUserId(taskData.id) }}>
                            <X size={18} className='text-gray-500 hover:text-gray-900 cursor-pointer' />
                        </button>
                    </div>

                </div>
                <div className='px-2 py-2 pb-2'>
                    <div className='flex justify-between '>
                        <h1 className='text-[22px] text-gray-700 font-semibold'>{taskData.task_title.toUpperCase()}</h1>
                        <p className={`text-md font-medium text-white ${color} px-3 rounded-2xl opacity-80 hover:opacity-100 cursor-pointer  flex justify-center items-center`}>{taskData.priority}</p>
                    </div>
                    <p className='mr-20 pl-2 pt-2'>{taskData.desc}</p>
                    <div className='flex justify-between'>
                        <p>Create at: {taskData.createdAt}</p>
                        <p>Updated at: {taskData.updtedAt}</p>
                    </div>

                </div>

            </div >

        </>

    )
}

export default TackCard