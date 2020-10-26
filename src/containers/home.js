import React, { Component, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/navbar";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from "../Assets/Images/1.jpg";
import image2 from "../Assets/Images/2.jpg";
import image3 from "../Assets/Images/3.png";
import image4 from "../Assets/Images/4.jpg";
import "../Assets/Style/home.css";
import Card from "../components/card";
import Heart from "../Assets/Images/heart.jpg";
import Malaria from "../Assets/Images/malaria.jpg";
import Footer from '../components/footer'
import Button from "@material-ui/core/Button";
import { authetication } from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
function Home(props) {
    const history = useHistory();
    let navlink;
    if(sessionStorage.getItem('name')===null){
      navlink= <Navbar login="Login" signup="Register" />
    }
    else{
      navlink= <Navbar login="Logout" />
    }
    const heart = () => {
      if(sessionStorage.getItem('name')===null){
        // sessionStorage.setItem('heart',"heart")
        // sessionStorage.removeItem('malaria')
        toast.info("Please login to diagnose Heart disease", {
          position: toast.POSITION_TOP_RIGHT,
        });
      }
      else{
        let path = `/heart`; 
        history.push(path);
      }
    }
      
    const malaria = () => {
      if(sessionStorage.getItem('name')===null){
        // sessionStorage.setItem('malaria',"malaria")
        // sessionStorage.removeItem('heart')
        toast.info("Please login to diagnose Malaria disease", {
          position: toast.POSITION_TOP_RIGHT,
        });
      }
      else{
        let path = `/malaria`; 
        history.push(path);
      }
    }
  return (
    <div>
      {navlink}
      <AliceCarousel
        infinite={true}
        mouseTracking={true}
        touchTracking={true}
        animationType="fadeout"
        controlsStrategy="responsive"
        disableButtonsControls={true}
        disableDotsControls={true}
        autoPlay={true}
        autoPlayInterval="3000"
      >
        <img src={image1} className="sliderimg" />
        <img src={image2} className="sliderimg" />
        <img src={image3} className="sliderimg" />
        <img src={image4} className="sliderimg" />
      </AliceCarousel>
      <div className="about">
        <h1>About Us</h1>
        <h4>
          Automatically read and diagnose CT images,
          <br /> AI assists doctors in finding tiny lesions Help grass-roots
          epidemic prevention and control,
          <br /> and achieve remote expert-level auxiliary diagnosis
        </h4>
      </div>
      <hr />
      <div className="over">
        <div className="card" id="heart">
          <Card
            image={Heart}
            title="Heart Diagnosis"
            description="An AI Based Heart Disease Diagnosis"
          />
          <Button size="large" color="primary" onClick={heart}>
          Diagnose
        </Button>
        </div>
        <div className="card" id="malaria">
          <Card
            image={Malaria}
            title="Malaria Diagnosis"
            description="An AI Based Malaria Disease Diagnosis"
          />
           <Button size="large" color="primary" onClick={malaria}>
          Diagnose
        </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
