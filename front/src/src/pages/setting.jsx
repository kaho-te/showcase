import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/hooks/auth'

const setting = () => {
    const { logout } = useAuth()
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <header className="bg-white">
                <div className="flex justify-center pt-3">
                    <Link className="absolute left-0 w-6 ml-3" href={`/profile/${user.id}`}>
                        <img
                            src="http://localhost/storage/icon/Return.png"
                            alt=""
                        />
                    </Link>
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
