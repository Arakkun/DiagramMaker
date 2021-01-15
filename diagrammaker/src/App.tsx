import React from 'react';
import './App.css';
import "@fontsource/roboto" 
import { SiteTabs } from './features/navigation/SiteTabs';
import { ActiveTab } from './features/navigation/ActiveTab';
import { Container } from '@material-ui/core'

function App() {
  return (
    <div>
      <SiteTabs />
      <Container maxWidth="sm">
        <ActiveTab />
      </Container>
    </div>
  );
}

export default App;
