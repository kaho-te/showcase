import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Link,
    Typography,
} from '@mui/material'
import React from 'react'

const MediaCard = ({ item }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea>
                    <Link href={`/detail/${item.media_type}/${item.id}`}>
                        <CardMedia
                            component={'img'}
                            sx={{ aspectRatio: '2/3' }}
                            image={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                        />
                        <CardContent>
                            <Typography variant="h6" component={'div'} noWrap>
                                {item.title || item.name}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary">
                                {item.release_date || item.first_air_date}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default MediaCard
