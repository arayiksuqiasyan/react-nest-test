import React, {useState} from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import StripeContainer from "../../components/StripeContainer";
import {Button} from "react-bootstrap";
import pikachu from '../../images/pikachu.jpg'

const Home = () => {
    const [showItem, setShowItem] = useState(false)

    return (
        <div>
            <Navbar bg="light" expand="lg" className={'ps-4'}>
                <Navbar.Brand href="#home">My Website</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/admin-login">Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {showItem ? <StripeContainer/> :
                <div className={'product-wrapper'}>
                    <>
                        <h3>$10.00</h3>
                        <img src={pikachu} alt='pikachu'/>
                        <Button onClick={() => setShowItem(true)}>Purchase Pikachu</Button>
                    </>
                </div>
            }

        </div>
    )
}

export default Home
