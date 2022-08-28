import React, { useState, useEffect} from "react";
import "./styles.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Chart } from "react-google-charts";
import uuid from "react-uuid";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const CardItem = (props) => {
  var id = props.itemData.url.slice(-2,-1)
  const [pokData, setPokData] = useState({})
  var random = Math.floor(Math.random() * 10)
  var bgs = ["gray","maroon","purple","olive","navy","teal","brown","darkred","dimgrey","peru"]
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()).then(response => {setPokData(response)}).catch(err => console.log(err))
  }
  useEffect(() => {
    fetchPokemon()
  },[])

  const data= pokData.stats && [
    ["", "HP", "ATTACK","DEFENSE","SPECIAL-ATTACK","SPECIAL-DEFENSE"],
    ["BASE STAT", 
      pokData["stats"][0]["base_stat"],
      pokData["stats"][1]["base_stat"],
      pokData["stats"][2]["base_stat"],
      pokData["stats"][3]["base_stat"],
      pokData["stats"][4]["base_stat"],
    ]
  ];

  return (
    <Card className='card'>
      {pokData.id &&
            <div className="card-sec">
              <div className="card-left">                    
                <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
                <Card.Body>
                  <Card.Title className="title">{(pokData.name).toUpperCase()}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush"> 
                  <ListGroup.Item><button onClick={handleShow} className="details">DETAILS</button></ListGroup.Item>
                </ListGroup>
              </div>
              <div className="card-right">
                {/* <Card> */}
                <Card.Header>TYPE :  {pokData.types.map(item => (
                  <span
                    key={uuid()}
                    style={{
                      backgroundColor: `${bgs && bgs[random]}`,
                      color: "#fff",
                      fontWeight: "lighter",
                      padding: "2px",
                      paddingLeft: "4px",
                      paddingRight: "4px",
                      fontFamily: "cursive",
                      margin: "1px",
                      fontSize: "10px",
                      borderRadius: "15px"
                    }}
                  >{(item.type.name).toUpperCase()}</span>
                ))}</Card.Header>
                <Card.Header>STATS</Card.Header>
                {/* <Card.Body> */}
                <Chart
                  chartType="Bar"
                  width="20rem"
                  //   height="100%"
                  height="max-content"
                  data={data}
                />
                {/* </Card.Body> */}
                {/* </Card> */}

                <>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>{(pokData.name.toUpperCase())}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ListGroup.Item className='item' variant="warning">HEIGHT : {pokData.height}</ListGroup.Item>
                      <ListGroup.Item className='item' variant="info">WEIGHT : {pokData.weight}</ListGroup.Item>
                      <ListGroup.Item className='item' variant="success">BASE EXPERIENCE : {pokData.base_experience}</ListGroup.Item>
                      <ListGroup.Item className='item'>
                        <Image roundedCircle={true} src={pokData.sprites && pokData.sprites.front_shiny}/>
                        <Image roundedCircle={true} src={pokData.sprites && pokData.sprites.back_default}/>
                        <Image roundedCircle={true} src={pokData.sprites && pokData.sprites.back_shiny}/>
                      </ListGroup.Item>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </div>
            </div>
      }
    </Card>
  )
}

export default CardItem;