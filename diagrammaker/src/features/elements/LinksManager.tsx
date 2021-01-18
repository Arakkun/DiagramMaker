import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { LinksForm } from './LinksForm'
import { LinksTable } from './LinksTable'

export function LinksManager(){
    return (
        <Grid container spacing={2}> 
            <Grid item xs={12} sm={6}> 
                <LinksTable />
            </Grid>  
            <Grid item xs={12} sm={6}> 
                <LinksForm />
            </Grid> 
        </Grid>
    )
}