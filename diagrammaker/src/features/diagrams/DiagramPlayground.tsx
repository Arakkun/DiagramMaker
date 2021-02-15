import React, { ReactInstance, RefObject, useRef } from 'react'
import { Entity } from '../elements/entitySlice'
import { Link } from '../elements/linksSlice';
import { DiagramType, DiagramSettingsState } from './diagramSettingsSlice';
import { TopologicalDiagram } from './TopologicalDiagram';

export interface DiagramProps {
    entities: Entity[],
    links: Link[]
}

export interface DiagramPlaygroundProps extends DiagramProps, DiagramSettingsState{
}

export interface DiagramEntity extends Entity {
    linkedEntities: Set<string>, 
    linkedEntitiesCopy: Set<string>
}

export function DiagramPlayground(props: DiagramPlaygroundProps): JSX.Element{
    switch(props.type||DiagramType.Topological){
        case DiagramType.Topological:
            return <TopologicalDiagram {... props} />
        default:
            return <p>Not implemented</p>
    }
}

