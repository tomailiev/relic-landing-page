import './App.css';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home.js/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Box minHeight="100vh" display="flex" flexDirection="column" alignItems={"center"}>
        <CssBaseline />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
