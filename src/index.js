import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import * as BooksAPI from './BooksAPI'
import './index.css'

ReactDOM.render(
  <BrowserRouter><App/></BrowserRouter>
  , document.getElementById('root'))
