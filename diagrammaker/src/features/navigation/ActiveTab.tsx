import { selectTab } from './tabSlice';
import React from "react";
import { useSelector } from 'react-redux';
import { ElementsManager } from "../elements/ElementsManager"
import { DiagramManager } from '../diagrams/DiagramManager';

export function ActiveTab() {
    const selectedTab = useSelector(selectTab);

    switch(selectedTab){
        default: 
        case 'elements-manager':
            return <ElementsManager />
        case 'diagram-manager':
            return <DiagramManager /> 
    }
}
