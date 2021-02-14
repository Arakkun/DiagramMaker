import React from "react";
import { Orientation } from "./diagramSettingsSlice";
import { Position } from "./EntityElements";
import { SvgSize } from "./TopologicalDiagram";

export enum LinkStyle{
    Linear = "linear",
    SharpAngle = "sharp angle",
    Arc = "arc",
    S = "s"
}



interface LinkProps{
    style?: LinkStyle,
    positionA: Position,
    positionB: Position,
    layerA: number,
    layerB: number,
    svgSize: SvgSize, 
    orientation: Orientation,
    strokeThickness?: number, 
    strokeColor?: string
}

export function LinkElement(props: LinkProps): JSX.Element{
    console.log("I draw a line")
    switch(props.style||LinkStyle.Linear){
        case LinkStyle.Linear:
        default:
            return <LinearLink {... props} />
        case LinkStyle.S:
            return <SLink {... props} />
    }
}

function LinearLink(props: LinkProps): JSX.Element{
    const layerDiff = props.layerB-props.layerA;
    let path;
    if(layerDiff == 1){
        path="M "+props.positionA.x+" "+props.positionA.y+" L "+props.positionB.x+" "+props.positionB.y;
    }
    else{
        let midPoint:Position = {x:0, y:0};
        let downA, downB;
        switch(props.orientation){
            case Orientation.toUp || Orientation.toDown:
                downA = props.positionA.x<props.svgSize.width/2
                downB = props.positionB.x<props.svgSize.width/2
                midPoint.x = ((downA && ~downB)||(downB && ~downA)) ? 0 : props.svgSize.width
                midPoint.y = (props.positionA.y+props.positionB.y)/2;
                break;
            default:
                downA = props.positionA.y<props.svgSize.height/2
                downB = props.positionB.y<props.svgSize.height/2
                midPoint.y =((downA && ~downB)||(downB && ~downA)) ? 0 : props.svgSize.height
                midPoint.x = (props.positionA.x+props.positionB.x)/2;
                break;
        }

        path="M "+props.positionA.x+" "+props.positionA.y +" L "+midPoint.x+" "+midPoint.y +" L "+props.positionB.x+" "+props.positionB.y
    }

    return (
        <path d={path} stroke={props.strokeColor||"black"} stroke-width={props.strokeThickness||2.5} fill="transparent"/>
    )
}

function SLink(props: LinkProps): JSX.Element{
    return (
        <g></g>  
    )
}
