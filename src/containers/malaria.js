import React from 'react';
import Navbar from '../components/navbar'
import { useHistory } from "react-router-dom";
import Footer from '../components/footer'
import PredictMalaria from '../containers/predictMalaria'
import { authetication } from '../App'

function Malaria(props) {

    const history = useHistory();
    return (
        <div>
             <Navbar login="Logout" home="Home" />
             <PredictMalaria />
        </div>
    );
}

export default Malaria;