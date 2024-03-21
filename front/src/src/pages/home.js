import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'swiper/css'
import { Canvas } from '@react-three/fiber'
import {
    Center,
    OrbitControls,
    PerspectiveCamera,
    useGLTF,
} from '@react-three/drei'
import { Box, Button, Modal, TextareaAutosize, Typography } from '@mui/material'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(null)
    const [comment, setComment] = useState('')

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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await laravelAxios.get('api/posts')
                // console.log(response.data)

                setPosts(response.data.post)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPosts()
    }, [])

    // Modalを開く関数
    const handleOpen = postId => setOpen(postId)

    // Modalを閉じる関数
    const handleClose = () => setOpen(null)

    const handleComment = e => {
        setComment(e.target.value)
    }

    const handleCommentAdd = async () => {
        handleClose()
        try {
            const response = await laravelAxios.post('api/comments', {
                text: comment,
                post_id: open,
            })
            console.log(response.data)
            setComment('') // Clear the comment input field after posting
            // 新しいコメントをpostsステートに追加する処理
            const updatedPosts = posts.map(post => {
                if (post.id === open) {
                    return {
                        ...post,
                        comments: [...post.comments, response.data],
                    }
                }
                return post
            })
            setPosts(updatedPosts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AppLayout>
            <header className="bg-white">
                <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
                    <div className="font-semibold text-xl text-gray-800 leading-tight">
                        <div className="flex justify-end">
                            <div className="mr-auto">SHOWCASE</div>
                            <div className="flex">
                                <img
                                    className="mr-2 h-6"
                                    src="http://localhost/storage/image/Icon/LikeGray.png"
                                    alt="ハート"
                                />
                                <img
                                    className="h-6"
                                    src="http://localhost/storage/image/Icon/MessageGray.png"
                                    alt="紙飛行機"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Head>
                <title>home</title>
            </Head>
            {posts.map(post => (
                <div key={post.id}>
                    <div className="flex">
                        <img src="" alt="アイコン" />
                        <div>{post.user.name}</div>
                    </div>
                    <Canvas style={{ background: 'gray' }}>
                        {/* camera={{ position: [5, 5, 5], near: 0.05 }} */}
                        <group>
                            <Center>
                                <Model />
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
                    <p className="flex">
                        Liked by
                        <span className="mx-1 font-bold">Ryotaro ISHII</span>
                        and
                        <span className="ml-1 font-bold">Kaho TERADA</span>
                    </p>
                    <div className="flex">
                        <div className="mr-1 font-bold">{post.user.name}</div>
                        <div>{post.text}</div>
                    </div>
                    <div
                        className="text-gray-300"
                        onClick={() => handleOpen(post.id)}>
                        view all comments
                    </div>
                    <div className="flex">
                        <p className="font-bold mr-1">Nijitoshi NAKAJIMA</p>
                        <p className="mr-auto">Thanks for tagging</p>
                        <img src="" alt="ハート" />
                    </div>

                    <Modal
                        open={open === post.id}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}>
                            <div
                                id="modal-modal-title"
                                className="flex justify-center">
                                Comments
                            </div>
                            <Typography
                                component="div"
                                id="modal-modal-description"
                                sx={{ mt: 2 }}>
                                {post.comments &&
                                    Array.isArray(post.comments) &&
                                    post.comments.map(comment => (
                                        <div key={comment.id}>
                                            <div className="flex">
                                                <div>
                                                    <img
                                                        src=""
                                                        alt="アイコン"
                                                    />
                                                </div>
                                                <div className="font-bold mr-auto">
                                                    {comment.user.name}
                                                </div>
                                                <img src="" alt="ハート" />
                                            </div>
                                            <div>{comment.text}</div>
                                        </div>
                                    ))}
                            </Typography>
                            <div className="mt-3 flex justify-items-center">
                                <TextareaAutosize
                                    required
                                    minRows={1}
                                    placeholder="Add your comment"
                                    style={{ width: '100%' }}
                                    onChange={handleComment}
                                    value={comment}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleCommentAdd}>
                                    Post
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </div>
            ))}
        </AppLayout>
    )
}

export default Home
