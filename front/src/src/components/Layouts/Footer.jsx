import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()

    console.log(user)
    return (
        <>
            <img
                className="w-1/6 h-10"
                src="http://localhost/storage/image/icon/MainStageGray.png"
                alt=""
            />
            <img
                className="w-1/6 h-10"
                src="http://localhost/storage/image/icon/WorldGray.png"
                alt=""
            />
            <img
                className="w-1/6 h-10"
                src="http://localhost/storage/image/icon/NewPostGray.png"
                alt=""
            />
            <Link href="/home">
                <img
                    className="w-1/6 h-10"
                    src="http://localhost/storage/image/icon/SnsGray.png"
                    alt=""
                />
            </Link>
            <Link href={`/profile/${user.id}`}>
                <img
                    className="w-1/6 h-10"
                    src="http://localhost/storage/image/icon/ProfileGray.png"
                    alt=""
                />
            </Link>
        </>
    )
}

export default Footer
