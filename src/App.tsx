import { useState, useEffect, SetStateAction } from 'react'
import reactLogo from './assets/react.svg'
import './app.scss'
import { nanoid } from 'nanoid'
import { Years, Gender } from './models/data'
import logo from './assets/Nobel_logo.svg'
import './styles/variables.scss';
import json_laureates from './data/json_laureates.json'
import json_award from './data/json_award.json'
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
 
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';




// 1.Antalet pristagare inom de olika kategorierna, för ett valt år. 
// 2. med möjlighet att välja årtal på ett användarvänligt sätt
// 3. Fördelningen mellan män och kvinnor bland pristagare (cirkeldiagram)
// 4. Hur många gånger som Nobelpriset delats ut, inom varje kategori




function App() {
  const [obj, setObj] = useState<Years[]>([])
  const [displayYear, setDisplayYear] = useState<string>('1901')
  const [toggleState, setToggleState] = useState(1);
  const [question, setQuestion] = useState<string>('year')
  const [yearsData, setYearsData ] = useState([])
  const [genderData, setGenderData ] = useState([])
  const [categoryData, setCategoryData ] = useState([])
  const award = json_award
  const laureates = json_laureates

  const [overlay, setOverlay] = useState<boolean>(false);
  


  const toggleTab = (index: SetStateAction<number>) => {setToggleState(index);};
  
  let yearWinners = award.filter( (yearWinner) => {
    return yearWinner.awardYear === `${displayYear}`;
  });

let laureatesWinners:any = yearWinners.map((f) => {
  if(f.hasOwnProperty('laureates')){
    return (<div key={f.category.en}> in {f.category.en} this year, there was {f.laureates?.map(r => r.id).length} winner</div>)
  } else {
    return
  }
})

//find all male only
let maleGender = laureates.filter((f) => {
  if (f.gender === 'male'){
  return (f.gender)
  }});

//find all female only
let femaleGender = laureates.filter((f) => {
  if (f.gender === 'female'){
  return (f.gender)
  }});

// FIND TOTAL WINS IN ALL CATEGORYS
let prices:any = laureates.map(f => f.nobelPrizes.map(v => v.category.en)[0])
let Chemistry = prices.filter((f: string) => {
  if (f === 'Chemistry'){
    return (f)}});

let Literature = prices.filter((f: string) => {
  if (f === 'Literature'){
    return (f)}});

let Peace = prices.filter((f: string) => {
  if (f === 'Peace'){
    return (f)}});

let Physics = prices.filter((f: string) => {
  if (f === 'Physics'){
    return (f)}});

let PhysiologyorMedicine = prices.filter((f: string) => {
  if (f === 'Physiology or Medicine'){
    return (f)}});

let EconomicSciences = prices.filter((f: string) => {
  if (f === 'Economic Sciences'){
    return (f)}});

// CREATING ALL YEARS OF NOBEL PRIZES
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
let winStatistics:any = {
  totatLiterature: Literature.length,
  totalChemistry: Chemistry.length,
  totalPhysiologyorMedicine: PhysiologyorMedicine.length, 
  totalPhysics: Physics.length,
  totalPeace: Peace.length,
  totalEconomicSciences: EconomicSciences.length
}
let totalGender:any = {
  totalFemale: femaleGender.length,
  totalMale: maleGender.length
}
const displayData = () => {
  if (question === 'year'){
    setYearsData(laureatesWinners)
    setGenderData([])
    setCategoryData([])
    setOverlay(true)
  } if (question === 'gender'){
    setGenderData(totalGender)
    setCategoryData([])
    setYearsData([])
    setOverlay(false)
  } if (question === 'category'){
    setCategoryData(winStatistics)
    setGenderData([])
    setYearsData([])
    setOverlay(false)
  } 
}
useEffect(()=> {
  createYears() 
}, [])

useEffect(()=> {
  displayData()
}, [question, displayYear])

  return (
    <div className="app-container">
      <div className="hero-container">
        <div className="logo-container">
          <img className='logo' src={logo} alt="" />
        </div>
        <div className="info-container">
          <h1 className='info-h1'>THE NOBEL PRICE</h1>
          <p className='info-p'>In this app you can see data in different diagrams over the years. </p>

          <div className='info-select'>
            <div className='info-q1'>
            <h3 className='info-h3'>What do you want to know?</h3>
            <select className='select' onChange={(e) => setQuestion(e.currentTarget.value)}>
              <option value="year">Nobel Prizes by Year?</option>
              <option value="gender">Nobel Prizes by Gender?</option>
              <option value="category">Nobel Prizes by Catagory?</option>
            </select>
            </div>
            {overlay && 
              <div className='info-q1'>
            <h3 className='info-h3'>What Year?</h3>

            <select className='select' onChange={(e) => setDisplayYear(e.currentTarget.value)}>
              {obj.map((f) => <option key={f.year}>{f.year}</option>)}
            </select>
            </div>
            }
            
          </div>
          
        </div>
        <div className="year-container"><h1>{displayYear}</h1></div>
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
          {yearsData}
          {genderData.totalMale}
          {categoryData.totatLiterature}
          
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <h2>CIRCLE</h2>
          {yearsData}
          {genderData.totalMale}
          {genderData.totalFemale}
          {categoryData.totatLiterature}
        </div>

        <div className={toggleState === 3 ? "content  active-content" : "content"} >
          <h2>LINE</h2>
          {yearsData}
          {genderData.totalMale}
          {categoryData.totatLiterature}
        </div>

        <div className={toggleState === 4 ? "content  active-content" : "content"} >
          <h2>AREA</h2>
          {yearsData}
          {genderData.totalMale}
          {categoryData.totatLiterature}
        </div>
        
      </div>
    </div>
         
        

        </div>

        
     

      
   
  )
}

export default App
