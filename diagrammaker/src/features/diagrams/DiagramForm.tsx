import { createStyles, FormControl, FormLabel, Grid, InputLabel, makeStyles, MenuItem, Select, Slider, TextField, Theme, Typography } from '@material-ui/core'
import Color from 'color'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllEntities } from '../elements/entitySlice'
import { changeColor, changeColorList, changeEntityStyle, changeFrom, changeLinkStyle, changeOrientation, changePadding, changeSize, changeType, colorAssign, ColorationOrigin, ColorationStyle, DiagramType, Orientation } from './diagramSettingsSlice'
import { EntityStyle } from './EntityElements'
import { LinkStyle } from './LinkElements'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullwidth: {
      minWidth: "100%"
    },
  }),
);

export function DiagramForm() {
    const [type, setType] = useState(DiagramType.Topological)
    const [entitySize, setEntitySize] = useState(100)
    const [padding, setPadding] = useState(40)
    const [orientation, setOrientation] = useState(Orientation.toRight)
    const [entityStyle, setEntityStyle] = useState(EntityStyle.Square)
    const [linkStyle, setLinkStyle] = useState(LinkStyle.Linear)
    const [coloration, setColoration] = useState(ColorationStyle.Random)
    const [from, setFrom] = useState(ColorationOrigin.origin)
    const [colorList, setColorList] = useState({} as colorAssign)

    const dispatch = useDispatch();
    const entities = useSelector(selectAllEntities)
    const style = useStyles();
    
    useEffect(() => {
        dispatch(changeType(type))
    }, [type,dispatch])
    useEffect(() => {
        dispatch(changeSize(entitySize))
    }, [entitySize,dispatch])
    useEffect(() => {
        dispatch(changePadding(padding))
    }, [padding,dispatch])
    useEffect(() => {
        dispatch(changeOrientation(orientation))
    }, [orientation,dispatch])
    useEffect(() => {
        dispatch(changeEntityStyle(entityStyle))
    }, [entityStyle,dispatch])
    useEffect(() => {
        dispatch(changeLinkStyle(linkStyle))
    }, [linkStyle,dispatch])
    useEffect(() => {
        dispatch(changeFrom(from))
    }, [from,dispatch])
    useEffect(() => {
        let stylesSet:Set<string>;
        switch(coloration){
            case(ColorationStyle.Random):
            case(ColorationStyle.Entity):
                setColorList(entities.reduce((acc, entity) => ({ ...acc, [entity.entityId]: Color.rgb([255*Math.random(),255*Math.random(),255*Math.random()])}), {}))
                break;
            case(ColorationStyle.StyleA):
                stylesSet = new Set<string>();
                entities.map((entity)=> stylesSet.add(entity.styleTypeA));
                setColorList(Array.from(stylesSet).reduce((acc, style) => ({ ...acc, [style]: Color.rgb([255*Math.random(),255*Math.random(),255*Math.random()])}), {}))
                break;
            case(ColorationStyle.StyleB):
                stylesSet = new Set<string>();
                entities.map((entity)=> stylesSet.add(entity.styleTypeB));
                setColorList(Array.from(stylesSet).reduce((acc, style) => ({ ...acc, [style]: Color.rgb([255*Math.random(),255*Math.random(),255*Math.random()])}), {}))
                break;
        }
        
    }, [coloration, dispatch])
    useEffect(()=> {
        dispatch(changeColorList(colorList))
    },[colorList, dispatch])

    const setColor = (key:string) => (color: Color) => {
        setColorList({...colorList, [key]:color});
    }

    let ColorPickers
    if(coloration!=ColorationStyle.Random){
        ColorPickers=Object.entries(colorList).map(([id, color],_)=>(
            <Grid item xs={1}>
                <ColorPicker label={id} color={color} onChangeComplete={(color) => setColor(id)(color)} />
            </Grid>
        ))
    }

    return (
        <Grid container spacing={2}>
            <Grid alignItems="center" item sm={12}>
                <FormControl className={style.fullwidth}>
                    <FormLabel>
                        <p> Change Settings for the Diagram </p>
                    </FormLabel>
                    <Grid container spacing={1}> 
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
                                <Select id="id" value={coloration} onChange={(e) => (setColoration(e.target.value as ColorationStyle))} >
                                    {Object.entries(ColorationStyle).map(([text, value], _) => <MenuItem value={value}>{text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Where to take the color of the link from</InputLabel>
                                <Select id="id" value={from} onChange={(e) => (setFrom(e.target.value as ColorationOrigin))} >
                                    {Object.entries(ColorationOrigin).map(([text, value], _) => <MenuItem value={value}>{text}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        {ColorPickers}
                        
                        
                    </Grid>
                </FormControl>

            </Grid>
        </Grid>
    )
}

interface ColorPickerProps{
    label: string,
    color: Color,
    onChangeComplete: (color: Color) => void
}

function ColorPicker({label, color, onChangeComplete}:ColorPickerProps): JSX.Element{

    const [selectedColor, setSelectedColor] = useState(color);
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            colorViewer: {
            height: "100px",
            backgroundColor: selectedColor.hex()
            },
            redSlider: {
                color: Color.rgb(selectedColor.red(),0,0).hex()
            },
            greenSlider: {
                color: Color.rgb(0,selectedColor.green(),0).hex()
            },
            blueSlider: {
                color: Color.rgb(0,0,selectedColor.blue()).hex()
            },
            limitText: {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
            }
        }),
    );

    const style = useStyles();
    return( 
        <Grid container spacing={1}> 
            <Typography align={"center"} className={style.limitText} gutterBottom>{label}</Typography>
            <Grid item xs={12}>
                <div className={style.colorViewer} />
            </Grid>
            <Grid item xs={2}>
                <Typography>R</Typography>
            </Grid>
            <Grid item xs={10}>
                <Slider 
                    min={0} max={255} value={selectedColor.red()}
                    onChange={(_,value)=>setSelectedColor(selectedColor.red(value as number))} 
                    onChangeCommitted={(event,value) => onChangeComplete(selectedColor) } className={style.redSlider} />
            </Grid>
            <Grid item xs={2}>
                <Typography>G</Typography>
            </Grid>
            <Grid item xs={10}>
                <Slider 
                    min={0} max={255} value={selectedColor.green()} 
                    onChange={(_,value)=>setSelectedColor(selectedColor.green(value as number))} 
                    onChangeCommitted={(event,value) => onChangeComplete(selectedColor) } className={style.greenSlider}/>
            </Grid>
            <Grid item xs={2}>
                <Typography>B</Typography>
            </Grid>
            <Grid item xs={10}>
                <Slider 
                    min={0} max={255} value={selectedColor.blue()} 
                    onChange={(_,value)=>setSelectedColor(selectedColor.blue(value as number))}
                    onChangeCommitted={(event,value) => onChangeComplete(selectedColor) } className={style.blueSlider} 
                />
            </Grid>
        </Grid>
    )
}