import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { name: "Max", age: 28 },
      { name: "Manu", age: 29 },
      { name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    showPersons: false //if it is false, not show the person
  };

  nameChangedHandler = event => {
    this.setState({
      persons: [
        { name: "Max", age: 28 },
        { name: event.target.value, age: 29 },
        { name: "Stephanie", age: 27 }
      ]
    });
  };

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons]; //a new array with the objects from the old array [...]
    //Create a copy, change that & then update the state with setState
    persons.splice(personIndex, 1); //remove 1 element from array
    this.setState({ persons: persons }); //updating the state
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    //default showPersons false
    this.setState({ showPersons: !doesShow });
    //if doesShow is true it will set showPersons to false
    //if doesShow is false it will set showPersons to true
    //this gets merged with otherState
  };

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let persons = null; //default

    //below, if this.state.showPersons === true then { }

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
              />
            );
          })}
        </div>
      );
    }

    return (
      <div className='App'>
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button style={style} onClick={this.togglePersonHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}
export default App;
