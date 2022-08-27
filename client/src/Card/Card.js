import React, { useState, useEffect} from "react";
import "./styles.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const CardItem = (props) => {
    var id = props.itemData.url.slice(-2,-1)
    const [pokData, setPokData] = useState({})
    var random = Math.floor(Math.random() * 20)

    const fetchPokemon = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()).then(response => {setPokData(response)}).catch(err => console.log(err))
      }
      useEffect(() => {
        fetchPokemon()
      },[])

    return (
        <Card className='card'>
            {pokData.id &&
            <> 
            <Card.Img variant="top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
            <Card.Body>
                <Card.Title className="title">{(pokData.name).toUpperCase()}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">               
                <ListGroup.Item> {pokData.types.map(item => (
                      <span
                      style={{
                          backgroundColor: `${props.colors[random]["name"]}`
                      }}
                      >{item.type.name}</span>
                ))}</ListGroup.Item>
                <ListGroup.Item><button className="details">DETAILS</button></ListGroup.Item>
            </ListGroup>
            </>
            }
      </Card>
    )
}

export default CardItem;