import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './app.scss'
import { nanoid } from 'nanoid'
import { Years } from './models/data'
import logo from './assets/Nobel_logo.svg'
import './styles/variables.scss';

// import json_laureates from './data/json_laureates.json'
// import json_award from './data/json_award.json'

function App() {

//   const [obj, setObj] = useState<Years[]>([])
//   const [whatYear, setWhatYear] = useState('1901')

//   const award = json_award
//   const laureates = json_laureates
 
//  console.log(award)




//   let yearWinners = award.filter(function (yearWinner) {
//     return yearWinner.awardYear === `${whatYear}`;
//   });

// let catagoryWinners = yearWinners.map(f => f.category.en)

// console.log(...catagoryWinners)
//   const displayYears = obj.map((f) => <option key={f.year}>{f.year}</option>)
 



 



 

// const createYears = () => {
//   let arr: Years[] = []
//   setObj(arr)
//   for (let i = 1901; i < 2020; i++){
//     let years = {
//       year: i
//     }
//     arr.push(years)
//   }
// }


// useEffect(() => {
//   createYears()
// }, [])

const [isActive, setIsActive] = useState(false);
const handleClick: (e:any) => void = (e:any) => {
  console.log(e)
  // 👇️ toggle
  setIsActive(current => !current);

  // 👇️ or set to true
  // setIsActive(true);
};

  return (
    <div className="app-container">

      <div className="hero-container">

        <div className="logo-container">
          <img className='logo' src={logo} alt="" />
        </div>
        <div className="info-container">

          <h1 className='info-h1'>THE NOBEL PRICE</h1>

          <p className='info-p'>In this app you can see data in different diagrams <br/> over the years. </p>

          <div className='info-select'>
            <h3>What do you want to know?</h3>
            <select className='select'>
              <option>Who won?</option>
            </select>
          </div>
          

        </div>
        <div className="year-container">
          <h1>1922</h1>       
        </div>

      </div>

      <div className="chart-container">

        <div className='tab-container'>

          <div className={isActive ? 'tab-one' : 'tab-active'} onClick={(e) => {handleClick(e)}}>
          
          LINE</div>
          <div className={isActive ? 'tab-one' : 'tab-active'} onClick={(e) => {handleClick(e)}}>
          
          LINE</div>

          <div className='tab-two'>BARS</div>
          <div className='tab-three'>CIRCLE</div>
          <div className='tab-four'>AREA</div>

        </div>

        <div className={isActive ? 'charts-active' : 'charts'}>go</div>
      </div>

      
    </div>
  )
}

export default App
