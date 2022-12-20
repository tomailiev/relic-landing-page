import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { Routes, Route, useLocation } from 'react-router-dom';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/julius-sans-one/400.css';
import '@fontsource/lato/400-italic.css';
import '@fontsource/lato/700.css';
import NotificationContext from './context/NotificationContext';
import { useState } from 'react';
import Notification from './components/Common/Notification';
import Events from './components/Events/Events';
import ActionCenter from './components/Common/ActionCenter';
import DialogContext from './context/DialogContext';
import CommonDialog from './components/Common/CommonDialog';
import Musicians from './components/Musicians/Musicians';
import Story from './components/About/Story';
import texts from './data/texts';
import TextContext from './context/TextContext';
import { useEffect } from 'react';
import { downloadOneDoc } from './utils/firebase/firestore-funcs';
import Contact from './components/Contact/Contact';
import LoadingContext from './context/LoadingContext';
import LoadingBackdrop from './components/Common/LoadingBackdrop';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Forward from './components/Common/Forward';
import NoMatch from './components/Common/NoMatch';

function App() {

  const [notification, setNotification] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [text, setText] = useState(texts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    downloadOneDoc('textContent', 'allTexts')
      .then(doc => {
        if (doc) {
          setText(doc);
          return;
        };
        setText(texts);
      })
      .catch(e => {
        setText(texts);
      })
  }, [])

  const location = useLocation();

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
        fontSize: '8.5rem',
        fontFamily: 'Julius Sans One',
        '@media (max-width:600px)': {
          fontSize: '5rem',
        }
      },
      h3: {
        marginTop: 30
      },
      h6: {
        fontFamily: 'Julius Sans One',
        fontSize: '1.2rem'
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
            background: '#000000',
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
        <TextContext.Provider value={{ text, setText }}>
          <LoadingContext.Provider value={{ loading, setLoading }}>
            <NotificationContext.Provider value={{ notification, setNotification }}>
              <DialogContext.Provider value={{ dialog, setDialog }}>
                <LoadingBackdrop />
                <Notification />
                <CommonDialog />
                <CssBaseline />
                <Header />
                <TransitionGroup component={null}>
                  <CSSTransition key={location.key} classNames="fade" timeout={300}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/musicians" element={<Musicians />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/bio" element={<Story />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/donate" element={<Forward />} />
                      <Route path="*" element={<NoMatch />} />
                    </Routes>
                  </CSSTransition>
                </TransitionGroup>
                <ActionCenter />
                <Footer />
              </DialogContext.Provider>
            </NotificationContext.Provider>
          </LoadingContext.Provider>
        </TextContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
