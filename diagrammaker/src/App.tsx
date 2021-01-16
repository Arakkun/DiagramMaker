import React from 'react';
import './App.css';
import "@fontsource/roboto" 
import { SiteTabs } from './features/navigation/SiteTabs';
import { ActiveTab } from './features/navigation/ActiveTab';
import { Container, createMuiTheme, CssBaseline, Paper, ThemeProvider } from '@material-ui/core'

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SiteTabs /> 
        <Container maxWidth="lg">
          <Paper elevation={2}>
            <ActiveTab />
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
