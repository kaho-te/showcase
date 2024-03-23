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
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/MainStageGray.png`}
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href="#">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/WorldGray.png`}
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href="/new-post">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/NewPostGray.png`}
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href="/home">
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/SnsGray.png`}
                    alt=""
                />
            </Link>
            <Link
                className="w-1/6 h-8 flex justify-center item-center"
                href={user ? `/profile/${user.id}` : '#'}>
                <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/ProfileGray.png`}
                    alt=""
                />
            </Link>
        </>
    )
}

export default Footer
