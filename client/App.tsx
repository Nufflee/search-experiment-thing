import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Post from './Post'
import IndexPage from './IndexPage'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/:post' component={Post} />
        <Route exact path='/' component={IndexPage} />
      </div>
    </BrowserRouter>
  )
}

export default hot(App)
