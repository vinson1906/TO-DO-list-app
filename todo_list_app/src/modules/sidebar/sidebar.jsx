import React from 'react'
import { Ticket, Verified } from 'lucide-react'

const Sidebar = () => {

    const tabs = [
        {
            lable: 'todo',
            icon: <Ticket />
        },
        {
            lable: 'completed tasks',
            icon: <Verified />
        }
    ]

    const name = "Vinson"
    return (
        <div className='h-[100vh] w-[300px] bg-gray-200 flex flex-col rounded-md shadow-md'>
            <div className={`h-[90px] border-b-gray-400  shadow-md flex flex-col justify-end px-4 py-3 text-2xl font-bold `}>
                <h1 className='bg-white p-2 rounded-md shadow-md text-gray-700'> Hii {name} Welcome!</h1>

            </div>
            <div>
                {
                    tabs.map((ele, i) => (
                        <div key={i} className='mx-2 rounded-md hover:shadow-xl cursor-pointer h-[60px] flex gap-2 bg-white mt-2 items-center px-4 font-bold'>
                            {ele.icon}
                            <button className='text-xl text-gray-600 cursor-pointer'>{ele.lable}</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar