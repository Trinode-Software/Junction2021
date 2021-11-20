import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import logo from './images/shield.svg'
import circle from './images/circle.svg'
import clock from './images/clock.svg'
import toggler from './images/toggler.svg'
import helvar from './images/helvar_logo.png'
import map from './images/map.svg'
import loader from './images/loader.svg'
import { Row, Col, Container } from "react-bootstrap"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Home from '@mui/icons-material/Home';
import Chart from "react-apexcharts";
import { useState, useEffect } from 'react'
import fluidOffice from './images/FluidOfficeLogo.svg'
import modal from './images/modal.png'
import card1 from './images/card1.png'
import card2 from './images/card2.png'
import card3 from './images/card3.png'
import card4 from './images/card4.png'
import square from './images/square.png'
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function App() {

  const [showContent, setShowContent] = useState(false)
  const [displayModal, setDisplayModal] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

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
          <Row className="px-3 py-3 text-gray text-center">
            <h5><b>Conference Room</b></h5>
          </Row>
          <Row className="px-4 justify-content-center">
            <img className="square" src={square} />
          </Row>
          <Row className="px-4">
            <p className="text-p pt-3 pb-2 mb-0"><b>This room is currently free!</b></p>
          </Row>
          <Row className="px-4 text-gray pt-2 pb-3">
            <div className="info">
              <p className="mb-1"><LocationOnIcon className="text-p" style={{fontSize:"20px", marginRight:"5px"}} />Left wing</p>
            </div>
            <div className="info-2">
              <p className="mb-1"><PersonIcon className="text-p" style={{fontSize:"20px", marginRight:"5px"}} />12</p>
            </div>
            <div className="info-3">
              <p className="mb-1"><ApartmentIcon  className="text-p"style={{fontSize:"20px", marginRight:"5px"}} />2nd floor</p>
            </div>
          </Row>
          <Row className="px-4 pb-2 text-gray">
            <h6><b>Description</b></h6>
            <p>Conference room is space with lots of natural light and lots of room for the users.</p>
          </Row>
          <ArrowBackIosIcon className="skadabang" onClick={()=>{setDisplayModal(false); setShowContent(true)}}/>
        </>
      }
      {showContent ?
      <div>
        <Row className="px-3 pt-4">
          <p className="mb-1 text-gray-light small">Hello Martin,</p>
        </Row>
        <Row className="px-3">
          <h4 className="text-p mb-1"><b>Let's find a room for you!</b></h4>
        </Row>
        <Row className="px-3 pt-2 text-gray small">
          <p><LocationOnIcon style={{fontSize:"15px", marginRight:"5px"}} /><b>Helvar's office</b></p>
          {/* <p className="text-gray very-small">Based on your current location. You can manage your location settings <span className="text-p">here.</span></p> */}
        </Row>
        <form className="form pb-4 px-3">
          <input type="text" className="form-submit" placeholder="Search for a room..."/>
          <button type="submit" className="btn btn-primary search">
              <SearchIcon />
          </button>
        </form>
        <Row className="px-3 pb-2 text-gray">
          <h6><b>Currently free</b></h6>
        </Row>
        <img src={card1} className="card-app-1" onClick={() => {setDisplayModal(true); setShowContent(false); setShowLoader(false)}} />
        <img src={card2} className="card-app-2" />
        <Row className="px-3 pb-2 pt-4 text-gray">
          <h6><b>Occupied</b></h6>
        </Row>
        <img src={card3} className="card-app-1"/>
        <img src={card4} className="card-app-2"/>
        <Row className="text-center text-p small pt-2 pb-4">
          <p><b>Show more rooms</b></p>
        </Row>
      </div>
      : 
      showLoader && 
      <div className="loader text-center">
        <div>
          <img src={fluidOffice} style={{marginTop: "-200px", marginBottom: "200px", height: "80px"}} />
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
