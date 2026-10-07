import { useState } from 'react'
import SchoolOfDesignLanding from "./components/Home"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SchoolOfDesignLanding />
      
    </>
  )
}

export default App
