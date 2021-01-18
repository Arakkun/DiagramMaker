import React from 'react'
import { DataGrid, ColDef, ValueFormatterParams, RowsProp } from '@material-ui/data-grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LinkName } from './LinksForm';
import { selectAllLinks } from './linksSlice';


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
    {field: 'styleTypeA', headerName: 'Stylistic Type A', flex:1.5},
    {field: 'styleTypeB', headerName: 'Stylistic Type B', flex:1.5},
]

export function LinksTable(){
    const links = useSelector(selectAllLinks);
    const rows = links.map((link, index)=>{
        return {
            id: index,
            entityIdA: link.entityIdA,
            entityIdB: link.entityIdB,
            linkId: link.linkId,
            styleTypeA: link.styleTypeA,
            styleTypeB: link.styleTypeB,
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