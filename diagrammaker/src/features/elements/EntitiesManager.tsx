import React from 'react'
import { Grid } from '@material-ui/core'
import { EntitiesForm } from './EntitiesForm'
import { EntitiesTable } from './EntitiesTable'

export function EntitiesManager(){
    
    return (
            <Grid container spacing={2}> 
                <Grid alignItems="center" item sm={12} md={6}> 
                    <EntitiesTable />
                </Grid>  
                <Grid alignItems="center" item sm={12} md={6}> 
                    <EntitiesForm />
                </Grid> 
            </Grid>
    )
}