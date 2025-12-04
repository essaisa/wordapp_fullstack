import React, { useState } from 'react'

export default function Registration(props) {

    const { handleChangePage, name, setName } = props

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    
    const regCall = async (e) => {
        e.preventDefault();
        console.log("regCall triggered");
      
        try {
          const response = await fetch("http://localhost:5003/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
          });
      
          if (!response.ok){
            const data  = await response.json()
            setError(data.message)
            return
          }
          
          
          const data = await response.json();
          if (data.token){
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);
            setName(username)
            console.log("Saved token:", data.token);
            handleChangePage(1)
            console.log(Date.now())
          }
          
          
        } catch (err) {
          console.error(err);
        }
      };
      
      

  return (
    <div>
        <section id='reg'>
            <div>
                <div className='reg-text'>
                   <text>Welcome to...</text>
                   <h1 className="text-large special-shadow">WORD KNOWLEDGE</h1> 
                </div>
                <form className='reg-login' onSubmit={regCall}>
                    <label>Username</label>
                    {error && <p style={{color: "red"}}> {error} </p>}
                    <input 
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Password</label>
                    <input 
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='submit'>
                        <h6>Sign Up</h6>
                    </button>

                    
                </form>
            </div>
        </section>
      
    </div>
  )
}
