import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import laravelAxios from '@/lib/laravelAxios'
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

    const Model = () => {
        const { scene } = useGLTF('/threed/3/uchiwa_fan.glb')
        return (
            <primitive
                object={scene}
                position={[0, 0, 0]}
                scale={[0.5, 0.5, 0.5]}
            />
        )
    }

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

    return (
        <div>
            <div className="mb-6">✕</div>
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
            <div className="mt-5 flex">
                <div className="flex mr-auto">
                    <img src="" alt="ハート" />
                    <img src="" alt="コメント" />
                    <img src="" alt="紙飛行機" />
                </div>
                <img src="" alt="ブックマーク" />
            </div>
            <div className="flex">
                <img src="" alt="アイコン" />
                <div>{post ? post.user.name : ''}</div>
            </div>
            <div>{post ? post.text : ''}</div>
            <p className="flex">
                Liked by
                <span className="mx-1 font-bold">Ryotaro ISHII</span>
                and
                <span className="ml-1 font-bold">Kaho TERADA</span>
            </p>
        </div>
    )
}

export default View
