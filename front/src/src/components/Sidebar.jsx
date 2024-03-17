import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Sidebar = ({setCategory}) => {
    return (
        <div>
            <Typography
                sx={{
                    bgcolor: 'blue',
                    color: 'white',
                    padding: 1,
                }}>
                カテゴリ
            </Typography>

            <List component={"nav"}>
            <ListItemButton>
                    <ListItemText onClick={() => setCategory('all')} primary="全て"></ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText onClick={() => setCategory('movie')} primary="映画"></ListItemText>
                </ListItemButton>
                <ListItemButton>
                    <ListItemText onClick={() => setCategory('tv')} primary="TV"></ListItemText>
                </ListItemButton>
            </List>
        </div>
    )
}

export default Sidebar
