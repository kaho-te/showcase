import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import SearchBar from '../SearchBar'

const Layout = ({children, sidebar}) => {
    return (
        <Container>
            <SearchBar />
            <Grid container spacing={3} py={4}>
                <Grid item xs={12} md={3}>
                    <Box bgcolor={"white"} boxShadow={1}>
                        {sidebar}
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Layout
