import { FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeEntityStyle, changeFrom, changeLinkStyle, changeOrientation, changePadding, changeSize, changeType, ColorationStyle, DiagramType, Orientation } from './diagramSettingsSlice'
import { EntityStyle } from './EntityElements'
import { LinkStyle } from './LinkElements'


export function DiagramForm() {
    const [type, setType] = useState(DiagramType.Topological)
    const [entitySize, setEntitySize] = useState(100)
    const [padding, setPadding] = useState(40)
    const [orientation, setOrientation] = useState(Orientation.toRight)
    const [entityStyle, setEntityStyle] = useState(EntityStyle.Square)
    const [linkStyle, setLinkStyle] = useState(LinkStyle.Linear)
    const [coloration, setColoration] = useState("Random")
    const [from, setFrom] = useState(ColorationStyle.origin)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeType(type))
    }, [type])
    useEffect(() => {
        dispatch(changeSize(entitySize))
    }, [entitySize])
    useEffect(() => {
        dispatch(changePadding(padding))
    }, [padding])
    useEffect(() => {
        dispatch(changeOrientation(orientation))
    }, [orientation])
    useEffect(() => {
        dispatch(changeEntityStyle(entityStyle))
    }, [entityStyle])
    useEffect(() => {
        dispatch(changeLinkStyle(linkStyle))
    }, [linkStyle])
    useEffect(() => {
        dispatch(changeFrom(from))
    }, [from])

    return (
        <Grid container spacing={2}>
            <Grid alignItems="center" item sm={12}>
                <FormControl>
                    <FormLabel>
                        <p> Change Settings for the Diagram </p>
                    </FormLabel>
                    <Grid container justify="space-between" spacing={1}> 
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Type of the Diagram</InputLabel>
                                <Select id="id" value={type} onChange={(e) => (setType(e.target.value as DiagramType))} >
                                    {Object.entries(DiagramType).map(([text, value], _) => <MenuItem value={value}>{text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Orientation of the Diagram</InputLabel>
                                <Select id="id" value={orientation} onChange={(e) => (setOrientation(e.target.value as Orientation))} >
                                    {Object.entries(Orientation).map(([text, value], _) => <MenuItem value={value}>{text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-number"
                                label="Size of entities"
                                type="number"
                                value={entitySize}
                                onChange={(e) => (setEntitySize(parseInt(e.target.value)))}
                                variant="outlined" fullWidth 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="standard-number"
                                label="Padding between entities"
                                type="number"
                                value={padding}
                                onChange={(e) => (setPadding(parseInt(e.target.value)))}
                                variant="outlined" fullWidth 
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Shape of the Entity</InputLabel>
                                <Select id="id" value={entityStyle} onChange={(e) => (setEntityStyle(e.target.value as EntityStyle))} >
                                    {Object.entries(EntityStyle).map(([text, value], _) => <MenuItem value={value}>{text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Type of the Links</InputLabel>
                                <Select id="id" value={linkStyle} onChange={(e) => (setLinkStyle(e.target.value as LinkStyle))} >
                                    {Object.entries(LinkStyle).map(([text, value], _) => <MenuItem value={value}>{text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Type of Link Coloration</InputLabel>
                                <Select id="id" value={coloration} onChange={(e) => (setColoration(e.target.value as string))} >
                                    <MenuItem value="Random">Random</MenuItem>
                                    <MenuItem value="StyleA">Based on Style A</MenuItem>
                                    <MenuItem value="StyleB">Based on Style B</MenuItem>
                                    <MenuItem value="Entity">Based on Entity</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Where to take the color of the link from</InputLabel>
                                <Select id="id" value={from} onChange={(e) => (setFrom(e.target.value as ColorationStyle))} >
                                    {Object.entries(ColorationStyle).map(([text, value], _) => <MenuItem value={value}>{text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </FormControl>

            </Grid>
        </Grid>
    )
}
/* <Grid item xs={6}>
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
                </Grid>  */