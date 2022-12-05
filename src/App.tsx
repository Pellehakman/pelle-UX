import { useState, useEffect, SetStateAction } from 'react'
import './app.scss'
import { Years, Gender } from './models/data'
import logo from './assets/Nobel_logo.svg'
import './styles/variables.scss';
import json_laureates from './data/json_laureates.json'
import json_award from './data/json_award.json'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, RadialLinearScale } from 'chart.js';
import { Line, Doughnut, Bar, PolarArea } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
  
);

function App() {
  const [obj, setObj] = useState<Years[]>([])
  const [displayYear, setDisplayYear] = useState<string>('1901')
  const [toggleState, setToggleState] = useState(1);
  const [question, setQuestion] = useState<string>('category')
  const [yearsData, setYearsData ] = useState([])
  const [genderData, setGenderData ] = useState([])
  const [categoryData, setCategoryData ] = useState([])
  const award = json_award
  const laureates = json_laureates
  const [overlay, setOverlay] = useState<boolean>(false);

  const [chartData, setChartData ] = useState<Object[]>([])

  const [whatAnimation, setWhatAnimation] = useState<string>('fadeIn')
  // console.log(Object.values(chartData))


   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        
      },
    },
  };
  
  const labels = Object.keys(chartData)

 
   const data = {
    labels,
    datasets: [
      {
        
        data: (Object.values(chartData)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        
        borderWidth: 1,

        
      },
      
      
    ],
    
  };
  


// TOGGLE TAB
const toggleTab = (index: SetStateAction<number>) => {setToggleState(index)}

// Fitler and get all awards with specific year 
let yearWinners = award.filter((yearWinner) => {
  return yearWinner.awardYear === `${displayYear}`;
});

// if "laureates" exists
let laureatesWinners = yearWinners.filter((f) => {
  if(f.hasOwnProperty('laureates')){
    return (f.laureates?.map(v => v.id));
  }
});

//find all laureates who won in a year
let ChemistryYear = laureatesWinners.filter((f) => {
  if (f.category.en === 'Chemistry'){
    return (f.laureates?.map(v => v.id))
  } 
})
let LiteratureYear = laureatesWinners.filter((f) => {
  if (f.category.en === 'Literature'){
    return (f.laureates?.map(v => v.id))
  } 
})
let PeaceYear = laureatesWinners.filter((f) => {
  if (f.category.en === 'Peace'){
    return (f.laureates?.map(v => v.id))
  } 
})
let PhysicsYear = laureatesWinners.filter((f) => {
  if (f.category.en === 'Physics'){
    return (f.laureates?.map(v => v.id))
  } 
})
let PhysiologyorMedicineYear = laureatesWinners.filter((f) => {
  if (f.category.en === 'Physiology or Medicine'){
    return (f.laureates?.map(v => v.id))
  } 
})
let EconomicSciencesYear = laureatesWinners.filter((f) => {
  if (f.category.en === 'Economic Sciences'){
    return (f.laureates?.map(v => v.id))
  } 
})


// FIND ALL GENDER
let maleGender = laureates.filter((f) => {
  if (f.gender === 'male'){
  return (f.gender)
  }});
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



//---------------- ALL OBJECTS WITH DATA //---------------- //

let winnerByYear = {
  Chemistry: ChemistryYear.map(f => f.laureates?.map(v => v.id))[0]?.length,
  Literature: LiteratureYear.map(f => f.laureates?.map(v => v.id))[0]?.length,
  Peace: PeaceYear.map(f => f.laureates?.map(v => v.id))[0]?.length,
  Physics: PhysicsYear.map(f => f.laureates?.map(v => v.id))[0]?.length,
  ['Physiology or Medicine']: PhysiologyorMedicineYear.map(f => f.laureates?.map(v => v.id))[0]?.length,
  ['Economic and Sciences']: EconomicSciencesYear.map(f => f.laureates?.map(v => v.id))[0]?.length,
}
let winStatistics:any = {
  Chemistry: Chemistry.length,
  Literature: Literature.length,
  ['Physiology or Medicine']: PhysiologyorMedicine.length, 
  Physics: Physics.length,
  Peace: Peace.length,
  ['Economic and Sciences']: EconomicSciences.length
}
let totalGender:any = {
  totalFemale: femaleGender.length,
  totalMale: maleGender.length
}





// WHAT TO SHOW AND NOT SHOW
const displayData = () => {
  if (question === 'year'){
    setChartData(winnerByYear)
    setYearsData(laureatesWinners)
    setGenderData([])
    setCategoryData([])
    setOverlay(true)
  } if (question === 'gender'){
    setChartData(totalGender)
    setGenderData(totalGender)
    setCategoryData([])
    setYearsData([])
    setOverlay(false)
  } if (question === 'category'){
    setChartData(winStatistics)
    setCategoryData(winStatistics)
    setGenderData([])
    setYearsData([])
    setOverlay(false)
  } 
}
// USE EFFECTS
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
              <option value="category">Nobel Prizes by Catagory?</option>
              <option value="year">Nobel Prizes by Year?</option>
              <option value="gender">Nobel Prizes by Gender?</option>
            </select>
            </div>
            {overlay && 
              <div className='info-q1 year'>
            <h3 className='info-h3 '>What Year?</h3>

            <select className='select' onChange={(e) => setDisplayYear(e.currentTarget.value)}>
              {obj.map((f) => <option key={f.year}>{f.year}</option>)}
            </select>
            </div>
            }
            
          </div>
          
        </div>
        <div className="year-container">
          <h1 className="display-year">{displayYear}</h1>
          
          </div>
        </div>

        <div className='tab-container'>
        
      <div className="bloc-tabs">
        <button className={toggleState === 1 ? "tabs tab1 active-tabs" : "tabs tab1"} onClick={() => toggleTab(1)}>BARS</button>
        <button className={toggleState === 2 ? "tabs tab2 active-tabs" : "tabs tab2"} onClick={() => toggleTab(2)}>CIRCLE</button>
        <button className={toggleState === 3 ? "tabs tab3 active-tabs" : "tabs tab3"} onClick={() => toggleTab(3)}>LINE </button>
        <button className={toggleState === 4 ? "tabs tab4 active-tabs" : "tabs tab4"} onClick={() => toggleTab(4)}>AREA</button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content tab1 active-content" : "content"}>
        <h2 className="content-title">BARS</h2>

        <div className={`${whatAnimation}`}>
        <Bar options={options} data={data}/>
            
            
        </div>
  
        </div>

        <div className={toggleState === 2 ? "content tab2 active-content" : "content"}>
        <h2 className="content-title">CIRCLE</h2>
        <div className="canvass">
          <div className={`${whatAnimation}`}>
              <Doughnut data={data} />
              
          </div>
        </div>
        
        </div>

        <div className={toggleState === 3 ? "content tab3 active-content" : "content"} >
        <h2 className="content-title">LINE</h2>
        <div className={`${whatAnimation}`}>
        <Line options={options} data={data} />
            
        </div>
        </div>

        <div className={toggleState === 4 ? "content tab4 active-content" : "content"} >
        <h2 className="content-title">AREA</h2>
        <div className={`${whatAnimation}`}>
        <PolarArea data={data} />
            
        </div>
        </div>
        
      </div>
      <div className="animation-container">
        <p>animation style</p>
          <form className="animation-form" onChange={(e) => setWhatAnimation(e.target.value)}>
        
        <div className="animation-input-container">
          
          <input type="radio" id="fadeIn" name="fadeIn" value="fadeIn"/>
          <label htmlFor="fadeIn">FADE IN</label>
          
        </div>
          
        <div className="animation-input-container">
          <input type="radio" id="slideIn" name="fadeIn" value="slideIn"/>
          <label htmlFor="slideIn">SLIDE IN</label>
          
          
          
        </div>

        </form>
        
        
      </div>
    </div>
         
        

        </div>

        
     

      
   
  )
}

export default App
