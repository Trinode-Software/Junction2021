import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import logo from './images/shield.svg'
import circle from './images/circle.svg'
import clock from './images/clock.svg'
import toggler from './images/toggler.svg'
import helvar from './images/helvar_logo.svg'
import map from './images/map.svg'
import loader from './images/loader.svg'
import { Row, Col, Container } from "react-bootstrap"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Home from '@mui/icons-material/Home';
import Chart from "react-apexcharts";
import { useState, useEffect } from 'react'
import Room from './components/room'
import fluidOffice from './images/FluidOfficeLogo.svg'
import room1 from './images/room1.png'
import room2 from './images/room2.png'
import room3 from './images/room3.png'
import modal from './images/modal.png'

function App() {

  const [showContent, setShowContent] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)}, 3000);
  }, []);

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: ["16:00", "17:00", "18:00", "19:00"],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        gradientToColors: ["#de00f2", "#7716de"], 
        stops: [0, 50, 100]
      },
    },
  }

  const series = [
    {
      name: "series-1",
      data: [30, 12, 0, 4]
    }
  ]
  return (
    <div className="App">
      {displayModal && 
        <>
          <div className="w-100 h-100 bg-dark" style={{position: "fixed", top: "0", left: "0", opacity: "0.5"}}></div>
          <div className="w-100 mt-5 text-center" style={{position: "fixed", top: "0", left: "0"}}>
            <img src={modal} style={{borderRadius: "20px", width: "90%", margin: "auto"}} />
          </div>
        </>
      }
      {showContent ?
      <div className="text-center">
        <div>
          <img src={fluidOffice} style={{height: "80px"}} className="mb-5 mt-2" />
        </div>
        <img src={room1} className="w-100" onClick={() => setDisplayModal(true)} />
        <img src={room2} className="w-100" />
        <img src={room3} className="w-100" />
      </div>
      : 
      <div className="loader text-center">
        <div>
          <img src={fluidOffice} style={{marginTop: "-170px", marginBottom: "200px", height: "80px"}} />
        </div>
        <div className="pb-5 mb-3">
          <img className="rotating loader-holder" src={loader} />
        </div>
        <div className="text-dark">
          <h6>Powered by:</h6>
        </div>
        <div className="text-dark text-large">
          {/* <img className="helvar-logo" src={helvar} /> */}
          <h1 style={{fontSize: "46px"}}>Helvar</h1>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
