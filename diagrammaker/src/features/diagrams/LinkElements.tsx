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
    strokeColor?: string,
    padding: number
}

export function LinkElement(props: LinkProps): JSX.Element{
    console.log("I draw a line")
    switch(props.style||LinkStyle.Linear){
        case LinkStyle.Linear:
        default:
            return <LinearLink {... props} />
        case LinkStyle.S:
            return <SLink {... props} />
        case LinkStyle.Arc:
            return <ArcLink {... props} />
        case LinkStyle.SharpAngle:
            return <SharpAngleLink {...props} />
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
    const layerDiff = props.layerB-props.layerA;

    if(layerDiff == 1){
        let A = props.positionA;
        let E = props.positionB;
        let B:Position;
        let C:Position ={x: (A.x + E.x)/2, y: (A.y + E.y)/2}
        switch(props.orientation){
            case Orientation.toUp || Orientation.toDown:
                B = {x:A.x,y:C.y}
                break;
            default:
                B = {x:C.x,y:A.y}
                break;
        }
        return <path d={"M "+A.x+" "+A.y+" Q "+B.x+" "+B.y+" "+C.x+" "+C.y+" T "+E.x+" "+E.y} stroke={props.strokeColor||"black"} stroke-width={props.strokeThickness||2.5} fill="transparent"/> 
    } else {
        let midPoint:Position= {x:0, y:0}
        let downA:boolean, downB:boolean
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
        return (
            <g>
                <SLink {...props} positionB={midPoint} layerB={props.layerA+1} />
                <SLink {...props} positionA={midPoint} layerA={props.layerB-1} />
            </g>  
        )
    }
}

function ArcLink(props: LinkProps): JSX.Element{
    const layerDiff = props.layerB-props.layerA;

    if(layerDiff == 1){
        let A = props.positionA;
        let C = props.positionB;
        let B:Position;
        switch(props.orientation){
            case Orientation.toUp || Orientation.toDown:
                B = {x:A.x,y:C.y}
                break;
            default:
                B = {x:C.x,y:A.y}
                break;
        }
        return <path d={"M "+A.x+" "+A.y+" Q "+B.x+" "+B.y+" "+C.x+" "+C.y} stroke={props.strokeColor||"black"} stroke-width={props.strokeThickness||2.5} fill="transparent"/> 
    } else {
        let midPoint:Position= {x:0, y:0}
        let downA:boolean, downB:boolean
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
        return (
            <g>
                <ArcLink {...props} positionA={midPoint} positionB={props.positionA} layerB={props.layerA+1} />
                <ArcLink {...props} positionA={midPoint} layerA={props.layerB-1} />
            </g>  
        )
    }

    
}


function SharpAngleLink(props: LinkProps): JSX.Element{
    const layerDiff = props.layerB-props.layerA;

    if(layerDiff == 1){
        let A = props.positionA;
        let E = props.positionB;
        let B:Position, D:Position;
        let C:Position ={x: (A.x + E.x)/2, y: (A.y + E.y)/2}
        let mod:number;
        switch(props.orientation){
            case Orientation.toUp || Orientation.toDown:
                mod = props.padding *  (A.x-props.svgSize.width/2)/props.svgSize.width * 0.95
                C.y = C.y + mod;
                B = {x:A.x,y:C.y}
                D = {x:E.x,y:C.y}
                break;
            default:
                mod = props.padding *  (A.y-props.svgSize.height/2)/props.svgSize.height * 0.95
                C.x = C.x + mod;
                B = {x:C.x,y:A.y}
                D = {x:C.x,y:E.y}

                break;
        }
        return <path d={"M "+A.x+" "+A.y+" L "+B.x+" "+B.y+" L "+C.x+" "+C.y+" L "+D.x+" "+D.y+" L "+E.x+" "+E.y} stroke={props.strokeColor||"black"} stroke-width={props.strokeThickness||2.5} fill="transparent"/> 
    } else {
        let midPoint:Position= {x:0, y:0}
        let downA:boolean, downB:boolean
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
        return (
            <g>
                <SharpAngleLink {...props} positionB={midPoint} layerB={props.layerA+1} />
                <SharpAngleLink {...props} positionA={midPoint} layerA={props.layerB-1} />
            </g>  
        )
    }
}

