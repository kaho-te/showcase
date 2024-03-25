import useSWR from 'swr'
import laravelAxios from '@/lib/laravelAxios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
    laravelAxios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    
    )

    const csrf = () => laravelAxios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }) => {
        await csrf()

        setErrors([])

        laravelAxios
            .post('api/register', props)
            .then(res => {
                if (res.data){
                    localStorage.setItem('token', res.data.access_token);
                    // if (shouldRemember){
                    //     secureLocalStorage.setItem('user_data', res.data);
                    // }else{
                    //     encryptSessionData('user_data', res.data);
                    // }
                mutate('/api/user')
                }
            })
            .catch(error =>
            {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            }
            )
    }

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        laravelAxios
            .post('api/login', props)
            .then((response) => {
                // トークンをローカルストレージに保存
                localStorage.setItem('token', response.data.access_token);
                // ユーザー情報をSWRのキャッシュに設定
                mutate('/api/user');
                console.log(response, "response")
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        laravelAxios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        laravelAxios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        laravelAxios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            laravelAxios.post('/api/logout').then(() => {
                localStorage.removeItem('token'); // トークンをローカルストレージから削除
                mutate() // Ensure the user state is reset
            }).catch(error => {
                console.error('Logout failed:', error);
            });
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}