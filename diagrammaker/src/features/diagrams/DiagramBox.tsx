import { Button, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import React, { ReactInstance, RefObject, useRef, useState } from 'react'
import { exportComponentAsPNG } from 'react-component-export-image';
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

    const diagramRef = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
    const entities = useFilteredEntities(entitySet);

    // We have to avoid rerendering this for any eventual change to the state
    const printDiagram = () => {
        setPrinted(true);
        dispatch(diagramPrinted(null));
        setPlayground(<div ref={diagramRef}><DiagramPlayground entities={entities} links={links} {...settings} /></div>);
    };

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            scroll: {
            overflowY: "scroll"
            },
        }),
    );
    const classes = useStyles();
    const saveSvg = (svgEl:HTMLElement, name:string) => {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        var svgData = svgEl.outerHTML;
        var preface = '<?xml version="1.0" standalone="no"?>\r\n';
        var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={printDiagram} disabled={printed && !changed} fullWidth >
                    Create
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick={()=>saveSvg(document.getElementById("SVGDiagram") as HTMLElement,"diagram.SVG")} disabled={!printed} fullWidth>
                    Save
                </Button>
            </Grid>
            <Grid item xs={12} className={classes.scroll}>
                {playground}
            </Grid>
        </Grid>
    )
}
