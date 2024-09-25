import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import NoMatch from './components/Common/NoMatch';
import Journey from './components/Journey/Journey';
import Support from './components/Support/Support';
import Cochin from './assets/fonts/Cochin.woff2';
import DonorLevels from './components/Support/DonorLevels';
import Host from './components/Support/Host';

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
  }, []);

  const missionTexts = [
    { textContent: text.aboutMission },
    { textContent: text.aboutValues }
  ];

  const bioTexts = [
    { textContent: text.aboutNewBio },
    { textContent: text.aboutNewBio2 },
    { textContent: text.aboutNewBio3 }
  ];

  const location = useLocation();

  const theme = createTheme({
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
                      <Route path="/about/mission" element={<Story content={missionTexts} pageTitle={'Mission & Values'} />} />
                      <Route path="/about/bio" element={<Story content={bioTexts} pageTitle={'About Us'} />} />
                      <Route path="/about/musicians" element={<Musicians />} />
                      <Route path='/about/journey' element={<Journey />} />
                      <Route path="/events/:year" element={<Events />} />
                      <Route path='/support/donate' element={<Support />} />
                      <Route path={'/support/tiers'} element={<DonorLevels />} />
                      <Route path={'/support/host'} element={<Host />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path={'/support/levels'} element={<Navigate to={'/support/tiers'} />} />
                      <Route path="/donate" element={<Navigate to={'/support/donate'} />} />
                      <Route path="/events" element={<Navigate to={'/events/2024-25'} />} />
                      <Route path="/event" element={<Navigate to={'/events/2024-25'} />} />
                      <Route path="*" element={<NoMatch />} />
                    </Routes>
                  </CSSTransition>
                </TransitionGroup>
                {location.pathname !== '/support' && <ActionCenter />}
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
