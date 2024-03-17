import AppLayout from '@/components/Layouts/AppLayout'
import laravelAxios from '@/lib/laravelAxios'
import { Box, Container } from '@mui/system'
import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import StarIcon from '@mui/icons-material/Star'
import { useAuth } from '@/hooks/auth'
import { collectGenerateParams } from 'next/dist/build/utils'

const Profile = ({ user_id }) => {
    const { user } = useAuth({ middleware: 'auth' })
    
    return (
        <AppLayout>
            <Head>
                <title>profile</title>
            </Head>
            
        </AppLayout>
    )
}


export default Profile
