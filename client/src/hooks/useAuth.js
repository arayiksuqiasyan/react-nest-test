import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import {authServiceLoginUser} from "../services/admin-service/admin-service";
import {saveState} from "../helpers/constats";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

const useAuth = (props) => {
    const value = useContext(AuthContext);
    return value;
};

export default useAuth;

export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate();
    const defaultState = useMemo(function () {
        try {
            const obj = JSON.parse(localStorage.getItem("token"));
            return !!obj?.token;
        } catch (e) {
            return false;
        }
    }, []);
    const [isLogin, setIsLogin] = useState(defaultState);

    const login = async (data) => {
        try {
            const res = await authServiceLoginUser(data);
            if (res?.token) {
                await saveState("token", res);
                setIsLogin(true);
            }
        } catch (e) {
            return Promise.reject(e)
        }
    };


    const logout = () => {
        try {
            localStorage.removeItem("token");
            setIsLogin(false);
            navigate('/admin-login')
        } catch (e) {
        }
    };

    const value = {isLogin, login, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
