import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { LinksForm } from './LinksForm'

export function LinksManager(){
    return (
        <Grid container spacing={2}> 
            <Grid item xs={12} sm={6}> 
                <Paper elevation={3}>Table</Paper>
            </Grid>  
            <Grid item xs={12} sm={6}> 
                <LinksForm />
            </Grid> 
        </Grid>
    )
}