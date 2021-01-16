import { Accordion, AccordionDetails, AccordionSummary, Grow, Typography, Box } from '@material-ui/core'
import React from 'react'
import {ExpandMore} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { EntitiesManager } from './EntitiesManager';
import { LinksManager } from './LinksManager';
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

export function ElementsManager(){
    const classes = useStyles()
    return (
        <div>

            <Box py={2} mx="auto"><Typography className={classes.big}> Add new entities and elements to be used in the diagram and link them!</Typography></Box>

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                id="acc1el-man"
                >
                    <Typography className={classes.heading}>Entity</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Add and view entities
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EntitiesManager />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                id="acc2el-man"
                >
                    <Typography className={classes.heading}>Link</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Add and view links
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <LinksManager />
                </AccordionDetails>                    
            </Accordion>
        </div>
    )
}
