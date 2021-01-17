import React from 'react'
import { DataGrid, ColDef, ValueFormatterParams, RowsProp } from '@material-ui/data-grid';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectEntitiesIds, useEntity } from './entitySlice';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

const ImagePrint = (value: string, name:string) => {
    const classes = useStyles();
    return <Avatar className={classes.large} variant="rounded" alt={name} src={value} />;
  };

const columns: ColDef[] = [
    {field: 'id', headerName:'entityId', hide:true},
    {field: 'name', headerName: 'Name', flex:1},
    {
        field: 'imgLink', 
        headerName: 'Image', 
        flex:1.5,
        renderCell: (params: ValueFormatterParams) => (
            ImagePrint(params.value as string,params.getValue("name") as string)
        )
    },
    {field: 'styleTypeA', headerName: 'Stylistic Type A', flex:1},
    {field: 'styleTypeB', headerName: 'Stylistic Type B', flex:1},
]

export function EntitiesTab(){
    const ids = useSelector(selectEntitiesIds);
    const entities = ids.map((id, index)=>{
        const entity = useEntity(id as string)
        return {
            id: index,
            name: entity.name,
            imgLink: entity.imgLink,
            styleTypeA: entity.styleTypeA,
            styleTypeB: entity.styleTypeB,
        }
    })

    return (
        <DataGrid rows={entities} columns={columns} />
    )
}