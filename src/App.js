import './App.css';
import { Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import SubscribeForm from './components/SubscribeForm';
import Title from './components/Title';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Box height="100vh" display="flex" flexDirection="column" alignItems={"center"}>
        <CssBaseline />
        <Header />
        <Title />
        <SubscribeForm />
        <Footer />
      </Box>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
