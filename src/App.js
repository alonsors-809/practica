// Router
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Componentes
import Login from './Login'
import Reports from './Reports'
import Register from './Register'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/Reports" component={Reports} />
          <Route path="/Register" component={Register} />
        </div>
      </Router>
    )
  }
}

export default App