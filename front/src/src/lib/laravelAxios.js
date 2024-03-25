import Axios from 'axios'

// トークンの取得を動的に変更
let token;

if (typeof window !== "undefined") {
    token = localStorage.getItem('token');
}

const laravelAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'X-CSRF-TOKEN': '{{ csrf_token() }}',
    },
    // withCredentials: true,
    // withXSRFToken: true,
    // credentials: 'include',
})

export default laravelAxios