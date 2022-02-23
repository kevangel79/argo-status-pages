import { createTheme } from '@mui/material/styles';
import CONFIG from '../config';

const theme = createTheme({
    palette: {
      primary: {
        main: CONFIG.primaryColor,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: CONFIG.primaryColor,
            width: "80%",
            marginLeft: "auto",
            marginRight: "auto"
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: CONFIG.primaryColor,
            marginBottom: "20px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: CONFIG.headerMenuTextColor,
          },
        },
      },
    },
});

export {theme}