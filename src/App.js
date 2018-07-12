import React, { Component } from 'react';
import './App.css';
import Nav from './nav.js';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      status: "initial",
      next: "https://pokeapi.co/api/v2/pokemon/",
      prev: null,
    };
  }

  loadNext() {
    this.loadData(this.state.next);
  }

  loadPrev() {
    this.loadData(this.state.prev);
  }

  loadData(url) {
    this.setState({status: "loading"});
    fetch(url)
    .then(data => data.json())
    .then(rcv => {
      this.setState({
        pokemons: rcv.results,
        prev: rcv.previous,
        next: rcv.next,
        status: "success"
      });
    })
    .catch(error => {
      this.setState({status: error.message});
    });
  }

  componentDidMount() {
    this.loadNext();
  }
  
  render() {
    if(this.state.status === "loading" || this.state.status === "initial") {
      return <h1>loading...</h1>;
    }
    else if(this.state.status==="success") {
      return (
        <div className="App">
          <Nav/>
          <button onClick={this.loadPrev.bind(this)}>Previous</button>
          <button onClick={this.loadNext.bind(this)}>Next</button>
          <div>
            {this.state.pokemons.map((pokemon) => {
              let pokemonName = pokemon.name.toString().toLowerCase();
              let pokeName = pokemon.name.toUpperCase();
              return (
                <div key={pokemon.name}> 
                  <div className="card">
                    <img src={`/assets/pokemons/${pokemonName}.jpg`} />
                    <h1 className="user">{pokeName}</h1> 
                    <a className="user" href={pokemon.url}>types</a> 
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    else {
      return <h1>There has been a problem with your fetch operation: {this.state.status}</h1>;
    }
  }

 
}

export default App;
