import React, { Component, useState, useRef, useEffect } from "react";
import mos from "../Assets/Images/mosquito.png";
import Fab from "@material-ui/core/Fab";
import Navbar from "../components/navbar";
import "../Assets/Style/malaria.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactLoading from "react-loading";
import { responsiveFontSizes } from "@material-ui/core";

toast.configure();
function PredictMalaria(props) {
  const [loading, setLoading] = useState(false);
  const [im, setim] = useState([]);
  const [listImages, setImages] = useState([]);
  const [de, setde] = useState([]);
  const [start, setStared] = useState(false);
  var imaages = [];
  var find = require("list-files");
  const [state, setState] = useState([]);
  const [length, setLength] = useState();
  const [files, setFiles] = useState([]);
  const [imgurl, setimgurl] = useState([]);

  const baseUrl = "../../public/";
  let details;

  const fileSelectHandler = (e) => {
    if (start === true) {
      toast.info("Refreshing Your Page !", {
        position: toast.POSITION_TOP_RIGHT,
      });

      setInterval(() => {
        window.location.reload(false);
      }, 2000);
    }

    console.log(e.target.files);
    setLength(e.target.files.length);
    setState(e.target.files);
  };

  const importAll = (r) => {
    return r.keys().map(r);
  };

  // useEffect(() => {
  //   setimgurl(["C33P1thinF_IMG_20150619_115740a_cell_162.png","C189P150ThinF_IMG_20151203_142224_cell_93.png"])
  //   for (var i = 0; i < imgurl.length; i++) {
  //     let data = "/"+imgurl[i]
  //     setimgurl(data)
  //   }
  //   console.log(imgurl)
  // })

  const upload = () => {
    setLoading(true);
    if (length > 15) {
      setLoading(false);
      toast.warn("Maximum of 15 files only can be selected !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    } else {
      toast.success(
        "Successfully Submitted Malaria Cells, AI will diagnose it for you  !",
        {
          position: toast.POSITION_TOP_RIGHT,
        }
      );
      setLoading(true);
      let data = state;
      const fd = new FormData();
      for (const k of data) {
        console.log(k);
        fd.append("images", k, k.name);
      }
      axios.post("https://hcare-backend.herokuapp.com/malaria", fd).then((response) => {
        setLoading(false);
        console.log(response.data.result);
        toast.success("Here are the diagnosed images!", {
          position: toast.POSITION_TOP_RIGHT,
        });

        // setInterval(() => {
        //   setImages(response.data.result);
        // }, 1000);
        let tmpArray = [];
        for (let i in response.data.result) {
          console.log(response.data.result[i]);
          tmpArray.push("https://hcare-backend.herokuapp.com/img/"+response.data.result[i])
        }
        console.log(tmpArray);
        setImages(tmpArray);

        setStared(true);

        // console.log(listImages[0])
      });
    }
  };

 
  const deleteimg = (index) => {
    const values = [...state];
    values.splice(index, 1);
    setState(values);
  };
  return (
    <div className="main">
      {loading ? (
        <div style={{ marginLeft: "550px", marginTop: "100px" }}>
          <ReactLoading
            type="bars"
            color="#C58121"
            height="350px"
            width="350px"
          />
          <h1 style={{ marginLeft: "80px", fontSize: "40px" }}>Diagnozing</h1>
        </div>
      ) : (
        <div>
          <div
            className="mainHeader"
            style={{ marginLeft: "-200px", marginBottom: "40px" }}
          >
            <h1>Malaria Disease Diagnosis</h1>
            <img
              src={mos}
              height={24}
              width={24}
              style={{ marginLeft: "950px" }}
            />
            <h3 style={{ marginLeft: "680px" }}>
              Please select the malaria cells to be diagnosed{" "}
            </h3>
          </div>
          <div className="strucbtn">
            <Button
              variant="contained"
              color="primary"
              component="label"
              disabled={loading}
              style={{ width: 300 }}
            >
              Select
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={fileSelectHandler}
                style={{ display: "none" }}
              />
            </Button>
          </div>
          <div className="strucbtn">
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={upload}
              style={{
                width: 300,
              }}
            >
              {/* {loading && <i className="fa fa-cog fa-spin"></i>}
             {loading && <span> Diagnozing </span>}
             {!loading && <span> Diagnoze </span>} */}
              Diagnoze
            </Button>
          </div>
          <div
            className="selection"
            
          >
            <h2 style={{ textAlign: "center" }}>Original Image Area</h2>
            {state &&
              [...state].map((file, index) => (
                <div
                  className="dimg"
                  key={index}
                  
                >
                  <img
                    src={URL.createObjectURL(file)}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteimg(index)}
                    style={{
                      width: 200,
                    }}
                  >
                    Delete
                  </Button>
                </div>
              ))}
          </div>
          <div
            className="selection"
          >
            <h2 style={{ textAlign: "center" }}>AI Diagnosis Area</h2>

            {listImages.map((image, index) => (
              <div
                className="dimg1"
                key={index}
                
              >
                <img
                  // src={require("../../Heart/Images" + image)}
                  src={image}
                  alt="info"
                  style={{
                    width: 200,
                    height: 200,
                  }}
                ></img>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PredictMalaria;
