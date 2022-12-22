import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddressPage } from './Components/Address/Address';
import Footer from './Components/Footer/Footer';
import { HeaderPage } from './Components/Header/Header';
import { HomePage } from './Components/Home/Home';
import { LoginPage } from './Components/Login/Login';
import { RegisterPage } from './Components/Register/Register';

function App() {
    return (
        <div className="App">

          <BrowserRouter>
          <HeaderPage />
    <Routes>
    <Route path="" element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/address" element={<AddressPage />}/>
        <Route path="/home" element={<HomePage />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
        </div>
    );
}

export default App;
