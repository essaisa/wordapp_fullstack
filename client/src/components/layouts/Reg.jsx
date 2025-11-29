import React, { useState } from 'react'

export default function Registration() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    
    const regCall = async () => {
        console.log("regCall fired!");
        try {
          const response = await fetch('http://localhost:5003/auth/register', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
          });

          const data = await response.json();

          if (data.token){
            const token = data.token
            console.log("Token:", token)
            setIsAuthenticated(true)
          }
          console.log(data);

        } catch (error) {
          console.error(error);
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
