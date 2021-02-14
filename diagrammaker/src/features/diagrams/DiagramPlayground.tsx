import React from 'react'
import { Entity } from '../elements/entitySlice'
import { Link } from '../elements/linksSlice';
import { DiagramType } from './diagramSettingsSlice';
import { TopologicalDiagram } from './TopologicalDiagram';

export interface DiagramProps {
    entities: Entity[],
    links: Link[],
    diagramType?: DiagramType
}

export interface DiagramEntity extends Entity {
    linkedEntities: Set<string>, 
    linkedEntitiesCopy: Set<string>
}

export function DiagramPlayground(props: DiagramProps): JSX.Element{
    switch(props.diagramType||DiagramType.Topological){
        case DiagramType.Topological:
            return <TopologicalDiagram {... props} />
        default:
            return <p>Not implemented</p>
    }
}

