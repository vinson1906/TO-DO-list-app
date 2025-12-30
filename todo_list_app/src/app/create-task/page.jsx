import CreateTaskPopup from '../../modules/task/create-task'
import React from 'react'

export default function CreateTask() {
    return (
        <>
            <div className='h-screen w-full flex justify-center items-center bg-gray-200 backdrop-blur-2xl '>
                <div className='z-10 shadow-md'>
                    <CreateTaskPopup />
                </div>
            </div>
        </>
    )
}
