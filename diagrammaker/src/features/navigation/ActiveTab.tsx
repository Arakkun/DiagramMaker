import { selectTab } from './tabSlice';
import React from "react";
import { useSelector } from 'react-redux';

export function ActiveTab() {
    const selectedTab = useSelector(selectTab);

    switch(selectedTab){
        case 'elements-manager':
            return(
                <div>
                    Elements Manager
                </div>
            )
            break;
        case 'diagram-manager':
            return(
                <div>
                    Diagram Manager
                </div>
            )
            break;
        case 'diagram-viewer':
            return(
                <div>
                    Diagram Viewer
                </div>
            )
            break;
        case 'home':
        default:
            return(
                <div>
                    Home
                </div>
            )
            break;
    }
}
