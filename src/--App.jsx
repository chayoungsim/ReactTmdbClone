
import './App.css'
import { useState} from 'react'
import Header from './components/Header.jsx'
import Profile from './components/Profile.jsx'
import Footer from './components/Footer.jsx'  
import TodoInput from './components/TodoInput.jsx'
import Weather from './components/Weather.jsx'



function App() {
    const [count, setCount] = useState(0)
  
   
  return (
    <>
      <Header />
      <main>
        <Profile name="홍길동" hobby="코딩" age={25} />
        <div>
            <p> 현재숫지 {count}</p>
            <button type="button" onClick={() => setCount(count+1)}>+1증가</button>
            <button type="button" onClick={() => setCount(count-1)}>-1감소</button>
        </div>
        <Weather />    
        <TodoInput />
        
      </main>
      <Footer />
    </>
  )
}

export default App
