import React from "react";
import {Button} from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const AdminPanel = (props) => {
    const auth = useAuth()

    return (
        <div className={'w-100 d-flex flex-column align-items-center'}>
            <h1>AdminPanel</h1>
            <Button onClick={() => auth.logout()} variant="danger">
                Logout
            </Button>
        </div>
    )
}

export default AdminPanel
