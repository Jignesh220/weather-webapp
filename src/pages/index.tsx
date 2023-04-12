import React from 'react'
import Home from '../components/Home/Home'
import '../styles/global.css'

export default function index() {
  return (
    <div>
      <Home/>
    </div>
  )
}

export const Head = () => {
  return <div>
  <title>Clime Forecast | Loading...</title>
  </div>
}