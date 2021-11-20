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
import axios from 'axios'

function App() {

  const [showContent, setShowContent] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date(2021, 7, 22, 19, 58, 20, 0))
  // const [currentTime, setCurrentTime] = useState("2021-07-22 19:58:20.233518")
  const [data, setData] = useState({})
  const [timeseries, setTimeseries] = useState([])

  const toDateString = (date) => {
    const toTwoDigit = (string) => {
      return string.toString().length === 1 ? '0' + string : string
    }

    return `${date.getFullYear()}-${toTwoDigit(date.getMonth())}-${toTwoDigit(date.getDate())} ${toTwoDigit(date.getHours())}:${toTwoDigit(date.getMinutes())}:20.233518`
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)}, 3000);
  }, []);

  const getEventAmount = async (currenttime) => {
    return (await axios.post('https://helvar-api.herokuapp.com/realtime_rooms', {
      site: "site_1",
      currenttime,
      timespan: "3600"
    })).data.data.count
  }

  useEffect(async () => {
    setData((await axios.post('https://helvar-api.herokuapp.com/realtime_rooms', {
      site: "site_1",
      currenttime: toDateString(currentTime)
    })).data.data.count)
    Promise.all([
      getEventAmount(toDateString(new Date(currentTime.getTime() - (24*60*60*1000)))),
      getEventAmount(toDateString(new Date(currentTime.getTime() - (2*24*60*60*1000)))),
      getEventAmount(toDateString(new Date(currentTime.getTime() - (3*24*60*60*1000)))),
      getEventAmount(toDateString(new Date(currentTime.getTime() - (4*24*60*60*1000))))
    ]).then(function (results) {
      setTimeseries([
        Object.values(results[0]).reduce( (a,b) => a+b, 0),
        Object.values(results[1]).reduce( (a,b) => a+b, 0),
        Object.values(results[2]).reduce( (a,b) => a+b, 0),
        Object.values(results[3]).reduce( (a,b) => a+b, 0)
      ])
    })
  }, [])

  const options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: [`${currentTime.getHours()-4}:00`, `${currentTime.getHours()-3}:00`, `${currentTime.getHours()-2}:00`, `${currentTime.getHours()-1}:00`],
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
      data: timeseries
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
          <h1>{currentTime.getHours() + ':' + currentTime.getMinutes()}</h1>
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
              <h5>{currentTime.getHours() + ':' + currentTime.getMinutes()}</h5>
            </Col>
          </Row>
          <div className="mixed-chart">
            <Chart options={options} series={series} type="line" width="300" />
          </div>
        </Container>
        <Row className="px-4">
          <p className="mb-2"><b>Your rooms</b></p>
        </Row>
        <Room name='Workspace East' id={0} active={data && data["0"] && data["0"] > 0} />
        <Room name='Workspace South' id={1} active={data && data["1"] && data["1"] > 0} />
        <Room name='Human Resources' id={2} active={data && data["2"] && data["2"] > 0} />
        <Room name='Grouproom "Tokyo"' id={3} active={data && data["3"] && data["3"] > 0} />
        <Room name='Grouproom "Berlin"' id={4} active={data && data["4"] && data["4"] > 0} />
        <Room name='Marketing' id={5} active={data && data["5"] && data["5"] > 0} />
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
