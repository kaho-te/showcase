import AppLayout from '@/components/Layouts/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'swiper/css'
import Link from 'next/link'
import { dividerClasses } from '@mui/material'

const Home = () => {
    const [movies, setMovies] = useState([])

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         try {
    //             const response = await axios.get('api/getPopularMovies')
    //             console.log(response.data.results)

    //             setMovies(response.data.results)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchMovies()
    // }, [])

    return (
        <AppLayout
            header={
                <div className="font-semibold text-xl text-gray-800 leading-tight">
                    <div className="flex justify-end">
                        <div className="mr-auto">SHOWCASE</div>
                        <div className="flex">
                            <div>ハート</div>
                            <div>紙飛行機</div>
                        </div>
                    </div>
                    <div className="flex">
                        <div>icon</div>
                        <div>Postへの導線</div>
                    </div>
                </div>
            }>
            <Head>
                <title>home</title>
            </Head>
            <div className="flex">
                <img className="mr-auto" src="" alt="ユーザーアイコン" />
                <div>・・・</div>
            </div>
            <div>3Dデータのサムネ</div>
            <div className="flex">
                <div className="mr-auto flex">
                    <div>ハート</div>
                    <div>コメント</div>
                    <div>紙飛行機</div>
                </div>
                <div>ブックマーク</div>
            </div>
            <div>
                コメント
            </div>
        </AppLayout>
    )
}

export default Home
