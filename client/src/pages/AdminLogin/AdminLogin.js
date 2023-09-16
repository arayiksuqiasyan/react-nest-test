import React, {useEffect} from "react";
import classes from './AdminLogin.module.scss'
import {Link, useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";

import useAuth from "../../hooks/useAuth";
import {toast, ToastContainer} from "react-toastify";

const AdminLogin = (props) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const notify = (message) => toast.error(message);

    const handleSubmit = (e) => {
        e.preventDefault();
        const login = e.target["form-login"].value;
        const password = e.target["form-password"].value;
        if (!login) {
            notify('Login is Required')
        } else if (!password) {
            notify('Password is Required')
        } else {
            const data = {login, password};
            auth?.login(data)
                .catch((e) => notify(e.message))
        }
    };

    useEffect(()=>{
        if(auth.isLogin){
            navigate('/admin')
        }
    },[auth.isLogin])

    return (
        <Container
            fluid="md"
            className={
                "mt-auto mb-auto min-vh-100 d-flex justify-content-center align-items-center"
            }
        >
            <Form className={"w-100"} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="form-login">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="form-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>

                <div className={"d-flex align-items-center w-100 gap-3"}>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
            <ToastContainer
                newestOnTop
                theme="dark"
                autoClose={1200}
                position="top-center"
                pauseOnHover={false}
            />
        </Container>
    )
}

export default AdminLogin
