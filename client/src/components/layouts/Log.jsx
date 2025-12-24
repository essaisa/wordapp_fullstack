import React, { useState } from 'react'

export default function Log(props) {

const { handleChangePage, name, setName } = props

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    
    const LogCall = async (e) => {
        e.preventDefault();
        console.log("regCall triggered");
      
        try {
          const response = await fetch("http://localhost:5003/auth/login", {
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
          }
          
          
        } catch (err) {
          console.error(err);
        }
      };
      
      

  return (
    <div>
        <section id='log'>
            <div>
                <div className='log-text'>
                   <text>Welcome to...</text>
                   <h1 className="text-large special-shadow">WORD KNOWLEDGE</h1> 
                </div>
                <form className='log-login' onSubmit={LogCall}>
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

                    <button type='submit' className='login-button'>
                        <h6>Login</h6>
                    </button> 
                </form>

                <div className='sign-up-option'>
                  <p>Don't have an account?</p>
                  <button className='sign-up-login' onClick={() => {handleChangePage(3)}}>
                        <h6>Sign Up</h6>
                    </button> 
                </div>

                

            </div>
        </section>
      
    </div>
  )

    
      
      
    
  
}
