import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import { useEffect, useState } from 'react';


function App() {

  const fields = ["principal", "interest", "tenure", "emi"];

  const [changeField, setChangeField] = useState("emi");
  const [principal, setPrincipal] = useState("10000");
  const [interest, setInterest] = useState("7");
  const [tenure, setTenure] = useState("240");
  const [emi, setEmi] = useState("");

  /*  calculate emi amount based on 
      p - principal
      R - Rate of interest per annum
      t - tenure in months
  */
  const calculateEmi = (p,R,t) => {
    let r = R/1200;
    return (p * (r) * ((1+r) ** t)) / ((1+r) ** t - 1);
  };

  const calculateTenure = () => {
    return 222;
  }

  const calculatePrincipal = (R, t, e) => {
    let r = R/1200;
    return ((e * ((1+r)**t) - 1)) / (r * (1+r)**t);
  }

  // const calculateInterest = (p, t, e) => {
  //   let r = R/1200;
  //   return ((e * ((1+r)**t) - 1)) / (r * (1+r)**t);
  // }

  const calculate = () => {
    let result;
    switch (changeField) {
      case "emi":
        result = calculateEmi(principal, interest, tenure);
        setEmi(result);
        break;
      case "principal":
        result = calculatePrincipal(interest, tenure, emi);
        setPrincipal(result);
        break;
      case "tenure":
        setTenure(calculateTenure(principal, interest, tenure));
        break;
    }
  };

  useEffect(() => {
    calculate();
  });

  return (
    <div className="App">
      <Box sx={{ padding: "2em" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Radio onChange={(value) => setChangeField("principal")} checked={changeField === fields[0]} value="" />
            <TextField disabled={changeField == "principal"} id="outlined-basic" label="Principal" step={"1000"} type="number" variant="outlined" value={principal} onChange={e => setPrincipal(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Radio onChange={(value) => setChangeField("interest")} checked={changeField === fields[1]} value="" />
            <TextField disabled={changeField == "interest"} id="outlined-basic" label="Interest" step={".25"} type="number" variant="outlined" value={interest} onChange={e => setInterest(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Radio onChange={(value) => setChangeField("tenure")} checked={changeField === fields[2]} value="" />
            <TextField disabled={changeField == "tenure"} id="outlined-basic" label="Tenure" type="number" variant="outlined" value={tenure} onChange={e => setTenure(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Radio onChange={(value) => setChangeField("emi")} checked={changeField === fields[3]} value="" />
            <TextField disabled={changeField == "emi"} id="outlined-basic" label="emi" type="number" variant="outlined" value={emi} onChange={e => setEmi(e.target.value)}/>
          </Grid>
        </Grid>
        {/* <Button variant='container'>Calculate</Button> */}
      </Box>
    </div>
  );
}

export default App;
