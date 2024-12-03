import Button from 'react-bootstrap/Button';
import  {useEffect, useState}  from 'react';
import {Howl} from 'howler';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';

// clock assests  
const bellStart =  new Howl ({
  src: ['/media/startBell.mp3'], 
});

const bellStop = new Howl({
  src: ['/media/stopBell.mp3'],
})

//media
function App() {
const[isRunning, setIsRunning] = useState(false);
const[timeMin, setTimeMin] = useState(25);
const[timeSec, setTimeSec] = useState(0);
const[onBreak, setOnBreak] = useState(false);
const[workInterval, setWorkInterval] = useState(0);
const[breakInvterval, setBreakInterval] = useState(0);
const[showSettings, setShowSettings] = useState(false);

const handleShowSettings = () => setShowSettings(true);
const handleCloseSettings = () => setShowSettings(false);


useEffect(() => {
  if(isRunning){
    const intervalPom = setInterval(() => {
      if(timeSec > 0){
        setTimeSec((timeSec) => timeSec - 1);
      }
      if(timeSec === 0){
        setTimeMin((timeMin) => timeMin - 1);
        setTimeSec(59);
      }
      if(timeSec === 0 && timeMin === 0){
        bellStart.stop();
        setTimeMin(0);
        setTimeSec(0);
        bellStop.play();

        if(!onBreak){
          setWorkInterval((workInterval) => workInterval + 1);
          setOnBreak(true);
          setIsRunning(false);

          if(workInterval % 4 === 0){
            setTimeMin(10);
          }
          else{
            setTimeMin(5);
          }
        }

        if(onBreak){
          setBreakInterval((breakInvterval) => breakInvterval + 1);
          setTimeMin(25);
          setOnBreak(false);
          setIsRunning(false);
        }
      }
    }, 1000)
    return () => clearInterval(intervalPom);
    }
  }, [isRunning, timeMin, timeSec])

  const startTimer = () => {
    bellStart.play();
    setIsRunning(true);
  }
  const pauseTimer = () => {
    bellStart.pause();
    setIsRunning(false);
  }
  const resetTimer = () =>{
    bellStart.stop();
    setIsRunning(false);
    setTimeMin(25);
    setTimeSec(0);
  }
  const decreasetimer = () =>{
    if(timeMin > 0){
      setTimeMin((timeMin) => timeMin - 1);
    }
  }
  const increaseTimer = () => {
    if(timeMin < 100){
      setTimeMin((timeMin) => timeMin + 1);
    }
  }
  
  //rendered jsx
  return (
    <div className='container d-flex justify-content-center align-items-center flex-direction-column'>
       <div className="d-flex align-items-center flex-column">
        <div className='Timer py-4 my-2'>
          <Card bg='dark' style={{ width: '40rem'}}>
            <h2 className='display-1 align-self-center'>{timeMin}:{timeSec < 10 ? "0" + timeSec : timeSec}</h2>
            <Card.Body>
              <Card.Text>
            <div className='intervalsCounter tracker d-flex justify-content-center'>
              <img src='./Lofiicon.png'></img> <h3>{workInterval} Break Interval: {breakInvterval}</h3>  
            </div>
            </Card.Text>>
            </Card.Body>
            </Card>
        </div>
        </div>
    <div className='buttons-container d-flex justify-content-center'>
            <Button variant="primary" size='lg' onClick={startTimer}>Start</Button>
            <Button variant='dark' size='lg' onClick={resetTimer}>Reset</Button>
            <Button variant='dark' size='lg' onClick={pauseTimer}>Pause</Button>
            <Button variant='dark' size='lg' onClick={handleShowSettings}>⚙️</Button>
          </div>

      
      <Modal show={showSettings} onHide={handleCloseSettings} centered>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
          <div className='form-group'></div>
      
        
            <Form>
              <Form.Group as={Row}  className='pomodoro mb-3 align-items-center' controlId='pomodoro-timer'>
                <Form.Label column sm={2}>Pomodoro</Form.Label>
                <Col sm={4}>
                <Form.Control type='number' size='lg' value={timeMin} min='0' max='100' onChange={(e) => setTimeMin(Number(e.target.value))}>
                </Form.Control>
                <Form.Text>Minutes</Form.Text>
                </Col>

                <Form.Label column sm={2}>Short Break</Form.Label>
                <Col sm={4}>
                <Form.Control type='number' size='lg' value={onBreak} min='0' max='100' onChange={(e) => setOnBreak(Number(e.target.value))}>
                </Form.Control>
                <Form.Text>Minutes</Form.Text>
                </Col>

              {/* long break form  */}
                  <Form.Label column sm={2}>Long Break</Form.Label>
                  <Col sm={4}>
                  <Form.Control type='number' size='lg' value={timeMin} min='0' max='100' onChange={(e) => setTimeMin(Number(e.target.value))}>
                  </Form.Control>
                  <Form.Text>minutes</Form.Text>
                  </Col>
                </Form.Group> 
                
            </Form>
            </Modal.Body>
         
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseSettings}>Close</Button>
          <Button variant='danger' onClick={() => setOnBreak(5) + setTimeMin(25)}>Reset</Button>
          <Button variant='success' onClick={handleCloseSettings}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  
}

export default App;