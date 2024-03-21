import React from 'react'


const NewPost = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const [profiles, setProfiles] = useState([])
    user_id = 2;

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await laravelAxios.get(
                    'api/account/' + user_id,
                )

                setProfiles(response.data[0])
                videoRef.current.src =
                    'http://localhost/storage/threed/' +
                    user_id +
                    '/' +
                    response.data[0].account?.mainstage_image
                videoRef.current?.play()
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfiles()
    }, [])

    return (
        <div>
            <div>NewPost</div>
            <div></div>
        </div>
    )
}

export default NewPost
