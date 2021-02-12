import React from 'react'
import { Entity } from '../elements/entitySlice'
import { Link } from '../elements/linksSlice';
import { TopologicalDiagram } from './TopologicalDiagram';

enum DiagramType {
    Topological = "topological"
}

export interface DiagramProps {
    entities: Entity[],
    links: Link[],
    diagramType?: DiagramType
}

export interface DiagramEntity<T> {
    object : T,
    layer?: number, 
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

