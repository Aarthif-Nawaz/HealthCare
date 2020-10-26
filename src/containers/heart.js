import React from 'react';
import Navbar from '../components/navbar'
import Form from '../components/Form'
import { useHistory } from "react-router-dom";
import { authetication } from '../App'
function Heart(props) {

    const history = useHistory();
    return (
        <div>
            <Navbar login="Logout" home="Home" />
            <Form />
        </div>
    );
}

export default Heart;