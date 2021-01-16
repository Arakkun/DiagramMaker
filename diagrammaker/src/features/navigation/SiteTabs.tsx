import { changeTab, selectTab } from './tabSlice';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

export function SiteTabs() {
    const selectedTab = useSelector(selectTab);
    const dispatch = useDispatch();
    return(
        <AppBar position="static">
            <Box m="auto">
                <Tabs
                    onChange={(whatever,value)=>dispatch(changeTab(value))}
                    value={selectedTab}
                >
                    <Tab value="home" icon={<HomeIcon />} />
                    <Tab value="elements-manager" label="Elements Manager" />
                    <Tab value="diagram-manager" label="Diagram Manager" />
                    <Tab value="diagram-viewer" label="Diagram Viewer" />
                </Tabs>
            </Box>
        </AppBar>
    )
}

