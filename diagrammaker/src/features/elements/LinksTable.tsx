import React from 'react'
import { DataGrid, ColDef, ValueFormatterParams } from '@material-ui/data-grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LinkName } from './LinksForm';
import { selectAllLinks } from './linksSlice';
import {CheckBoxOutlined , CheckBoxOutlineBlank} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(6.5),
      height: theme.spacing(6.5),
    },
  }),
);
const renderLink = (entityIdA:string, entityIdB:string) => {
    return <LinkName entityIdA={entityIdA} entityIdB={entityIdB} />;
  };

const columns: ColDef[] = [
    {field: 'id', headerName:'entityId', hide:true},
    {field: 'entityIdA', headerName:'entityIdA', hide:true},
    {field: 'entityIdB', headerName:'entityIdB', hide:true},
    {
        field: 'linkId', 
        headerName: 'Link', 
        flex:3,
        renderCell: (params: ValueFormatterParams) => (
            renderLink(params.getValue("entityIdA") as string, params.getValue("entityIdB") as string)
        )
    },
    {
      field: 'selected', 
      headerName: 'Selected', 
      flex:1,
      renderCell: (params: ValueFormatterParams) => (
        params.getValue('selected')==1 ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank /> 
      )
  }
]

export function LinksTable(){
    const links = useSelector(selectAllLinks);
    const rows = links.map((link, index)=>{
        return {
            id: index,
            entityIdA: link.entityIdA,
            entityIdB: link.entityIdB,
            linkId: link.linkId,
            selected: link.selected
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
      <div ref={gridWrapperRef} style={{ width: '100%' }}>
        <DataGrid rows={rows} columns={columns} autoHeight={true} />
      </div>
    )
}