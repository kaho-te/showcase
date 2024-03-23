import React, { useEffect, useState } from 'react'
import laravelAxios from '@/lib/laravelAxios'
import Link from 'next/link'
import { Button, TextareaAutosize } from '@mui/material'
import { useAuth } from '@/hooks/auth'
import { Canvas } from '@react-three/fiber'
import {
    Center,
    OrbitControls,
    PerspectiveCamera,
    useGLTF,
} from '@react-three/drei'

const NewPost = () => {
    const [postFlag, setPostFlag] = useState(false)
    const [warehouseList, setWarehouseList] = useState([])
    const [text, setText] = useState('')
    const [warehouseId, setWarehouseId] = useState(1)
    const [aspectRatio, setAspectRatio] = useState(1) // アスペクト比の状態を追加

    const Model = () => {
        const { scene } = useGLTF(`/threed/3/uchiwa_fan.glb`)
        return (
            <primitive
                object={scene}
                position={[0, 0, 0]}
                scale={[0.5, 0.5, 0.5]}
            />
        )
    }

    const handlePostFlag = () => {
        setPostFlag(!postFlag)
    }

    const handleWarehouseId = id => {
        setWarehouseId(id)
        console.log(warehouseId)
    }

    const handleText = e => {
        setText(e.target.value)
    }

    const handleNewPost = async () => {
        try {
            await laravelAxios.post('api/posts', {
                text: text,
                warehouse_id: warehouseId,
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const response = await laravelAxios.get(`api/warehouses`)
                setWarehouseList(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchWarehouse()
    }, [])

    useEffect(() => {
        // クライアントサイドでのみ実行される
        setAspectRatio(window.innerWidth / window.innerHeight)
    }, [])

    return (
        <div className='mt-2'>
            {postFlag ? (
                <div className="mx-3 mb-6 flex justify-center">
                    <div className="absolute left-3" onClick={handlePostFlag}>
                        ＜
                    </div>
                    <div className="font-bold">New Post</div>
                </div>
            ) : (
                <div className="mx-3 mb-6 flex justify-between">
                    <Link href="/home">✕</Link>
                    <div className="font-bold">New Post</div>
                    <div
                        className="font-bold text-blue-600"
                        onClick={handlePostFlag}>
                        Next
                    </div>
                </div>
            )}
            <Canvas
                style={{
                    width: '100vw',
                    height: '40vh',
                    marginBottom: '0.5rem',
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
            {postFlag ? (
                <div>
                    <TextareaAutosize
                        className="border-0"
                        required
                        minRows={10}
                        placeholder="Add capture..."
                        style={{ width: '100%' }}
                        onChange={handleText}
                        value={text}
                    />
                    <div className="mt-5 flex justify-center">
                        <Button
                            className="w-11/12"
                            variant="contained"
                            onClick={handleNewPost}>
                            Share
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mr-2 mb-2 flex justify-end items-center">
                        <img className="mx-2 h-6" src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/icon/CameraGray.png`} alt="カメラ" />
                        <button
                            className="bg-gray-700 hover:bg-gray-600 text-white rounded px-2 mx-5 my-2"
                            onClick={handleNewPost}>
                            Manage
                        </button>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gap: '10px',
                            gridTemplateColumns: '1fr 1fr 1fr',
                        }}>
                        {warehouseList?.map(warehouse => (
                            <div
                                className="w-full"
                                key={warehouse.id}
                                onClick={() => handleWarehouseId(warehouse.id)}>
                                <img
                                    src={
                                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/warehouse/1/thumbnail/${warehouse.thumbnail}`
                                    }
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewPost
