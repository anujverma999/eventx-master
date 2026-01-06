import AppRoutes from './routes/AppRoutes';
import './index.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: `'Inter', sans-serif`,
    fontSize: 14,
    allVariants: {
      fontFamily: `'Inter', sans-serif`,
      fontSize: 14,
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: `'Inter', sans-serif`,
          fontSize: 14,
          fontWeight: 700,
          color: '#242424', // applies to dropdown trigger text
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: `'Inter', sans-serif`,
          fontSize: '12px',
          fontWeight: 700,
          color: '#242424', // applies to dropdown options
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: `'Inter', sans-serif`,
          fontSize: '12px',
          fontWeight: 700,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: `'Inter', sans-serif`,
          fontSize: '12px',
          fontWeight: 700,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;