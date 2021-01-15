import React from 'react';
import './App.css';
import "@fontsource/roboto" 
import { SiteTabs } from './features/navigation/SiteTabs';
import { ActiveTab } from './features/navigation/ActiveTab';
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core'

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
          <SiteTabs />
          <Container maxWidth="sm">
            <ActiveTab />
          </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
