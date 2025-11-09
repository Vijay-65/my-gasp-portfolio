// src/App.tsx

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import Home from './pages/Home'; // We will create this next

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline must be used to apply the global body styles from the theme */}
      <CssBaseline />
      
      {/* This will be the main container for your single-page portfolio */}
      <Home /> 
      
      {/* You would add routing here if it were a multi-page app, but for a
          smooth, animated portfolio, a single-page structure is often better. */}
    </ThemeProvider>
  );
}

export default App;