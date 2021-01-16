import { selectTab } from './tabSlice';
import React from "react";
import { useSelector } from 'react-redux';
import { ElementsManager } from "../elements/ElementsManager"

export function ActiveTab() {
    const selectedTab = useSelector(selectTab);

    switch(selectedTab){
        case 'elements-manager':
            return <ElementsManager />
        case 'diagram-manager':
            return(
                <div>
                    Diagram Manager
                </div>
            )
        case 'diagram-viewer':
            return(
                <div>
                    Diagram Viewer
                </div>
            )
        case 'home':
        default:
            return(
                <div>
                    Home
                </div>
            )
    }
}
