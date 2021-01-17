import React from 'react'
import { DataGrid, ColDef, ValueFormatterParams, RowsProp } from '@material-ui/data-grid';
import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAllEntities } from './entitySlice';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(6.5),
      height: theme.spacing(6.5),
    },
  }),
);

const ImagePrint = (value: string, name:string) => {
    const classes = useStyles();
    return <Avatar className={classes.large} variant="rounded" alt={name} src={value} />;
  };

const columns: ColDef[] = [
    {field: 'id', headerName:'entityId', hide:true},
    {field: 'name', headerName: 'Name', flex:1.5},
    {
        field: 'imgLink', 
        headerName: 'Image', 
        flex:0.8,
        renderCell: (params: ValueFormatterParams) => (
            ImagePrint(params.value as string,params.getValue("name") as string)
        )
    },
    {field: 'styleTypeA', headerName: 'Stylistic Type A', flex:1.5},
    {field: 'styleTypeB', headerName: 'Stylistic Type B', flex:1.5},
]

export function EntitiesTable(){
    const entities = useSelector(selectAllEntities);
    const classes = useStyles();
    const rows = entities.map((entity, index)=>{
        return {
            id: index,
            name: entity.name,
            imgLink: entity.imgLink,
            styleTypeA: entity.styleTypeA,
            styleTypeB: entity.styleTypeB,
        }
    })
    const gridWrapperRef = React.useRef<HTMLDivElement>(null);
        React.useLayoutEffect(() => {
            const gridDiv = gridWrapperRef.current;
            if (gridDiv){
                const gridEl: HTMLDivElement = gridDiv.querySelector('div')!;
                gridEl.style.height = '';
                gridEl.style.width = '';
            }
        });


    return (
      <div ref={gridWrapperRef}>
        <DataGrid rows={rows} columns={columns} autoHeight={true} />
      </div>
    )
}