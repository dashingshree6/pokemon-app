import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "react-bootstrap/Pagination";
import Table from "./CardTable/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { setLoadingOn, setLoadingOff } from "./slice";
import uuid from "react-uuid";

function App() {
  const cards = useSelector((state) => state.collection.cards)
  const loading = useSelector((state) => state.collection.loading)
  const dispatch = useDispatch()
  const [activePag, setActivePag] = useState(10) 
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [pokType, setPokType] = useState([])
  const [searchPokemon, setSearchPokemon] = useState("")
  const [tags, setTags] = useState([])
  const [filterTypeData, setFilterTypeData] = useState(false)
  const [initialAPICall, setInitialAPICall] = useState(true)
  var bgs = ["gray","maroon","purple","olive","navy","teal","brown","darkred","dimgrey","peru"]

  console.log(cards, pokType)

  const handleTag = (e) => {
    let value = e.target.value
    let arr = []
    arr.push(value)
    let array = [...tags, ...arr ]
    let filArr = array.filter((item,index) => array.indexOf(item) === index)
    setTags([...filArr])
    console.log(filArr)
  }


  const handlePokemonChange = (e) => {
    let value = e.target.value
    setSearchPokemon(value)
    var pokemons = data.slice(0)
    if(value) {
      if(data.length){
        let filteredData = pokemons.filter(i => i.name.includes(value))
        setFilteredData(filteredData)
      }
    } else {
      setFilteredData(pokemons)
    }
    console.log(searchPokemon)
  }

  const handleTagFilter = () => {
    dispatch(setLoadingOn())
    var arr = []
    tags.length && tags.map(tag => (
      fetch(`https://pokeapi.co/api/v2/type/${tag}`)
        .then(res => res.json())
        .then(response => {
          response.pokemon.map((i,k) => k<10 && arr.push(i["pokemon"]))
          dispatch(setLoadingOff())
          console.log("REPONSE",response.pokemon)
        }).catch(err => {
          console.log(err)
          dispatch(setLoadingOff())
        })
    ))
    setFilteredData(arr)
    setFilterTypeData(false)
  }

  const fetchPokemons = () => {
    dispatch(setLoadingOn())
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${activePag}&offset=0`).then(res => res.json()).then(response => {
      setData(response.results);
      setFilteredData(response.results)
      dispatch(setLoadingOff())
    }).catch(err => {
      console.log(err);
      dispatch(setLoadingOff())
    })
  }

  const fetchPokemonType = () => {
    dispatch(setLoadingOn())
    fetch("https://pokeapi.co/api/v2/type/")
      .then(res => res.json())
      .then(response => {
        setPokType(response.results);
        dispatch(setLoadingOff())
      }).catch(err => {
        console.log(err)
        dispatch(setLoadingOff())
      })  
  }

  useEffect(() => {
    if (initialAPICall) {
      fetchPokemons();
      fetchPokemonType();
    }  
    if (filterTypeData) {
      handleTagFilter();
    } 
  },[filterTypeData, initialAPICall, activePag])

  const handlePagination = (num) => {
    setActivePag(num)
  }

  return (
    <div 
      className="App"
      style={{
        opacity: `${loading ? 0.3 : 1}`
      }}
    >
      <h1 className='header'>POKEDEX</h1>
      <div className="search-data">
        <Row className="g-2">
          <Col md>
            <h2>Filter by name :</h2>
            <input 
              type="text" 
              className="pokemon" 
              placeholder="Type the pokemon name" 
              onChange={handlePokemonChange}
            /><br/>
        
            <h2>Filter by type :</h2>
            <select className="pokemon"onChange={handleTag}>
              {pokType.length && pokType.map(i => (
                <option key={i.name} value={i.name}>{i.name}</option>
              ))}
            </select>
            <button className="search" 
              onClick={() => {
                setInitialAPICall(false)
                setFilterTypeData(true)
              }}>Search</button>
            <button className="filter" 
              onClick={() => {
                setTags([]);
                setInitialAPICall(true)
                setFilterTypeData(false)
                setFilteredData(data)
              }}
            >Clear filters</button><br/><br/>
            {tags.length ? tags.map(i => (
              <span
                key={uuid()}
                style={{
                  backgroundColor: `${bgs && bgs[Math.floor(Math.random() * 10)]}`,
                  color: "#fff",
                  fontWeight: "lighter",
                  padding: "5px",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                  fontFamily: "cursive",
                  margin: "1px",
                  fontSize: "15px",
                  borderRadius: "15px",
                }}
              >{i}   
              </span>
            )) : <h4>No filters selected</h4>}
          </Col>
        </Row>
      </div>
      <div>
        { loading ? 
          <div className="loading"><Spinner animation="border" variant="dark" /> </div>
          :
          <Table data={filteredData}/>
        } 
      </div>
      <div className='pagination'>
        <Pagination className='pagn'>
          <Pagination.Item key='10' active={activePag === 10} onClick={() => handlePagination(10)}>10</Pagination.Item>
          <Pagination.Item key='15' active={activePag === 15} onClick={() => handlePagination(15)}>15</Pagination.Item>
          <Pagination.Item key='20' active={activePag === 20} onClick={() => handlePagination(20)}>20</Pagination.Item>
        </Pagination>
      </div>
    </div>
  );
}

export default App;
