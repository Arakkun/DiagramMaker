import { Accordion, AccordionDetails, AccordionSummary, Typography, Box, Grid , FormControl, FormLabel, InputLabel, MenuItem, Select, FormHelperText, Checkbox } from '@material-ui/core'
import React from 'react'
import {ExpandMore} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { DiagramBox } from './DiagramBox';
import { DiagramForm } from './DiagramForm';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    big: {
        fontSize: theme.typography.pxToRem(25),
        textAlign: "center",
      },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

export function DiagramManager(){
    const classes = useStyles()

    return (
        <div>

            <Box py={2} mx="auto"><Typography className={classes.big}>Choose settings for the diagram and create it</Typography></Box>

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                id="acc1dia-man"
                >
                    <Typography className={classes.heading}>Diagram Settings</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Choose the settings for the diagram
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DiagramForm />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                id="acc2dia-man"
                >
                    <Typography className={classes.heading}>Diagram Viewer</Typography>
                    <Typography className={classes.secondaryHeading}>
                        View and Save Diagram
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DiagramBox />
                </AccordionDetails>                    
            </Accordion>
        </div>
    )
}
