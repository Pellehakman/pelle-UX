import { useState, useEffect, SetStateAction } from 'react'
import reactLogo from './assets/react.svg'
import './app.scss'
import { nanoid } from 'nanoid'
import { Years } from './models/data'
import logo from './assets/Nobel_logo.svg'
import './styles/variables.scss';

import json_laureates from './data/json_laureates.json'
import json_award from './data/json_award.json'

// 1.Antalet pristagare inom de olika kategorierna, för ett valt år. 
// 2. med möjlighet att välja årtal på ett användarvänligt sätt
// 3. Fördelningen mellan män och kvinnor bland pristagare (cirkeldiagram)
// 4. Hur många gånger som Nobelpriset delats ut, inom varje kategori




function App() {
  const [obj, setObj] = useState<Years[]>([])
  const [displayYear, setDisplayYear] = useState<string>("1901")

  const award = json_award
  const laureates = json_laureates
 

  let yearWinners = award.filter( (yearWinner) => {
    return yearWinner.awardYear === `${displayYear}`;
  });

// let catagoryWinners = yearWinners.map(f => f.category.en)


let laureatesWinners = yearWinners.map((f) => {
  if(f.hasOwnProperty('laureates')){
    return (<div key={f.category.en}> in {f.category.en} this year, there was {f.laureates.map(r => r.id).length} winner</div>)
  } 
})


//find all male only
let maleGender = laureates.filter((f) => {
  if (f.gender === 'male'){
  return (f.gender)
  }
});
let totalMale = maleGender.length

//find all female only
let femaleGender = laureates.filter((f) => {
  if (f.gender === 'female'){
  return (f.gender)
  }
});
let totalFemale = femaleGender.length





let allPrizes = laureates.map(f => f.nobelPrizes.map(g => g.category))


let hej = allPrizes.map((f) => {
  if (f.map(r => r.en === 'Chemistry')){ 
    return (f.map(r => r.en))

  } else {
    return ('wjo')
  }
})

console.log(hej)










const createYears = () => {
  let arr: Years[] = []
  setObj(arr)
  for (let i = 1901; i < 2020; i++){
    let years = {
      year: i
    }
    arr.push(years)
  }
}

useEffect(() => {
  createYears()
 
}, [])

const [toggleState, setToggleState] = useState(1);

const toggleTab = (index: SetStateAction<number>) => {
  setToggleState(index);
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
            <div className='info-q1'>
            <h3>What do you want to know?</h3>
            <select className='select'>
              <option>Who won?</option>
            </select>
            </div>


            <div className='info-q1'>
            <h3>What Year?</h3>
            <select className='select' onChange={(e) => setDisplayYear(e.currentTarget.value)}>
              {obj.map((f) => <option key={f.year}>{f.year}</option>)}
            </select>
            </div>
            

           
          </div>
          

        </div>
        <div className="year-container">
          <h1>{displayYear}</h1>  
              
        </div>

      </div>

      

        <div className='tab-container'>
        

      <div className="bloc-tabs">
        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>BARS</button>
        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>CIRCLE</button>
        <button className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>LINE </button>
        <button className={toggleState === 4 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(4)}>AREA</button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <h2>BARS</h2>
          {laureatesWinners}
          
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <h2>CIRCLE</h2>
          there is a total of {totalFemale} female winners <br/>
          and a total of {totalMale} male winners
          
         
        </div>

        <div className={toggleState === 3 ? "content  active-content" : "content"} >
          <h2>LINE</h2>
          
        </div>
        <div className={toggleState === 4 ? "content  active-content" : "content"} >
          <h2>AREA</h2>
          
        </div>
        
      </div>
    </div>
         
        

        </div>

        
     

      
   
  )
}

export default App
