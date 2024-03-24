import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import laravelAxios from '@/lib/laravelAxios'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import {
    Center,
    OrbitControls,
    PerspectiveCamera,
    useGLTF,
} from '@react-three/drei'

const View = () => {
    // postの初期状態をnullまたは{}に変更
    const [post, setPost] = useState(null)
    const router = useRouter()
    const { post_id } = router.query
    const [aspectRatio, setAspectRatio] = useState(1) // アスペクト比の状態を追加

    useEffect(() => {
        if (router.isReady && post_id) {
            // post_idが存在し、有効な値を持っていることを確認
            const fetchPost = async () => {
                try {
                    const response = await laravelAxios.get(
                        `/api/posts/${post_id}`,
                    )
                    console.log(response.data)
                    setPost(response.data.post[0])
                } catch (error) {
                    console.log(error)
                }
            }
            fetchPost()
        }
    }, [router.isReady, post_id]) // router.isReadyとpost_idを依存配列に追加

    useEffect(() => {
        // クライアントサイドでのみ実行される
        setAspectRatio(window.innerWidth / window.innerHeight)
    }, [])

    const Model = () => {
        // const { scene } = useGLTF('/threed/3/uchiwa_fan.glb')
        const { scene } = useGLTF(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/warehouse/1/threed/${post.warehouse.threed_data}`,
        )
        return (
            <primitive
                object={scene}
                position={[0, 0, 0]}
                scale={[1, 1, 1]}
            />
        )
    }

    return (
        <div>
            {post ? (
                <div>
                    <div className="mt-2 mx-3">
                        <Link href="/home">✕</Link>
                    </div>
                    <Canvas
                        style={{
                            width: '100vw',
                            height: '60vh',
                            background: 'white',
                        }}>
                        {/* camera={{ position: [5, 5, 5], near: 0.05 }} */}
                        <group>
                            <Center>
                                <Model />
                            </Center>
                        </group>
                        <PerspectiveCamera
                            makeDefault
                            args={[35, aspectRatio, 0.1, 2000]}
                            position={[2, 2, 2]}
                            fov={70}
                        />
                        <OrbitControls />
                        <directionalLight position={[-10, 10, 10]} castShadow />
                        <ambientLight intensity={1} />
                        <pointLight position={[5, 5, 5]} />
                    </Canvas>
                    <div className="mx-5">
                        <div className="my-5 flex">
                            <div className="flex mr-auto">
                                <img
                                    className="h-6"
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/LikeGray.png`}
                                    alt="ハート"
                                />
                                <img
                                    className="h-6 mx-2"
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/CommentGray.png`}
                                    alt="コメント"
                                />
                                <img
                                    className="h-6"
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/MessageGray.png`}
                                    alt="紙飛行機"
                                />
                            </div>
                            <img
                                className="h-6"
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/FavoriteGray.png`}
                                alt="ブックマーク"
                            />
                        </div>
                        <div className="flex">
                            <Link href={`/profile/${post.user.id}`}>
                                <div className="flex items-center">
                                    <img
                                        className="w-10"
                                        style={{ borderRadius: '50%' }}
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/profile/${post.user.account.icon}`}                                        
                                        alt="アイコン"
                                    />
                                    <div className="ml-2 font-bold">
                                        {post ? post.user.name : ''}
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div>{post.text}</div>
                        <p className="flex">
                            Liked by
                            <span className="mx-1 font-bold">
                                Ryotaro ISHII
                            </span>
                            and
                            <span className="ml-1 font-bold">Kaho TERADA</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default View
