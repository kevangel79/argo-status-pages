import { createTheme } from '@mui/material/styles';
import CONFIG from '../config';

const theme = createTheme({
    palette: {
      primary: {
        main: CONFIG.primaryColor,
      },
      secondary: {
        main: '#aaf'
      }
    },
});

export {theme}