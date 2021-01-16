import React from 'react'
import { Grid } from '@material-ui/core'
import { EntitiesForm } from './EntitiesForm'

export function EntitiesManager(){
    
    return (
            <Grid container spacing={2}> 
                <Grid alignItems="center" item xs={12} sm={6}> 
                    Table
                </Grid>  
                <Grid alignItems="center" item xs={12} sm={6}> 
                    <EntitiesForm />
                </Grid> 
            </Grid>
    )
}