import { createTheme } from '@mui/material';
import Cochin from '../assets/fonts/Cochin.woff2';

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h1: {
            fontWeight: 700,
            fontSize: '8.5rem',
            fontFamily: 'Julius Sans One',
            // '@media (max-width:600px)': {
            //   fontSize: '5rem',
            // }
        },
        h3: {
            marginTop: 30,
            fontFamily: 'Cochin',
            fontSize: '2.5rem',
            // fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: 1.2
        },
        h6: {
            fontFamily: 'Cochin',
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: 2
        },
        subtitle1: {
            color: '#000000',
            fontWeight: '400',
            fontStyle: 'italic',
            fontSize: '1.3rem'
        }
    },
    palette: {
        primary: {
            main: '#09455a',
        },
        secondary: {
            main: '#efd498',
            dark: '#cfaa55',
            light: '#f9ebb3'
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Cochin';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Cochin'), local('Cochin-Regular'), url(${Cochin}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `
        },
        MuiMenu: {
            styleOverrides: {
                list: {
                    background: '#000000',
                    boxShadow: 'none'
                },
                paper: {
                    boxShadow: 'none'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    letterSpacing: 1.5,
                    fontWeight: '700'
                }
            }
        }
    }
});