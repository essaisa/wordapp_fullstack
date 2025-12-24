import { useEffect, useState } from 'react'

export default function Leaderboard({ handleChangePage }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  // fetch leaderboard from backend
  useEffect(() => {
    fetch('http://localhost:5003/leaderboard', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data)
        setFiltered(data)
      })
  }, [])

  // handle search input
  useEffect(() => {
    if (!search) {
      setFiltered(leaderboard)
    } else {
      const lower = search.toLowerCase()
      const filteredData = leaderboard.filter(u =>
        u.username.toLowerCase().includes(lower)
      )
      setFiltered(filteredData)
    }
  }, [search, leaderboard])

  return (
    <section id='leaderboard'>
      <button onClick={() => handleChangePage(1)}>Back</button>

      <h3>Leaderboard</h3>
      <input
        type='text'
        placeholder='Search by username...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />

      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, index) => (
              <tr key={user.username}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
