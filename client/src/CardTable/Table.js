import React from "react";
import "./styles.css";
import CardItem from "../Card/Card";
import uuid from "react-uuid";

const Table = (props) => {
  return (
    <div className='card-table'>
      { props.data && props.data.map(item => (
        <CardItem key={uuid()} itemData={item}/>
      ))}
    </div>
  )
}

export default Table;