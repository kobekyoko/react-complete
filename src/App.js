import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "asfa1", name: "Max", age: 28 },
      { id: "vasdf1", name: "Manu", age: 29 },
      { id: "asdf11", name: "Stephanie", age: 26 }
    ],
    otherState: "some other value",
    showPersons: false //if it is false, not show the person
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //above = creating a new JS object, using spread operator

    // const person = Object.assign({}, tis.state.persons[personIndex])
    //above = alternative solution without using spread operator

    //default JS method: Object.assign({}, the object you want to copy) the first object is empty, the second object is the object you want to copy

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
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
    let persons = null; //default
    let btnClass = "";

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
                key={person.id}
                changed={event => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );

      btnClass = "Red";
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push("red"); // classes array = ['red']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push("bold"); //classes array = ['red', 'bold']
    }

    return (
      <div className='App'>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(" ")}>This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonHandler}>
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}
export default App;
