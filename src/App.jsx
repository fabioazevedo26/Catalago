import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Product from './pages/Product';
import Clothes from './pages/Clothes';
import Diverse from './pages/Diverse';
import Electronics from './pages/Electronics';
import Furniture from './pages/Furniture';
import Footer from './components/Footer';
import ControlPanel from './pages/ControlPanel';
import Done from './pages/Done';
import ScrollToTop from './tools/ScrollToTop';
import LoginPage from './pages/LoginPage';

import { AuthProvider } from './context/AuthContext';


function App() {
  
  return (
    <AuthProvider>
      <div className='App'>
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product' element={<Navigate to="/" />} />
            <Route path='/diverse' element={<Diverse />} />
            <Route path='/electronics' element={<Electronics />} />
            <Route path='/furniture' element={<Furniture />} />
            <Route path='/clothes' element={<Clothes />} />
            <Route path='/control-panel' element={<ControlPanel />} />
            <Route path='/control-panel/done' element={<Done />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </div>
    </AuthProvider>
  );
}

export default App;
