import Dashboard from "./components/layouts/Dashboard"
import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import Challenge from "./components/layouts/Challenge"
import { useState, useEffect } from "react"
import Reg from "./components/layouts/Reg"
import Log from "./components/layouts/Log"
import Leaderboard from "./components/layouts/Leaderboard"
import EditAccount from "./components/layouts/EditAccount"


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
  const [error, setError] = useState("")

  function handleChangePage(pageIndex){
    setSelectedPage(pageIndex)
  }

  function handleLogOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('username');
    localStorage.removeItem('attempts')
  }

  function handleCreateAccount() {
    if (!name) { return }
    localStorage.setItem('username', name)
    handleChangePage(1)
  }

  const handleCompleteDay = async () => {
    const newDay = day + 1
    const newDatetime = Date.now()
    setDay(newDay)
    setDatetime(newDatetime)

    const response = await fetch("http://localhost:5003/progress/day", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ day: newDay, datetime: newDatetime })
    })
    setSelectedPage(1)
  }

  const handleIncrementAttempts = async () => {
    const newRecord = attempts + 1;
    setAttempts(newRecord);
    localStorage.setItem('attempts', newRecord);
  
    const token = localStorage.getItem("token");
    
    try {
      await fetch("http://localhost:5003/attempts/rec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ attempts: newRecord }),
      });
    } catch (err) {
      console.error("Failed to update attempts:", err);
    }
  }
  
  const daysWords = PLAN[day].map((idx) => {
    return getWordByIndex(WORDS, idx).word
  })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    const fetchData = async () => {
      try {

        const userRes = await fetch("http://localhost:5003/personal/name", {
          headers: { "Authorization": token },
        });
        if (userRes.ok) {
          const user = await userRes.json();
          setName(user.username);
          setSelectedPage(1);
        }
  

        let attemptsRes = await fetch("http://localhost:5003/attempts/rec", {
          headers: { "Authorization": token },
        });
        
        let attemptsData = { attemptNo: 0 };
        
        if (attemptsRes.ok) {
          const data = await attemptsRes.json();
          attemptsData = data?.attemptNo !== undefined ? data : { attemptNo: 0 };
        }
        setAttempts(attemptsData.attemptNo);
        
        
  

        let progressRes = await fetch("http://localhost:5003/progress/day", {
          headers: { "Authorization": token },
        });
        let progressData = { day: 1, datetime: null };
        if (progressRes.ok) {
          const data = await progressRes.json();
          progressData = data.day !== undefined ? data : progressData;
        }
        setDay(progressData.day);
        setDatetime(Number(progressData.datetime));
        console.log(progressData.datetime);
        

        
        if (progressData.day > 1 && progressData.datetime) {
          const diff = countdownIn24Hours(Number(progressData.datetime) * -1 );
          if (diff < 0) {
            console.log("Failed challenge");
            let newHistory = { ...(history || {}) };
            const timestamp = new Date(Number(progressData.datetime));
            const formattedTimestamp = timestamp.toString().split(" ").slice(1, 4).join(" ");
            newHistory[formattedTimestamp] = progressData.day;
  
            setHistory(newHistory);
            console.log(newHistory)
            setDay(1);
            setDatetime(null);
            setAttempts(0);
  
            await fetch("http://localhost:5003/progress/day", {
              method: "POST",
              headers: {
                "Authorization": token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ day: 1, datetime: null }),
            });
  
            await fetch("http://localhost:5003/history/rec", {
              method: "POST",
              headers: {
                "Authorization": token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ historyRec: newHistory }),
            });
  
            await fetch("http://localhost:5003/attempts/rec", {
              method: "POST",
              headers: {
                "Authorization": token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ attempts: 0 }),
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);
  



  
  const pages = { 
    0: <Welcome name={name} setName={setName} handleCreateAccount={ handleCreateAccount }/>,
    1: <Dashboard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} handleChangePage={handleChangePage} daysWords={daysWords} datetime={datetime}  handleLogOut={handleLogOut} />,
    2: <Challenge day={day} daysWords={daysWords} handleChangePage={handleChangePage} handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN} />,
    3: <Reg name={name} setName={setName} handleChangePage={handleChangePage} />,
    4: <Log name={name} setName={setName} handleChangePage={handleChangePage}/>,
    5: <Leaderboard handleChangePage={handleChangePage} />,
    6: <EditAccount handleChangePage={handleChangePage}/>
    
  }

  return (
      <Layout> 
        {pages[selectedPage]}
      </Layout>
  )
}

export default App
