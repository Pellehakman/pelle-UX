import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import json_laureates from './data/json_laureates.json'
import json_award from './data/json_award.json'
import { nanoid } from 'nanoid'

import { Years } from './models/data'


function App() {

  const [obj, setObj] = useState<Years[]>()

 



  const award = json_award
  const laureates = json_laureates



 



useEffect(() => {
  let arr: Years[] = []
  setObj(arr)
  for (let i = 1901; i <= 2022; i++){
    let years = {
      year: i
    }
    arr.push(years)
  }
}, [])
 

const gold = obj.map((f) => <option key={f.year}>{f.year}</option>)


  return (
    <div className="App">
   
        
<select>
{gold}
</select>
        
  
    </div>
  )
}

export default App
