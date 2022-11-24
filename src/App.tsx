import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import json_laureates from './data/json_laureates.json'
import json_award from './data/json_award.json'

function App() {
const [year, setYear] = useState([])
console.log(year)
  const award = json_award
  // console.log(award)

  const laureates = json_laureates
  // console.log(laureates)
// let arr = []
// for ( let counter = 1901; counter <= 2022; counter++ ) {
// console.log(`The number is ${counter}`); 



function test() {
  const years = [];

  for (let counter = 1901; counter <= 2022; counter++ ) {
    years.push(counter);
      // super_array.push(sub_array.slice(0));
  }
  console.log(years);


}



  return (
    <div className="App">

      <button onClick={test}>shit</button>
<select>
  {/* {awardYear} */}
</select>

      
        
    </div>
  )
}

export default App
