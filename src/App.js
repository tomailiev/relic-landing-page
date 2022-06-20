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
        main: '#bf360c',
      },
      secondary: {
        main: '#f57f17',
      },
      background: {
        mainGradient: "linear-gradient(180deg, rgba(214,191,162,1) 0%, rgba(238,222,197,1) 100%)",
        reverseGradient: "linear-gradient(180deg, rgba(238,222,197,1) 0%, rgba(214,191,162,1) 100%)",
        textGradient: 'linear-gradient(180deg, rgba(238,222,197,0) 0%, rgba(214,191,162,1) 20%, rgba(214,191,162,1) 80%, rgba(238,222,197,0) 100%)',
        drawer: '#f4e5cf'
      }
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NotificationContext.Provider value={{ notification, setNotification }}>
          <Notification />
          <Box minHeight="90vh" display="flex" flexDirection="column" alignItems={"center"} sx={{ background: theme.palette.background.mainGradient }}>
            <CssBaseline />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
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
