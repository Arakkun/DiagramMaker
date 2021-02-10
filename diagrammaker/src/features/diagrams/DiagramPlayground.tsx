import React from 'react'
import { Entity } from '../elements/entitySlice'
import { MenuItemLink } from '../elements/LinksForm';
import { Link } from '../elements/linksSlice';

interface Props {
    entities: Entity[],
    links: Link[]
}

export function DiagramPlayground({
    entities,
    links
  }: Props){
      
    const entityList = entities.map((entity) => <p>{entity.name}</p>)
    const linkList = links.map((link) => <p><MenuItemLink linkId={link.linkId}/></p>)
    return (
        <div>
            {entityList}
            {linkList}
        </div>
    )
}