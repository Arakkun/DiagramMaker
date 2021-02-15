import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFilteredEntities } from '../elements/entitySlice';
import { useSelectedLinks } from '../elements/linksSlice';
import { DiagramPlayground } from './DiagramPlayground';
import { diagramPrinted, selectChanged, selectWholeSettings } from './diagramSettingsSlice';

export function DiagramBox() {

    const [printed, setPrinted] = useState(false);
    const [playground, setPlayground] = useState(<div />);
    const changed = useSelector(selectChanged);
    const dispatch = useDispatch();

    // when implementing filtering
    const links = useSelectedLinks();
    let entitySet = new Set<string>();
    for (let link of links) {
        entitySet.add(link.entityIdA)
        entitySet.add(link.entityIdB)
    }

    const settings = useSelector(selectWholeSettings); 

    const entities = useFilteredEntities(entitySet);

    // We have to avoid rerendering this for any eventual change to the state
    const printDiagram = () => {
        setPrinted(true);
        dispatch(diagramPrinted(null));
        setPlayground(<DiagramPlayground entities={entities} links={links} {...settings} />);
    };

    const saveDiagram = () => {
        // save the diagram
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={printDiagram} disabled={printed && !changed} fullWidth >
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
