import './App.css';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home.js/Home';
import { Routes, Route } from 'react-router-dom';
import About from './components/About/About';

function App() {
  return (
    <div className="App">
      <Box minHeight="90vh" display="flex" flexDirection="column" alignItems={"center"} sx={{background: "#eedec5"}}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whoweare" element={<About />} />
        </Routes>
      </Box>
      <Footer />
    </div>
  );
}

export default App;
