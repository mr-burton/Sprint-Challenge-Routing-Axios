import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(response => this.setState({smurfs: response.data}))
  }

  gatherData() {
    axios.get('http://localhost:3333/smurfs')
      .then(response => this.setState({smurfs: response.data}))
  }

  updtaeData() {
    this.setState({ Smurfs: Smurfs }) 
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value }, { [e.target.age]: e.target.value }, { [e.target.height]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    let newSmurf = {
      name: this.state.name,
      age: this.state.age,
      height: this.state.height
    }
    axios.post('http://localhost:3333/smurfs', newSmurf)
      .then(response => {
        let newSmurfArray = response.data.slice();
        this.setState({
          smurfs: newSmurfArray,
          name: "",
          age: 0,
          height: ""
        });
      });
  }


  render() {
    return (
      <div className="App">
        {/* <Header /> 
        <SmurfForm /> */}
        <Route exact path="/" component={Header}  />
        <Route path="/SmurfForm" component={SmurfForm} />
        <Smurfs smurfs={this.state.smurfs} />
        {/* <button onClick={() => { this.deleteSmurf(Smurfs.id) }}>X</button> */}
      </div>
    );
  }
}

export default App;
