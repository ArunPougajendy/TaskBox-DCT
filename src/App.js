import React, { Component } from 'react';
import AddTasks from './tasks-components/add-task'

class App extends Component {
  render() {
    return (
      <div>
        <h2> Hello React </h2>
        <AddTasks />
      </div>
    );
  }
}

export default App;
