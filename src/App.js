import React, { Component } from 'react';
import './App.css';

import Dashboard from './Screens/Dashboard'

class App extends Component {

  constructor(props){
    super(props)

    this.state={
      categories:[
        {
          name:'Solid Waste',
          image:require("./Images/solid.png")
        },
        {
          name:'Liquid Waste',
          image:require("./Images/liquid.jpg")
        },
        {
          name:'Organic Waste',
          image:require("./Images/organic.jpg")
        },
        {
          name:'Hazardous Waste',
          image:require("./Images/hazardous.jpg")
        },
      ],
    }
  } 

  render() {
    const { categories } = this.state;

    return (
      <div className="App">
        <Dashboard categories={categories} />
      </div>
    );
  }
}

export default App;
