import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home.js/Home';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/400-italic.css';
import '@fontsource/lato/700.css';
import NotificationContext from './context/NotificationContext';
import { useState } from 'react';
import Notification from './components/Common/Notification';
import Events from './components/Events/Events';
import ActionCenter from './components/Common/ActionCenter';
import DialogContext from './context/DialogContext';
import CommonDialog from './components/Common/CommonDialog';
import Musicians from './components/About/Musicians';
import { TransitionGroup } from 'react-transition-group';

function App() {

  const [notification, setNotification] = useState(null);
  const [dialog, setDialog] = useState(null);

  const theme = createTheme({
    typography: {
      fontFamily: [
        'Lato',
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
        '@media (max-width:600px)': {
          fontSize: '3.5rem',
        }
      },
      h3: {
        marginTop: 30
      },
      subtitle1: {
        color: '#ffffff',
        fontWeight: '400',
        fontStyle: 'italic',
        fontSize: '1.3rem'
      }
    },
    palette: {
      primary: {
        main: '#a33363',
      },
      secondary: {
        main: '#ffffff',
      },
    },
    components: {
      MuiMenu: {
        styleOverrides: {
          list: {
            background: '#a33363',
            boxShadow: 'none'
          },
          paper: {
            boxShadow: 'none'
          }
        }
      },
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NotificationContext.Provider value={{ notification, setNotification }}>
          <DialogContext.Provider value={{ dialog, setDialog }}>
            <Notification />
            <CommonDialog />
            <CssBaseline />
            <Header />
            <TransitionGroup>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/musicians" element={<Musicians />} />
                <Route path="/events" element={<Events />} />
              </Routes>
            </TransitionGroup>
            <ActionCenter />
            <Footer />
          </DialogContext.Provider>
        </NotificationContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
