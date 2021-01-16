import { FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectEntitiesIds, selectEntitiesById, entityUpsert, entityRemove, Entity } from './entitySlice';
import {v4 as uuid} from 'uuid'
import { DefaultRootState } from '../../app/store';
import { EntityId } from '@reduxjs/toolkit';

interface MenuItemEntityProps{
    entityId:string,
}
let initialState = uuid();


function useEntity(entityId:string){
    return useSelector((state)=>selectEntitiesById(state as DefaultRootState, entityId)) as Entity;
}

export function EntitiesForm(){
    const ids = useSelector(selectEntitiesIds) as string[]
    const [name, setName] = React.useState("");
    const [imgLink, setImgLink] = React.useState("");
    const [styleTypeA, setStyleTypeA] = React.useState("");
    const [styleTypeB, setStyleTypeB] = React.useState("");
    const [entityId, setEntityId] = React.useState(initialState);
    const [initialId, setInitialId] = React.useState(initialState);
    const dispatch = useDispatch();
    

    const MenuItemEntity:React.FC<MenuItemEntityProps> = ({entityId}) => {
        const entity = useEntity(entityId)
        return (<div>{entity.name}</div>)
    }

    const initialize = () => {
        setName("");
        setImgLink("");
        setStyleTypeA("");
        setStyleTypeB("");
        initialState = uuid();
        setInitialId(initialState);
        setEntityId(initialState);
    }

    const upsert = () => {
        dispatch(entityUpsert({name, imgLink, entityId, styleTypeA, styleTypeB}));
        initialize();
        
    }
    const remove = () => {
        dispatch(entityRemove(entityId as EntityId));
        initialize();
    }


    
    const selectedEntity = useEntity(entityId);


    useEffect( 
        ()=> {
            if(selectedEntity != null){
                setName(selectedEntity.name);
                setImgLink(selectedEntity.imgLink);
                setStyleTypeA(selectedEntity.styleTypeA);
                setStyleTypeB(selectedEntity.styleTypeB);
            }
            else
            {
                setName("");
                setImgLink("");
                setStyleTypeA("");
                setStyleTypeB("");
            }
        },
        [selectedEntity]);

    const validName = () => {
        return (name!="")
    }

    const validImg = () => {
        return (imgLink.match("\.(jpeg|jpg|gif|png|webp|tiff|bmp|heif|eps|svg)$") != null)
    }
    const validate = () => {
        return validName() && validImg()
    }

    return (
        <FormControl>
            <FormLabel>
                <p> Insert, Remove or Upgrade new Entity </p>
            </FormLabel>
            <Grid container justify="space-between" spacing={1}> 
                <Grid item xs={6}> 
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Entity</InputLabel>
                        <Select id="id" value={entityId} onChange={(e)=>(setEntityId(e.target.value as string))} >
                            <MenuItem value={initialId}> New </MenuItem>
                            { ids.map((id) => ( <MenuItem value={id}><MenuItemEntity entityId={id}/></MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid> 
                <Grid item xs={6}> 
                    <TextField value={name} error={!validName()} helperText="Must have a name" onChange={(e)=>setName(e.target.value)} id="name" label="Name" variant="outlined" fullWidth />
                </Grid> 
                <Grid item xs={12}> 
                    <TextField value={imgLink} error={!validImg()} helperText="Must be an image" onChange={(e)=>setImgLink(e.target.value)} id="imgLink" label="Link of the image" variant="outlined" fullWidth />
                </Grid> 
                <Grid item xs={6}> 
                    <TextField value={styleTypeA} onChange={(e)=>setStyleTypeA(e.target.value)} id="styeTypeA" label="Style Type A" variant="outlined" fullWidth />
                </Grid> 
                <Grid item xs={6}> 
                    <TextField value={styleTypeB} onChange={(e)=>setStyleTypeB(e.target.value)} id="styeTypeB" label="Style Type B" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}> 
                    <Button variant="contained" color="primary" onClick={upsert} disabled={!validate()} fullWidth >
                        {(entityId!=initialId)?"Update":"Insert"}
                    </Button>
                </Grid> 
                <Grid item xs={6}> 
                    <Button variant="contained" color="secondary" onClick={remove} disabled={(entityId!=initialId) ? false : true} fullWidth>
                        Delete
                    </Button>
                </Grid> 
            </Grid>          
        </FormControl>
    )
}

