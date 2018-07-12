import React, { Component } from 'react';
import './App.css';

class Nav extends Component {
  render() {
    return(
     <div className="nav">
      <ul>
      <li><a className="active" href="#home">Pokemons</a></li>
      </ul>
     </div>
    )
  }
}
export default Nav;