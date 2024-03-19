import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'swiper/css'
import Link from 'next/link'
import { dividerClasses } from '@mui/material'
import { Canvas } from '@react-three/fiber'
import {
    Center,
    OrbitControls,
    PerspectiveCamera,
    Stats,
    useGLTF,
} from '@react-three/drei'

const Home = () => {
    const [account, setAccount] = useState([])
    const [posts, setPosts] = useState([])

    const Model = () => {
        const { scene } = useGLTF('/threed/3/usagi.glb')
        return (
            <primitive
                object={scene}
                position={[0, 0, 0]}
                scale={[0.5, 0.5, 0.5]}
            />
        )
    }

    const Model2 = () => {
        const { scene } = useGLTF('/threed/2/uchiwa_fan.glb')
        return (
            <primitive
                object={scene}
                position={[0, 0, 0]}
                scale={[0.5, 0.5, 0.5]}
            />
        )
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await laravelAxios.get('api/posts')
                console.log(response.data)

                setPosts(response.data.post)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts()
    }, [])

    return (
        <AppLayout
            header={
                <div className="font-semibold text-xl text-gray-800 leading-tight">
                    <div className="flex justify-end">
                        <div className="mr-auto">SHOWCASE</div>
                        <div className="flex">
                            <img className="mr-2 h-6" src="http://localhost/storage/image/icon/LikeGray.png" alt="ハート" />
                            <img className="h-6" src="http://localhost/storage/image/icon/MessageGray.png" alt="紙飛行機" />
                        </div>
                    </div>
                </div>
            }>
            <Head>
                <title>home</title>
            </Head>
            {posts.map(post => (
                <div>
                    <div className="flex">
                        <img src="" alt="アイコン" />
                        <div>{post.user.name}</div>
                    </div>
                    <Canvas style={{ background: 'gray' }}>
                        {/* camera={{ position: [5, 5, 5], near: 0.05 }} */}
                        <group>
                            <Center>
                                <Model2 />
                            </Center>
                        </group>
                        <PerspectiveCamera
                            makeDefault
                            args={[
                                35,
                                window.innerWidth / window.innerHeight,
                                0.1,
                                2000,
                            ]}
                            position={[2, 2, 2]}
                            fov={70}
                        />
                        <OrbitControls />
                        <directionalLight position={[-10, 10, 10]} castShadow />
                        <ambientLight intensity={1} />
                        <pointLight position={[5, 5, 5]} />
                    </Canvas>
                    <div className="flex">
                        <div className="flex mr-auto">
                            <img src="" alt="ハート" />
                            <img src="" alt="コメント" />
                            <img src="" alt="紙飛行機" />
                        </div>
                        <img src="" alt="ブックマーク" />
                    </div>
                    <div className="flex">
                        <div className="mr-1 font-bold">{post.user.name}</div>
                        <div>{post.text}</div>
                    </div>
                    {post.comments.map(comment => (
                        <div className="flex">
                            <div className="font-bold mr-1">
                                {comment.user.name}
                            </div>
                            <div>{comment.text}</div>
                        </div>
                    ))}
                </div>
            ))}
        </AppLayout>
    )
}

export default Home
