import React, { Component, useState, useRef, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import '../Assets/Style/heart.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Alert from "../components/alert";
import ReactLoading from "react-loading";

toast.configure();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://aarthif-nawaz.github.io/">
        Aarthif Nawaz
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    marginLeft: "700px",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    float: "left",
    width: "100%", // Fix IE 11 issue.
    marginLeft: "20px",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  select: {
    marginTop: theme.spacing(2),
  },
}));

function Form(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [sel, setSel] = useState("Select For Prediction");
  const [age, setAge] = useState();
  const [sex, setSex] = useState();
  const [cp, setCP] = useState();
  const [trestbps, settrestbps] = useState();
  const [chol, setchol] = useState();
  const [fbs, setFbs] = useState();
  const [restecg, setrestecg] = useState();
  const [thalach, setthalach] = useState();
  const [exang, setexang] = useState();
  const [oldpeak, setoldpeak] = useState();
  const [slope, setSlope] = useState();
  const [ca, setca] = useState();
  const [thal, setthal] = useState();
  let output;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      age === null ||
      sex === null ||
      cp === null ||
      trestbps === null ||
      chol === null ||
      fbs === null ||
      restecg === null ||
      thalach === null ||
      exang === null ||
      oldpeak === null ||
      slope === null ||
      ca === null ||
      thal === null
    ) {
      toast.warn("Please Fill In All The Fields !", {
        position: toast.POSITION_TOP_RIGHT,
      });
    } else {
      const heartDiseases = {
        age: age,
        sex: sex,
        cp: cp,
        trestbps: trestbps,
        chol: chol,
        fbs: fbs,
        restecg: restecg,
        thalach: thalach,
        exang: exang,
        oldpeak: oldpeak,
        slope: slope,
        ca: ca,
        thal: thal,
      };

      const options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      axios
        .post("https://hcare-backend.herokuapp.com/heartDisease", heartDiseases, options)
        .then((response) => {
          setLoading(false);
          console.log(response.data.result);
          if (response.data.result == "Heart Disease") {
            toast.error("We regret to inform you but you have been diagnosed with Heart Disease :(", {
              position: toast.POSITION_TOP_RIGHT,
            });
          } else if (response.data.result == "No Heart Disease") {
            toast.success("Congratulations, We are Happy to inform you that you have no heart diseases ;) ", {
              position: toast.POSITION_TOP_RIGHT,
            });
          }
        })
        .catch((e) => {
          console.log(e)
        });
    }
  };

  return (
    <Container maxWidth="xl" className="Heartform">
      <CssBaseline />
      {loading ? (
        <div style={{ marginLeft: "550px", marginTop: "100px" }}>
          <ReactLoading
            type="bars"
            color="#C58121"
            height="350px"
            width="350px"
          />
          <h1 style={{ marginLeft: "80px",fontSize:"40px" }}>Analyzing</h1>
        </div>
      ) : (
        <div>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FavoriteBorderIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "20px", marginLeft: "600px" }}
            >
              Heart Disease Diagnosis
            </Typography>
            <form className="heartForm" onSubmit={handleSubmit}>
              <Grid
                component={Paper}
                elevation={10}
                style={{ paddingLeft: "20px" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="age"
                      label="Age"
                      name="age"
                      type="number"
                      defaultValue={age}
                      onChange={(e) => setAge(e.target.value)}
                      autoComplete="63"
                      autoFocus
                      helperText="Enter Age"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      className={classes.select}
                    >
                      Sex
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required-label"
                      helperText="Enter Sex"
                      value={sex}
                      required
                      fullWidth
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <MenuItem value={0}>Female</MenuItem>
                      <MenuItem value={1}>Male</MenuItem>
                    </Select>
                    <FormHelperText>Select Sex</FormHelperText>
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      className={classes.select}
                    >
                      CP
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required-label"
                      value={cp}
                      required
                      fullWidth
                      onChange={(e) => setCP(e.target.value)}
                    >
                      <MenuItem value={0}>Normal</MenuItem>
                      <MenuItem value={1}>Small Pain</MenuItem>
                      <MenuItem value={2}>Intense Pain</MenuItem>
                      <MenuItem value={3}>Very Intense Pain</MenuItem>
                    </Select>
                    <FormHelperText>Select CP</FormHelperText>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      name="trestbps"
                      label="Trestbps"
                      type="number"
                      id="trestbps"
                      defaultValue={trestbps}
                      onChange={(e) => settrestbps(e.target.value)}
                      autoComplete="145"
                      helperText="Enter Trestbps"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      name="chol"
                      label="Cholestrol"
                      type="number"
                      id="chol"
                      defaultValue={chol}
                      onChange={(e) => setchol(e.target.value)}
                      autoComplete="233"
                      helperText="Enter Cholestrol"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      className={classes.select}
                    >
                      FBS
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required-label"
                      value={fbs}
                      required
                      fullWidth
                      onChange={(e) => setFbs(e.target.value)}
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                    </Select>
                    <FormHelperText>Select FBS</FormHelperText>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={10} sm={3}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      className={classes.select}
                    >
                      REST ECG
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required-label"
                      value={restecg}
                      required
                      fullWidth
                      onChange={(e) => setrestecg(e.target.value)}
                    >
                      <MenuItem value={0}>Normal</MenuItem>
                      <MenuItem value={1}>ST-T Wave Abnormailty</MenuItem>
                      <MenuItem value={2}>
                        probable or definite left ventricular hypertrophy
                      </MenuItem>
                    </Select>
                    <FormHelperText>Select Rest ECG</FormHelperText>
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      name="thalac"
                      label="Thalach"
                      type="number"
                      id="thalac"
                      defaultValue={thalach}
                      onChange={(e) => setthalach(e.target.value)}
                      autoComplete="150"
                      helperText="Enter Thalach"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      className={classes.select}
                    >
                      Exang
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required-label"
                      value={exang}
                      required
                      fullWidth
                      onChange={(e) => setexang(e.target.value)}
                    >
                      <MenuItem value={0}>No</MenuItem>
                      <MenuItem value={1}>Yes</MenuItem>
                    </Select>
                    <FormHelperText>Select EXang</FormHelperText>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      name="oldpeak"
                      label="OldPeak"
                      type="number"
                      id="oldpeak"
                      defaultValue={oldpeak}
                      onChange={(e) => setoldpeak(e.target.value)}
                      autoComplete="2.3"
                      helperText="Enter Old Peak"
                    />
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      className={classes.select}
                    >
                      Slope
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required-label"
                      value={slope}
                      required
                      fullWidth
                      onChange={(e) => setSlope(e.target.value)}
                    >
                      <MenuItem value={0}>Upsloping</MenuItem>
                      <MenuItem value={1}>Flat</MenuItem>
                      <MenuItem value={2}>Downsloping</MenuItem>
                    </Select>
                    <FormHelperText>Select Slope</FormHelperText>
                  </Grid>
                  <Grid item xs={10} sm={3}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      name="ca"
                      label="CA"
                      type="number"
                      id="ca"
                      defaultValue={ca}
                      onChange={(e) => setca(e.target.value)}
                      autoComplete="145"
                      helperText="Enter CA"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel
                      id="demo-simple-select-required-label"
                      className={classes.select}
                    >
                      Thal
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-required-label"
                      id="demo-simple-select-required-label"
                      value={thal}
                      required
                      fullWidth
                      onChange={(e) => setthal(e.target.value)}
                    >
                      <MenuItem value={1}>Normal</MenuItem>
                      <MenuItem value={2}>Fixed Defect</MenuItem>
                      <MenuItem value={3}>Reversable Defect</MenuItem>
                    </Select>
                    <FormHelperText>Select Thal</FormHelperText>
                  </Grid>
                </Grid>
                <Button
                id="btn"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={handleSubmit}
                  style={{ width: "250px", marginLeft: "30px", height: "40px",marginBottom:"40px" }}
                  className="submitbtn"
                >
                  {/* {loading && <i className="fa fa-cog fa-spin"></i>}
                  {loading && <span> Analyzing </span>}
                  {!loading && <span> Analyze </span>} */}
                  Analyze
                </Button>
              </Grid>
            </form>
            {/* <div className="heartForm1">
              <Grid
                component={Paper}
                elevation={10}
                style={{ paddingLeft: "20px" }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <h2 className="predh1"
                    
                    >
                      {sel}
                    </h2>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <h2 className="predh2"
                    >
                      {prediction}
                    </h2>
                  </Grid>
                </Grid>
              </Grid>
            </div> */}
          </div>
        </div>
      )}
    </Container>
  );
}
export default Form;
