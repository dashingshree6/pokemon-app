import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "react-bootstrap/Pagination";
import Table from "./CardTable/Table";

function App() {
  const [activePag, setActivePag] = useState(10) //Pagination
  const [data, setData] = useState([])
  const [pagItems, setPagItems] = useState(10)

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0').then(res => res.json()).then(response => setData(response.results)).catch(err => console.log(err))
  }
  useEffect(() => {
    fetchPokemons()
  },[])

  const handlePagination = (num) => {
    setActivePag(num)
  }

  return (
    <div className="App">
      <h1 className='header'>POKEDEX</h1>
      <div>
        <Table data={data}/>
      </div>
      <div className='pagination'>
        <Pagination className='pagn'>
          <Pagination.Item key='10' active={activePag === 10} onClick={() => handlePagination(10)}>10</Pagination.Item>
          <Pagination.Item key='20' active={activePag === 20} onClick={() => handlePagination(20)}>20</Pagination.Item>
          <Pagination.Item key='50' active={activePag === 50} onClick={() => handlePagination(50)}>50</Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
}

export default App;
