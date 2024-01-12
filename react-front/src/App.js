import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import Header from './views/Header';
import Home from './views/Home';
import Footer from './views/Footer';
import Product from './views/Product';
import Cart from './views/Cart';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/product/:name' element={<Product/>} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </ThemeProvider>
    
  );
}

export default App;
