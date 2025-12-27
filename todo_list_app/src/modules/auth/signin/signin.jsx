'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { AppleIcon, Facebook, User2 } from 'lucide-react'
import axios from 'axios'
import { BASE_URL } from '../../../config/constants'
import { useRouter } from 'next/navigation'


export const LoginPage = () => {

    const router = useRouter()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const saveform = (e) => {
        const { name, value } = e.target

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const submitSignin = async (e) => {
        e.preventDefault()
        console.log('Login Data:', form)
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, form)
            if (res) {
                console.log("send successfully", res);
            }

            localStorage.setItem('token', res.data.token)

            const token = await localStorage.getItem('token')

            router.push('/')
        }
        catch (err) {
            alert("something went wrong")
            console.log("Error:", err);

        }
    }

    return (
        <div className="min-h-screen bg-[#F5F2EA] flex justify-center items-center">
            <div className="bg-white w-[550px] h-[600px] rounded-3xl flex flex-col items-center gap-10">
                <div className="pt-10 text-center">
                    <h1 className="text-[25px] font-bold">User Login</h1>
                    <p className="pt-5 text-[18px] w-[350px] tracking-wide">
                        Hey, Enter your details to get sign in to your account
                    </p>
                </div>

                <form onSubmit={submitSignin} className="w-full px-18 flex flex-col gap-5">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={saveform}
                        className="h-[45px] w-full border border-gray-600 px-6 rounded-md"
                        placeholder="Enter email"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={saveform}
                        className="h-[45px] w-full border border-gray-600 px-6 rounded-md"
                        placeholder="Enter Password"
                        required
                    />

                    <p>
                        You didn&apos;t have any account? Please{' '}
                        <Link href="/auth/signup" className="text-blue-500">
                            Signup
                        </Link>
                    </p>

                    <button
                        type="submit"
                        className="w-full h-10 flex justify-center items-center bg-orange-300 rounded-md font-bold"
                    >
                        Sign in
                    </button>
                </form>

                <div className="flex flex-col items-center gap-5">
                    <p className="font-semibold">- Or sign in with -</p>

                    <div className="flex gap-2">
                        <button className="h-[45px] w-[130px] border flex items-center justify-center gap-2 font-bold rounded-md">
                            <User2 /> Google
                        </button>
                        <button className="h-[45px] w-[130px] border flex items-center justify-center gap-2 font-bold rounded-md">
                            <Facebook /> Facebook
                        </button>
                        <button className="h-[45px] w-[130px] border flex items-center justify-center gap-2 font-bold rounded-md">
                            <AppleIcon /> Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
