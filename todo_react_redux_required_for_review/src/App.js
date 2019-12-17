import React from 'react';

import Header from "./components/header";
import TaskBar from "./components/taskbar";
import TaskList from "./components/taskList";

class App extends React.Component {
  render() {
    return (

      <div className="container" >
        <Header />
        <TaskBar />

        <TaskList />
      </div>

    )
  }

}
export default App;
