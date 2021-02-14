import { FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, Button, FormHelperText, Checkbox } from '@material-ui/core'
import { ArrowForwardIosOutlined } from '@material-ui/icons';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuItemEntity } from './EntitiesForm';
import { selectEntitiesIds } from './entitySlice'
import { selectLinksIds, useLink, linkUpsert, linkRemove } from './linksSlice';
import {v4 as uuid} from 'uuid'


interface MenuItemLinkProps{
    linkId:string,
}

interface MenuItemEntityCoupleProps{
    entityIdA:string,
    entityIdB:string,
}

export const LinkName:React.FC<MenuItemEntityCoupleProps> = ({entityIdA , entityIdB}) => {
    return <span> <MenuItemEntity entityId={entityIdA} /> <ArrowForwardIosOutlined /> <MenuItemEntity entityId={entityIdB} /> </span>
}

export const MenuItemLink:React.FC<MenuItemLinkProps> = ({linkId}) => {
    const link = useLink(linkId)
    return (<LinkName entityIdA={link.entityIdA} entityIdB={link.entityIdB} />)
}

let initialState = uuid();

export function LinksForm(){

    const [linkId, setLinkId] = React.useState(initialState);
    const [initialId, setInitialId] = React.useState(initialState);
    const [entityIdA, setEntityIdA] = React.useState("");
    const [entityIdB, setEntityIdB] = React.useState("");
    const [selected, setSelected] = React.useState(1);
    const dispatch = useDispatch();

    const entityIds = useSelector(selectEntitiesIds)
    const linkIds = useSelector(selectLinksIds)

    const initialize = () => {
        setEntityIdA("");
        setEntityIdB("");
        initialState = uuid();
        setSelected(1);
        setInitialId(initialState);
        setLinkId(initialState);
    }

    const upsert = () => {
        dispatch(linkUpsert({entityIdA, entityIdB, linkId, selected}));
        initialize();
        
    }
    const remove = () => {
        dispatch(linkRemove(linkId));
        initialize();
    }
    
    const selectedLink = useLink(linkId);

    React.useEffect( 
        ()=> {
            if(selectedLink != null){
                setEntityIdA(selectedLink.entityIdA);
                setEntityIdB(selectedLink.entityIdB);
                setSelected(selectedLink.selected);
            }
            else
            {
                setEntityIdA("");
                setEntityIdB("");
                setSelected(1);
            }
        },
        [selectedLink]);

    const validLinking = () => {
        return ((entityIdA != "")&&(entityIdB != "")&&(entityIdA != entityIdB));
    }

    const validate = () => {
        return validLinking();
    }
    return (
        <FormControl>
            <FormLabel>
                <p> Insert, Remove or Upgrade new Link </p>
            </FormLabel>
            <Grid container justify="space-between" spacing={1}> 
                <Grid item xs={12}> 
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Link</InputLabel>
                        <Select id="id" value={linkId} onChange={(e)=>(setLinkId(e.target.value as string))} >
                            <MenuItem value={initialId}> New </MenuItem>
                            { linkIds.map((id) => ( <MenuItem value={id}><MenuItemLink linkId={id as string}/></MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={5}> 
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Entity</InputLabel>
                        <Select id="id" value={entityIdA} error={!validLinking()}  onChange={(e)=>(setEntityIdA(e.target.value as string))} >
                            { entityIds.map((id) => ( <MenuItem value={id}><MenuItemEntity entityId={id as string}/></MenuItem>))}
                        </Select>
                        <FormHelperText>Must be an entity different from the other</FormHelperText>
                    </FormControl>
                </Grid> 
                <Grid item xs={5}> 
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Other Entity</InputLabel>
                        <Select id="id" value={entityIdB} error={!validLinking()}  onChange={(e)=>(setEntityIdB(e.target.value as string))} >
                            { entityIds.map((id) => ( <MenuItem value={id}><MenuItemEntity entityId={id as string}/></MenuItem>))}
                        </Select>
                        <FormHelperText>Must be an entity different from the other</FormHelperText>
                    </FormControl>
                </Grid> 
                <Grid item xs={2}> 
                    <FormControl variant="outlined" fullWidth>
                        <Checkbox
                            checked={(selected==1)}
                            onChange={(e) => setSelected(e.target.checked?1:0)}
                            name="checkedB"
                            color="primary"
                        />
                        <FormHelperText>Selected</FormHelperText>
                    </FormControl>
                </Grid> 
                <Grid item xs={6}> 
                    <Button variant="contained" color="primary" onClick={upsert} disabled={!validate()} fullWidth >
                        {(linkId!=initialId)?"Update":"Insert"}
                    </Button>
                </Grid> 
                <Grid item xs={6}> 
                    <Button variant="contained" color="secondary" onClick={remove} disabled={(linkId!=initialId) ? false : true} fullWidth>
                        Delete
                    </Button>
                </Grid> 
            </Grid>          
        </FormControl>
    )
}