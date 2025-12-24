import { useState } from 'react'

export default function EditAccount({ handleChangePage }) {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:5003/auth/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({ username })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      // update localStorage so UI stays in sync
      localStorage.setItem('username', data.username)
      handleChangePage(1)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure? This cannot be undone.')) return
  
    await fetch('http://localhost:5003/auth/delete', {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
  
    localStorage.clear()
    handleChangePage(3) 
  }
  

  return (
    <section id='edit-account'>
      <button onClick={() => handleChangePage(1)}>Back</button>

      <h3>EDIT ACCOUNT</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Edit Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="New username"
        />
        <button type="submit">
          <h6>SAVE</h6>
        </button>
      </form>

      <h3>DELETE ACCOUNT</h3>
      <button onClick={handleDelete}>
        <h6>DELETE</h6>
      </button>
    </section>
  )
}

