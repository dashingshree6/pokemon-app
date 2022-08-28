import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "react-bootstrap/Pagination";
import Table from "./CardTable/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import uuid from "react-uuid";
// import Select from "react-select";

function App() {
  const [activePag, setActivePag] = useState(10) //Pagination
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([...data])
  const [pokType, setPokType] = useState([])
  const [searchPokemon, setSearchPokemon] = useState("")
  const [selectOptions, setSelectOptions] = useState([])
  // const [pagItems, setPagItems] = useState(10)
  const options = []
  for(let i=0;i<pokType.length; i++){
    let obj = {}
    obj["value"] = pokType[i]["name"]
    obj["label"] = pokType[i]["name"]
    options.push(obj)
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

  // const handleChange = selectOptions => {
  //   setSelectOptions({selectOptions})   
  // }
  const handleChange = (e) => {
    let options = e.target.options
    var value = []
    for(let i=0; i<options.length; i++){
      if(options[i].selected) {
        value.push(options[i].value)
      }
    }  
    setSelectOptions(value) 
    e.preventDefault()
    console.log(e)
  }

  const fetchPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0").then(res => res.json()).then(response => {
      setData(response.results);
      setFilteredData(response.results)
    }).catch(err => console.log(err))
  }

  const fetchPokemonType = () => {
    fetch("https://pokeapi.co/api/v2/type/").then(res => res.json()).then(response => setPokType(response.results)).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPokemons();
    fetchPokemonType();
  },[])

  const handlePagination = (num) => {
    setActivePag(num)
  }

  return (
    <div className="App">
      <h1 className='header'>POKEDEX</h1>
      <div className="search-data">
        <Row className="g-2">
          <Col md>
            <input 
              type="text" 
              className="pokemon" 
              placeholder="Type the pokemon name" 
              onChange={handlePokemonChange}
            />
          </Col>
          <Col md>
            <form>
              <select 
                multiple={true}
                name="selectOptions"
                onChange={(e) => handleChange(e)}
                value={selectOptions} 
                className="pokemon-sel">
                { pokType && pokType.map(i => (
                  <option key={i.name} value={i.name}>{i.name}</option>
                ))}
              </select>
            </form>
            {/* <Select
              isMulti={true}
              value={selectOptions}
              onChange={handleChange}
              options={options} 
            /> */}
            { selectOptions && selectOptions.map(item => (
              <span
                key={uuid()}
                style={{
                  backgroundColor: "magenta",
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
              >{item}</span>
            ))}
          </Col>
        </Row>
      </div>
      <div>
        <Table data={filteredData}/>
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
