import React from "react";

export enum EntityStyle{
    Square = "square",
    Circle = "circle",
    RoundedSquare = "rounded square",
}

export interface Position{
    x:number,
    y:number
}

interface EntityProps{
    style?: EntityStyle,
    image: string,
    id:string,
    entityStyleA?: string, 
    entityStyleB?: string,
    position: Position
    size: number
}

interface MaskProps{
    position: Position
    size: number
}

export function EntityElement(props: EntityProps): JSX.Element{
    let mask
    switch(props.style||EntityStyle.Square){
        case EntityStyle.Square:
        default:
            mask = <Square position={props.position} size={props.size} />
            break;
        case EntityStyle.Circle:
            mask = <Circle position={props.position} size={props.size} />
            break;
    }
    return (
        <g>
            <mask id={props.id}>
                {mask}
            </mask>
            <image href={props.image} x={props.position.x-props.size/2} y={props.position.y-props.size/2} width={props.size} height={props.size} mask={"url(#"+props.id+")"} />
        </g>
        
    )
}

function Square({position, size}:MaskProps){
    return <rect x={position.x-size/2} y={position.y-size/2} width={size} height={size} fill="black" />
}
function Circle({position, size}:MaskProps){
    return (
        <g>
            <rect x={position.x-size/2} y={position.y-size/2} width={size} height={size} fill="black" />
            <circle cx={position.x} cy={position.y} r={size/2} fill="white" />
        </g>
    )
}