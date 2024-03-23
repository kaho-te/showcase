import Axios from 'axios'

const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true
})

export default laravelAxios
