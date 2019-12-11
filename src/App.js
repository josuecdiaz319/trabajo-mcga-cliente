import React from 'react';
import logo from './logo.svg';
import './App.css';

import ItemList from './components/ItemList'

class App extends React.Component {
  constructor()
  {
    super()
    this.state =
    {
      items: {}
    }
  }

  

  componentDidMount()
  {

  }

  render()
  {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
          <ItemList/>
      </div>
    );  
  }

   createItem(itemname, description)
   {

   }

   deleteTask(itemname)
   {

   }

   modify(itemname, description)
   {

   }
}

export default App;
