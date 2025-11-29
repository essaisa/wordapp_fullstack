import Dashboard from "./components/layouts/Dashboard"
import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import Challenge from "./components/layouts/Challenge"
import { useState, useEffect } from "react"
import Reg from "./components/layouts/Reg"

import WORDS from './utils/VOCAB.json'

import { countdownIn24Hours, getWordByIndex, PLAN } from './utils'

function App() {

  // 0 == WELCOME, 1 == DASHBOARD, 2 == CHALLENGE

  const [selectedPage, setSelectedPage] = useState(3)
  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [datetime, setDatetime] = useState(null)
  const [history, setHistory] = useState({})
  const [attempts, setAttempts] = useState(0)

  function handleChangePage(pageIndex){
    setSelectedPage(pageIndex)
  }

  function handleCreateAccount() {
    if (!name) { return }
    localStorage.setItem('username', name)
    handleChangePage(1)
  }

  function handleCompleteDay() {
    const newDay = day + 1
    const newDatetime = Date.now()
    setDay(newDay)
    setDatetime(newDatetime)

    localStorage.setItem('day', JSON.stringify({
      day: newDay,
      datetime: newDatetime
    }))
    setSelectedPage(1)
  }

  function handleIncrementAttempts() {
    const newRecord = attempts + 1
    localStorage.setItem('attempts', newRecord)
    setAttempts(newRecord)
  }

  const daysWords = PLAN[day].map((idx) => {
    return getWordByIndex(WORDS, idx).word
  })

  useEffect(() => {
    // this callback is triggered on pageload due to [] in second arg
    if (!localStorage) { return } // if no exit to db, then exit callback function

    if (localStorage.getItem('username')) {
      // if we find something, then enter if block
      setName(localStorage.getItem('username'))
      // skip to dashboard
      setSelectedPage(1)
    }

    if (localStorage.getItem('day')) {
    // if we find something, then enter if block
      const {day: d, datetime: dt } = JSON.parse(localStorage.getItem('day'))
      setDay(d)
      setDatetime(dt)

      if (d > 1 && dt){
        const diff = countdownIn24Hours(dt)

        if (diff < 0){
          let newHistory = {...history}
          const timestamp = new Date(dt)
          console.log(timestamp)
          const formattedTimestamp = timestamp.toString().split(' ')
          .slice(1, 4).join(' ')

          newHistory[formattedTimestamp] = d
          setHistory(newHistory)
          setDay(1)
          setAttempts(1)

          localStorage.setItem('attempts', 0)
          localStorage.setItem('history', JSON.stringify(newHistory))
          localStorage.setItem('day', JSON.stringify({day: 1, datetime: null}))
        }
      }
    }

    if (localStorage.getItem('attempts')) {
    // if we find something, then enter if block
      setAttempts(parseInt(localStorage.getItem('attempts')))

    if (localStorage.getItem('history')) {
    // if we find something, then enter if block
      setHistory(JSON.parse(localStorage.getItem('history')))}

    }
  }, [])



  
  const pages = { 
    0: <Welcome name={name} setName={setName} handleCreateAccount={ handleCreateAccount }/>,
    1: <Dashboard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} handleChangePage={handleChangePage} daysWords={daysWords} datetime={datetime} />,
    2: <Challenge day={day} daysWords={daysWords} handleChangePage={handleChangePage} handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN} />,
    3: <Reg/>
  }

  return (
      <Layout> 
        {pages[selectedPage]}
      </Layout>
  )
}

export default App
