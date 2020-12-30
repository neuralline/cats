import React from 'react'
import ReactDOM from 'react-dom'
import Cats from './App'
import { StoreProvider } from './context/Provider'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Cats />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
