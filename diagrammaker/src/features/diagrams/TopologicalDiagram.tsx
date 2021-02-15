import React from 'react';
import { Entity } from '../elements/entitySlice';
import {DiagramProps, DiagramEntity} from './DiagramPlayground'
import {EntityStyle, Position, EntityElement} from './EntityElements'
import { LinkElement, LinkStyle } from './LinkElements';
import  Color from 'color'
import { colorAssign, ColorationOrigin, ColorationStyle, Orientation } from './diagramSettingsSlice';

export interface TopologicalProps extends DiagramProps {
    entitySize?: number, // size of the entity in diagram
    linkStyle?: LinkStyle, // type of the line connecting the parts
    orientation?: Orientation, // to where the higher layers should be
    entityStyle?: EntityStyle, // what kind of style should the box be
    padding?: number // space between entities
    colorationStyle?: ColorationStyle,
    from?: ColorationOrigin,
    colors?: colorAssign
}

interface TopologicalDiagramEntity extends DiagramEntity {
    layer?: number,
    position?: number
}

export function TopologicalDiagram({
    entities,
    links,
    entitySize=100,
    linkStyle=LinkStyle.Linear,
    orientation=Orientation.toRight,
    entityStyle=EntityStyle.Circle,
    padding=50,
    colorationStyle=ColorationStyle.Random,
    from=ColorationOrigin.origin,
    colors={}
  }: TopologicalProps): JSX.Element{
        // We assign each layer level from the last, so if A>B, A>C, C>E and D>E 
        // layers will be, from the lowest:
        // {A},{B,C,D},{E}
        let diagramEntities:Record<string, TopologicalDiagramEntity> = {};
        let entitiesToAssign = new Set<string>();
        entities.map((entity) => {
            console.log(entity.styleTypeA)
            diagramEntities[entity.entityId] = { ...entity, linkedEntities: new Set<string>(), linkedEntitiesCopy: new Set<string>()};
            entitiesToAssign.add(entity.entityId);
        });
        links.map((link) => {
            diagramEntities[link.entityIdA].linkedEntities.add(link.entityIdB)
            diagramEntities[link.entityIdA].linkedEntitiesCopy.add(link.entityIdB)
        });
        
        let startingLayer:number = 0;
        
        let limit = entitiesToAssign.size+1 // Avoid infinite loops, as startingLayer will be -limit only when there's a loop
        // (There'll be a state were all entities in the loop point to each other, making it impossible to assign a layer) 

        while(entitiesToAssign.size>0 && startingLayer>-limit){
            // Clear
            entitiesToAssign.forEach((entity) => {
                diagramEntities[entity].linkedEntitiesCopy.forEach((linkedEntity)=>{
                    if(entitiesToAssign.has(linkedEntity)==false){
                        diagramEntities[entity].linkedEntitiesCopy.delete(linkedEntity)
                    }
                })
            })

            // Assign
            entitiesToAssign.forEach((entity) => {
                // If the entity is not linked to any entities to assign
                if(diagramEntities[entity].linkedEntitiesCopy.size==0){
                    // It's part of the latest layer
                    entitiesToAssign.delete(entity);
                    diagramEntities[entity].layer=startingLayer
                }
            })

            startingLayer--;
        }

        if( startingLayer< limit ){
            // Fixing layers and position to print the entities
            let layers = - startingLayer
            let counts = new Array<number>(layers)
            for (let layer=0; layer< layers; layer++){
                counts[layer] = 0;
            }
            let maxCount:number = 0;
            let entityColor:colorAssign = {};
            console.log(diagramEntities)
            Object.entries(diagramEntities).forEach(([entityId,entity]) => {
                let layer = entity.layer as number + layers-1;
                entity.layer = layer
                entity.position = counts[layer]
                counts[layer] = counts[layer] + 1;
                console.log("prima dello switch/case")
                console.log(entity) // logga correttamente
                if(counts[layer]>maxCount) maxCount = counts[layer];
                switch(colorationStyle){
                    case ColorationStyle.Random:
                    case ColorationStyle.Entity:
                        entityColor[entityId] = colors[entityId];
                        break;
                    case ColorationStyle.StyleA:
                        console.log("durante switch/case")
                        console.log(entity) // Non logga nulla
                        entityColor[entityId] = colors[entity.styleTypeA];
                        break;
                    case ColorationStyle.StyleB:
                        entityColor[entityId] = colors[entity.styleTypeB];
                        break;
                }
                console.log("dopo lo switch/case")
                console.log(entity) // logga correttamente
                
            })

            let svgSize = getSize(entitySize, padding, orientation, layers, maxCount)
            console.log("colors")
            console.log(colors)
            console.log("color")
            console.log(entityColor)
            return (
                <svg width={svgSize.width} height={svgSize.height} id="SVGDiagram">
                    {links.map((link)=>(<LinkElement
                            style={linkStyle}
                            positionA =  {getPosition(
                                diagramEntities[link.entityIdA].layer as number, 
                                diagramEntities[link.entityIdA].position as number, 
                                counts, maxCount, entitySize, padding, orientation, svgSize)}
                            positionB =  {getPosition(
                                diagramEntities[link.entityIdB].layer as number, 
                                diagramEntities[link.entityIdB].position as number, 
                                counts, maxCount, entitySize, padding, orientation, svgSize)}
                            layerA={diagramEntities[link.entityIdA].layer as number}
                            layerB={diagramEntities[link.entityIdB].layer as number}
                            svgSize={svgSize}
                            orientation={orientation}
                            strokeColor={entityColor[(from==ColorationOrigin.origin ? link.entityIdA : link.entityIdB)].hex()}
                            padding={padding}
                        />)
                    )}
                    {Object.entries(diagramEntities).map(([id, object]) => ( <EntityElement 
                        style={entityStyle}
                        image={object.imgLink} 
                        id={id} 
                        position={getPosition(object.layer as number, object.position as number, counts, maxCount, entitySize, padding, orientation, svgSize)} 
                        size={entitySize} />  ))}
                    
                </svg>
            )
        }
        else{
            return <p>There is a cycle! So this technique can't be used</p> 
        }
    }

    export interface SvgSize{
        width:number,
        height:number
    }
    function getSize (size:number, padding:number, orientation:Orientation, layers:number, maxCount:number):SvgSize{
        // Returns width and height for the SVG object
        // calculating it for the toRight orientation
        let width = (layers+1)*padding + (layers)*size
        let height = (maxCount+1)*padding + (maxCount)*size
        switch(orientation){
            case Orientation.toLeft:
            case Orientation.toRight:
                return {width: width, height: height}
            case Orientation.toUp:
            case Orientation.toDown:
                return {width: height, height: width}

        }

    }

    function getPosition (layer:number, position:number, counts:number[], max_count:number, size:number, padding:number, orientation:Orientation, svgSize:SvgSize):Position {
        // Returns width and height for the SVG object
        // calculating it for the toRight orientation
        let x = (layer+1)*padding + (layer+0.5)*size
        let newPadding = (padding*(max_count+1)+size*(max_count-counts[layer]))/(counts[layer]+1)
        let y = (position+1)*newPadding + (position+0.5)*size
        switch(orientation){
            case Orientation.toLeft:
                return {x:svgSize.width-x, y:y}
            case Orientation.toRight:
                return {x:x, y:y}
            case Orientation.toDown:
                return {x:y, y:x}
            case Orientation.toUp:
                return {x:y, y:svgSize.height-x}
        }
    }