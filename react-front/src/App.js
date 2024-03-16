import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import Header from './views/Header';
import FirstCategories from './views/FirstCategories';
import SecondCategories from './views/SecondCategories';
import ThirdCategories from './views/ThirdCategories';
import Home from './views/Home';
import Footer from './views/Footer';
import Product from './views/Product';
import Cart from './views/Cart';
import Profile from './views/Profile';
import Purchase from './views/Purchase';
import Search from './views/Search';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/categories/:firstRoute' element={ <FirstCategories/> } />
            <Route path='/categories/:firstRoute/:secondRoute' element={ <SecondCategories/> } />
            <Route path='/categories/:firstRoute/:secondRoute/:thirdRoute' element={ <ThirdCategories/> } />
            <Route path='/search/:search' element={<Search/>} />
            <Route path='/product/:name' element={<Product/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/purchase' element={<Purchase/>} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </ThemeProvider>
    
  );
}

export default App;
