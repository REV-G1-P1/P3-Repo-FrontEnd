import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginPage } from './Components/Login/Login';
import { RegisterPage } from './Components/Register/Register';

function App() {
    return (
        <div className="App">
          <BrowserRouter>
    <Routes>
    <Route path="" element={<LoginPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
    </Routes>
    </BrowserRouter>
        </div>
    );
}

export default App;
