import React, { useState, useEffect } from "react";
import "./styles.css";
import CardItem from "../Card/Card";
import uuid from "react-uuid";

const Table = (props) => {
    const [colors, setColors] = useState([])
    const fetchColors = () => {
        fetch('https://pokeapi.co/api/v2/pokemon-color').then(res => res.json()).then(response => setColors(response.results)).catch(err => console.log(err))
      }
      useEffect(() => {
        fetchColors()
      },[])
    
  return (
    <div className='card-table'>
        { props.data && props.data.map(item => (
             <CardItem key={uuid()} itemData={item} colors={colors}/>
        ))}
    </div>
  )
}

export default Table;