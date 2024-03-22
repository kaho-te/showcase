import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'swiper/css'
import { Box, Button, Modal, TextareaAutosize, Typography } from '@mui/material'
import Link from 'next/link'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(null)
    const [comment, setComment] = useState('')

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
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="font-semibold text-xl text-gray-800 leading-tight">
                        <div className="flex justify-end">
                            <img
                                className="h-6 mr-auto"
                                src="http://localhost/storage/image/icon/ShowcaseLogo.png"
                                alt=""
                            />
                            <div className="flex">
                                <img
                                    className="mr-2 h-6"
                                    src="http://localhost/storage/image/icon/LikeGray.png"
                                    alt="ハート"
                                />
                                <img
                                    className="h-6"
                                    src="http://localhost/storage/image/icon/MessageGray.png"
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
            <div>
                {posts.map(post => (
                    <div className='mx-5'>
                        <div key={post.id}>
                            <div className="flex">
                                <img src="" alt="アイコン" />
                                <div>{post.user.name}</div>
                            </div>
                            <Link href={`/view/${post.id}`}>
                                <img src="" alt="サムネイル" />
                            </Link>
                            <div className="mt-2 flex">
                                <div className="flex mr-auto">
                                    <img
                                        className="h-6"
                                        src="http://localhost/storage/image/icon/LikeGray.png"
                                        alt="ハート"
                                    />
                                    <img
                                        className="h-6 mx-2"
                                        src="http://localhost/storage/image/icon/CommentGray.png"
                                        alt="コメント"
                                    />
                                    <img
                                        className="h-6"
                                        src="http://localhost/storage/image/icon/MessageGray.png"
                                        alt="紙飛行機"
                                    />
                                </div>
                                <img
                                    className="h-6"
                                    src="http://localhost/storage/image/icon/FavoriteGray.png"
                                    alt="ブックマーク"
                                />
                            </div>
                            <p className="flex">
                                Liked by
                                <span className="mx-1 font-bold">
                                    Ryotaro ISHII
                                </span>
                                and
                                <span className="ml-1 font-bold">
                                    Kaho TERADA
                                </span>
                            </p>
                            <div className="flex">
                                <div className="mr-1 font-bold">
                                    {post.user.name}
                                </div>
                                <div>{post.text}</div>
                            </div>
                            <div
                                className="text-gray-300"
                                onClick={() => handleOpen(post.id)}>
                                view all comments
                            </div>
                            <div className="flex">
                                <p className="font-bold mr-1">
                                    Nijitoshi NAKAJIMA
                                </p>
                                <p className="mr-auto">Thanks for tagging</p>
                                <img
                                    className="h-6"
                                    src="http://localhost/storage/image/icon/LikeGray.png"
                                    alt="ハート"
                                />
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
                                                        <img
                                                            className="h-3"
                                                            src="http://localhost/storage/image/icon/LikeGray.png"
                                                            alt="ハート"
                                                        />
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
                    </div>
                ))}
            </div>
        </AppLayout>
    )
}

export default Home
