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

function App() {

  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)}, 5000);
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
      {showContent ?
      <div>
        <div className="header pb-3 pt-2 justify-content-center">
          <h2 className="text-header pt-2">SecureHome</h2>
        </div>
        <img src={logo} className="image"/>
        <Row className="text-center pb-3 minus-p">
          <h1>19:14</h1>
        </Row>
        <Row className="text-center text-success minus-p">
          <p><span><img className="circle blink" src={circle} /></span><b>You are at home</b></p>
        </Row>
        <Row className="px-4">
          <p className="mb-2"><b>Notifications</b></p>
        </Row>
        <Container className="info-container mb-3">
          <Row className="px-3 py-2">
            <Col xs={3}>
              <CheckCircleOutlineIcon style={{fontSize:"27px"}} className="text-success"/>
            </Col>
            <Col xs={9}>
              All equipment is working 
            </Col>
          </Row>
        </Container>
        <Row className="px-4">
          <p className="mb-2"><b>History data</b></p>
        </Row>
        <Container className="info-container mb-3">
          <Row className="pt-3 px-3">
            <Col xs={6}>
              <p>Last updated</p>
            </Col>
            <Col xs={6} className="text-end">
              <h5>19:14</h5>
            </Col>
          </Row>
          <Row className="pt-2 px-3">
            <Col xs={6}>
              <p>Last movement</p>
            </Col>
            <Col xs={6} className="text-end">
              <h5>19:14</h5>
            </Col>
          </Row>
          <div className="mixed-chart">
            <Chart options={options} series={series} type="line" width="300" />
          </div>
        </Container>
        <Row className="px-4">
          <p className="mb-2"><b>Your rooms</b></p>
        </Row>
        <Row className="px-3"> 
          <div className="active-room mb-2">
            <div className="half">
              Kitchen
            </div>
            <div className="other-half">
              <img className="circle-room blink" src={circle} />
              <div style={{display:"inline-block"}} className="text-success small">Active now</div>
            </div>
          </div> 
        </Row>
        <Row className="px-3"> 
          <div className="active-room mb-2">
            <div className="half">
              Bathroom
            </div>
            <div className="other-half">
              <img className="circle-room blink" src={circle} />
              <div style={{display:"inline-block"}} className="text-success small">Active now</div>
            </div>
          </div> 
        </Row>
        <Row className="px-3"> 
          <div className="room mb-2">
            <div className="half">
              Livingroom
            </div>
            <div className="other-half">
              <div className="text-room small">Active 14min ago</div>
            </div>
          </div> 
        </Row>
        <Row className="px-3"> 
          <div className="room mb-2">
            <div className="half">
              Corridor
            </div>
            <div className="other-half">
              <div className="text-room small">Active 18min ago</div>
            </div>
          </div> 
        </Row>
        <Row className="px-3"> 
          <div className="room mb-2">
            <div className="half">
              Bedroom 1
            </div>
            <div className="other-half">
              <div className="text-room small">Active 1h ago</div>
            </div>
          </div> 
        </Row>
        <Row className="px-3"> 
          <div className="room mb-3">
            <div className="half">
              Bedroom 2
            </div>
            <div className="other-half">
              <div className="text-room small">Active 11h ago</div>
            </div>
          </div> 
        </Row>
        <Row className="px-4">
          <p className="mb-2"><b>Set timer</b></p>
        </Row>
        <Container className="info-container mb-4">
          <Row className="px-3 py-4">
            <Col xs={6}>
              Active clock
            </Col>
            <Col xs={6} className="text-end">
              <img className="toggler" src={toggler} />
            </Col>
          </Row>
          <Row className="px-3 pb-3">
            <Col xs={6}>
              <Row className="text-center">
                <h6>Starting time</h6>
              </Row>
              <Row className="px-3 text-center">
                <h1>11:00</h1>
              </Row>
            </Col>
            <Col xs={6}>
              <Row className="text-center">
                <h6>Ending time</h6>
              </Row>
              <Row className="text-center">
                <h1>17:00</h1>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center pb-3">
            <img className="clock" src={clock} />
          </Row>
        </Container>
        <Row className="px-4">
          <p className="mb-2"><b>See nodes on the map</b></p>
        </Row>
        <Container className="info-container mb-4">
          <Row className="px-3">
            <p className="pt-3 mb-1">Click a node to see more information</p>
          </Row>
          <Row className="px-3 pb-3">
            <img className="map" src={map} />
          </Row>
        </Container>
      </div>
      : 
      <div className="loader text-center">
        <div className="pb-5 mb-3">
          <img className="rotating loader-holder" src={loader} />
        </div>
        <div className="pb-2">
          <h6>Powered by:</h6>
        </div>
        <div>
          <img className="helvar-logo" src={helvar} />
        </div>
      </div>
      }
    </div>
  );
}

export default App;
