import './App.css';
import useAuth from "./hooks/useAuth";
import {Navigate, Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home/Home";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
    const {isLogin: isAuthenticated} = useAuth();

    return (
        <div className="App">
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/admin" exact element={isAuthenticated ? <AdminPanel/> : <Navigate to={'/'}/>}/>
                <Route path="/admin-login" exact element={<AdminLogin/>}/>
                <Route path="/admin-register" exact element={<AdminRegister/>}/>
                <Route path="*" element={<Navigate to={'/'}/>}/>
            </Routes>
        </div>
    );
}

export default App;
