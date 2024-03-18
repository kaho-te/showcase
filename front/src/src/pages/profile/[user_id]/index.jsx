import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/auth'

const Profile = ({ user_id }) => {
    const { user } = useAuth({ middleware: 'auth' })
    const [profiles, setProfiles] = useState([])
    const videoRef = useRef(null)

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await laravelAxios.get('api/account/' + user_id)

                setProfiles(response.data[0])
                videoRef.current.src = 'http://localhost/storage/threed/' + user_id + '/' + response.data[0].account?.mainstage_image
                videoRef.current?.play()
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfiles() 
        
    }, [])
    
    return (
        <AppLayout>
            <Head>
                <title>profile</title>
            </Head>
            <div className="h-1/2 w-full">
                <video
                    id="video"
                    className="object-fill"
                    ref={videoRef}
                    type="video/mp4"
                    controls
                    loop
                    playsInline
                    muted>
                </video>
            </div>
            <div className="px-8 mt-5">
                <div className="flex justify-around w-full items-center">
                    <div className="icon w-1/4 ">
                        <img
                            src={
                                'http://localhost/storage/image/' +
                                profiles.account?.icon
                            }
                            alt=""
                        />
                    </div>
                    <div className="post-cnt w-1/4 text-center">
                        <p className="font-bold">{profiles.posts_count}</p>
                        <p className="">posts</p>
                    </div>
                    <div className="followers-cnt w-1/4 text-center">
                        <p className="font-bold">{profiles.followers_count}</p>
                        <p className="">followers</p>
                    </div>
                    <div className="items-cnt w-1/4 text-center">
                        <p className="font-bold">{profiles.warehouses_count}</p>
                        <p className="">items</p>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="font-bold">{profiles.name}</p>
                    <p>{profiles.account?.profile}</p>
                </div>
                <div className="flex justify-around mt-7">
                    <div className="w-1/2 text-center">
                        <img
                            src="http://localhost/storage/image/Cube Gray (2024_03_05 14_19_08 UTC).png"
                            alt=""
                            className="w-7 h-7 mx-auto"
                        />
                    </div>
                    <div className="w-1/2 text-center">
                        <img
                            src="http://localhost/storage/image/360 Gray (2024_03_05 14_19_08 UTC).png"
                            alt=""
                            className="w-7 h-7 mx-auto"
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <div
                        style={{
                            display: 'grid',
                            gap: '10px',
                            gridTemplateColumns: '1fr 1fr 1fr',
                        }}>
                        {profiles.posts?.map((post, index) => (
                            <div className="w-full" key={index}>
                                <img
                                    src={
                                        'http://localhost/storage/threed/' + user_id + '/' + 
                                        post.warehouse.threed_data
                                    }
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Profile
