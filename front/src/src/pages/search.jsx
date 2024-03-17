import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import AppLayout from '@/components/Layouts/AppLayout'
import Layout from '@/components/Layouts/Layout'
import Sidebar from '@/components/Sidebar'
import MediaCard from '@/components/MediaCard'

import Head from 'next/head'
import { Grid } from '@mui/material'

const search = () => {
    const [category, setCategory] = useState('all')
    const [results, setResults] = useState([])
    const router = useRouter()
    const { query: searchQuery } = router.query

    console.log(category)

    useEffect(() => {
        if (!searchQuery) {
            return
        }

        const fetchMedia = async () => {
            try {
                const response = await axios.get(
                    `api/searchMedia?searchQuery=${searchQuery}`,
                )
                console.log(response)
                const searchResults = response.data.results

                const vaildResults = searchResults.filter(
                    item =>
                        item.media_type == 'movie' || item.media_type == 'tv',
                )
                console.log(vaildResults)
                setResults(vaildResults)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMedia()
    }, [searchQuery])

    const filterdResults = results.filter(result => {
        if (category == 'all') {
            return true
        }
        return result.media_type === category
    })

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Search
                </h2>
            }>
            <Head>
                <title>Laravel - Search</title>
            </Head>
            <Layout sidebar={<Sidebar setCategory={setCategory} />}>
                <Grid container spacing={3}>
                    {filterdResults.map(media => (
                        <MediaCard item={media} key={media.id}/>
                    ))}
                </Grid>
            </Layout>
        </AppLayout>
    )
}

export default search
