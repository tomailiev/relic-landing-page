import './App.css';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home.js/Home';
import { Routes, Route } from 'react-router-dom';
import About from './components/About/About';
import '@fontsource/lato/400.css';
import NotificationContext from './context/NotificationContext';
import { useState } from 'react';
import Notification from './components/Common/Notification';

function App() {

  const [notification, setNotification] = useState(null);

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
      ].join(',')
    },
    palette: {
      primary: {
        main: '#f57f17',
      },
      secondary: {
        main: '#bf360c',
      },

    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NotificationContext.Provider value={{ notification, setNotification }}>
          <Notification />
          <Box minHeight="90vh" display="flex" flexDirection="column" alignItems={"center"} sx={{ background: "linear-gradient(180deg, rgba(214,191,162,1) 0%, rgba(238,222,197,1) 100%)" }}>
            <CssBaseline />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/whoweare" element={<About />} />
              <Route path="/events" element={<About />} />
            </Routes>
          </Box>
          <Footer />
        </NotificationContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
