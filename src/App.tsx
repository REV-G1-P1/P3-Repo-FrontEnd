import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AddressPage } from './Components/Address/Address';
import Footer from './Components/Footer/Footer';
import { HeaderPage } from './Components/Header/Header';
import { HomePage } from './Components/Home/Home';
import { LoginPage } from './Components/Login/Login';
import { ManagerPage } from './Components/Manager/Manager';
import { ModalPage } from './Components/Modal/Modal';
import { MortgagePage } from './Components/Mortgage/Mortgage';
import { RegisterPage } from './Components/Register/Register';
import TwoFactorAuth from "./Components/TwoFactorAuth/TwoFactorAuth";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <HeaderPage />
                <Routes>
                    <Route path="" element={<LoginPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/authentication" element={<TwoFactorAuth />}/>
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/address" element={<AddressPage />}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/admin" element={<ManagerPage />}/>
                    <Route path="/mortgage" element={<MortgagePage />}/>
                    <Route path="/modal" element={<ModalPage />}/>
                    <Route path="/manager" element={<ManagerPage />}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
