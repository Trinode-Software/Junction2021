import circle from '../images/circle.svg'
import { Row, Col, Container } from "react-bootstrap"

const Room = (props) => {
    const {name, active, id} = props
    return (
      <Row className="px-3"> 
        <div className={`${active ? 'active-' : ''}room mb-2`}>
          <div className="half">
            {name}
          </div>
            { active ? 
              <div className="other-half">
                  <img className="circle-room blink" src={circle} />
                  <div style={{display:"inline-block"}} className="text-success small">Active now</div>
              </div> :
              <div className="other-half">
                  <div className="text-room small">Active {Math.floor((Math.random() * 50)+10)} min ago</div>
              </div>
              }
        </div> 
      </Row>
    )
}

export default Room