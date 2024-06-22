import React, {useState} from 'react'
import './app.css'
import Editor from './editor'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
  <div className='app'>
      <header className='app-header'>
        <Editor />
       </header>
  </div>
  )
}

export default App
