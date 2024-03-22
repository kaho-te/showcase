import { useAuth } from '@/hooks/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()

    return (
        <>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href="#">
                <img
                    src="http://localhost/storage/icon/MainStageGray.png"
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href="#">
                <img
                    src="http://localhost/storage/icon/WorldGray.png"
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href="/new-post">
                <img
                    src="http://localhost/storage/icon/NewPostGray.png"
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href="/home">
                <img
                    src="http://localhost/storage/icon/SnsGray.png"
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href={user ? `/profile/${user.id}` : '#'}>
                <img
                    src="http://localhost/storage/icon/ProfileGray.png"
                    alt=""
                />
            </Link>
        </>
    )
}

export default Footer
