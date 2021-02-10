import React, { useState, useEffect } from 'react'
import { Button, Grid, Paper } from '@material-ui/core'
import { Entity, selectAllEntities, useFilteredEntities } from '../elements/entitySlice';
import { useSelector } from 'react-redux';
import { Link, selectAllLinks } from '../elements/linksSlice';
import { DiagramPlayground } from './DiagramPlayground';

export function DiagramBox(){
    const [printed, setPrinted] = useState(false);
    const [changed, setChanged] = useState(true);
    const [playground, setPlayground] = useState(<div />);
    const links = useSelector(selectAllLinks);
    // when implementing filtering
    // const links = useSelectedLinks();
    let entitySet = new Set<string>();
    for (let link of links){
        entitySet.add(link.entityIdA)
        entitySet.add(link.entityIdB)
    }

    const entities = useFilteredEntities(entitySet);
    

    const printDiagram = () => {
        setPrinted(true);
        setChanged(false);   
        setPlayground(<DiagramPlayground entities={entities} links={links} />);
    };
    
    const saveDiagram = () => {
        // save the diagram
    }
    
    return (
        <Grid container spacing={2}> 
            <Grid item xs={6}> 
                <Button variant="contained" color="primary" onClick={printDiagram} disabled={printed || !changed} fullWidth >
                    Create
                </Button>
            </Grid>
            <Grid item xs={6}> 
                <Button variant="contained" onClick={saveDiagram} disabled={!printed} fullWidth>
                    Save
                </Button>
            </Grid>
            <Grid item xs={12}> 
                {playground}
            </Grid>
        </Grid>
    )
}