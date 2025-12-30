'use client'
import { BASE_URL } from '../../config/constants'
import axios from 'axios'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'


function Topbar() {

    const router = useRouter()

    const logout = async () => {

        try {
            await axios.post(`${BASE_URL}/auth/logout`)
            await localStorage.removeItem("token")
            router.push('/auth/login')
        }
        catch (err) {

        }
    }


    return (
        <>
            <div className='z-10 sticky top-0 bg-gray-200 w-full h-[80px] shadow-md'>
                <div className='flex justify-end items-center gap-2 p-5 font-bold'>
                    <p className='text-gray-800 text-2xl'>Logout</p>
                    <button onClick={() => logout()}>
                        <LogOut />
                    </button>
                </div>

            </div>
        </>
    )
}

export default Topbar