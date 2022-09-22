import { useState } from 'react'
import Header from './components/header/index'
import './App.css'
import ImageTest from './components/imageTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <Header></Header>
        <ImageTest></ImageTest>
      </div>
    </div>
  )
}

export default App
