import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/hooks/auth'

const setting = () => {
    const { logout } = useAuth()

    return (
        <>
            <header className="bg-white">
                <div className="flex justify-center pt-3">
                    <div className="absolute left-0 w-6 ml-3">
                        <img
                            src="http://localhost/storage/image/Icon/Return.png"
                            alt=""
                        />
                    </div>
                    <div className="font-bold text-lg">setting</div>
                </div>
            </header>
            <div className="p-5">
                <div className="text-lg text-red-500" onClick={logout}>
                    Logout
                </div>
            </div>
        </>
    )
}

export default setting
