import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectPage from './pages/ProjectPage';
import TaskPage from './pages/TaskPage';
// Import other pages as needed

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/projects" component={ProjectPage} />
        <Route path="/tasks" component={TaskPage} />
        {/* Add other routes as needed */}
      </Switch>
    </div>
  );
}

export default App;
