/* 
Nombre: index.js
Funcionalidad: Punto de entrada principal de la aplicación React.
*/

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

/*
Funcionalidad: Renderiza la aplicación React en el elemento HTML con el ID 'root'.
Entradas: Ninguna.
Salidas: La aplicación React se renderiza en el elemento 'root' del DOM.
*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
