import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'

const Footer = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()

    return (
        <>
                <img
                    className="w-1/6 h-16"
                    src="http://localhost/storage/image/Cube Gray (2024_03_05 14_19_08 UTC).png"
                    alt=""
                />
            <img
                className="w-1/6 h-16"
                src="http://localhost/storage/image/Cube Gray (2024_03_05 14_19_08 UTC).png"
                alt=""
            />
            <img
                className="w-1/6 h-16"
                src="http://localhost/storage/image/Cube Gray (2024_03_05 14_19_08 UTC).png"
                alt=""
            />
            <img
                className="w-1/6 h-16"
                src="http://localhost/storage/image/Cube Gray (2024_03_05 14_19_08 UTC).png"
                alt=""
            />
            <img
                className="w-1/6 h-16"
                src="http://localhost/storage/image/Cube Gray (2024_03_05 14_19_08 UTC).png"
                alt=""
            />
        </>
    )
}

export default Footer
