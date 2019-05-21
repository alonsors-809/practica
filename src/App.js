// Router
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Componentes
import Login from './Login'
import Reports from './Reports'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/Reports" component={Reports} />
        </div>
      </Router>
    )
  }
}

export default App