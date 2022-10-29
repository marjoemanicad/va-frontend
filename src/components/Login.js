import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Login() {
    const something=(event)=> {
        if (event.keyCode === 13) {
            login()
        }
    }
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    let navigate = useNavigate()


    const login = () => {
        fetch('http://127.0.0.1:8000/api/token/', {
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username, password})
        })
        .then(resp => resp.json())
        .then(result => {
            if(result.access === undefined){
                setError("Invalid username or password")
                console.log(result)
                return
            }
            const oldtoken = result.access
            const refreshtoken = result.refresh
            fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method:"POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({refresh:`${refreshtoken}`})
            })
            .then(resp => resp.json())
            .then(result => {
                if(result.access === undefined){
                    setError("Invalid username or password")
                    console.log(result)
                    return
                }
                localStorage.setItem('mytoken',result.access)
                
                
               
                navigate('/homepage')
            })
            
        })
    }

  return (
    <div className='container mt-4'>
        <br/>

        {error ? 
            <div className='alert alert-warning alert-dismissable' role="alert">
                <p>{error}</p>
            </div>

            :

            null
        }

        <h1>Please login here</h1>
        <div className='mb-3'>
            <input type='text' className = 'form-control' 
                    name= 'username' placeholder='Please Neter Username'
                    value = {username}
                    onKeyDown={(e) => something(e) }
                    onChange = {evt => setUsername(evt.target.value)}/>
        </div>
        <div className='mb-3'>
            <input type='password' className = 'form-control' 
                    name= 'password' placeholder='Please Neter Password'
                    value = {password}
                    onKeyDown={(e) => something(e) }
                    onChange = {evt => setPassword(evt.target.value)}/>
        </div>

        <div className='mb-3' >
            <button  onClick={login} className='btn btn-success'>Login</button>
        </div>

    </div>
  )
}

export default Login

