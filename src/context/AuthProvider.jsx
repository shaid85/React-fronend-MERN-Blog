import React, { useEffect, useState } from 'react'
import {authContext} from './authContext';
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [userinfo, setUserinfo] = useState("")
    const getUserDetails = async () => {
      try {
        const res = await axios.get('/api/v1/users/currentuser/')
        setUserinfo(res.data.data.username)   
      } catch (error) {
        console.log(error);
        // toast.error("Error in loading userdata!")
      }
    }
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("username"))
    if (username != "") {
      setUserinfo(username)   
      getUserDetails()  
    }
    
  }, [])

useEffect(()=>{
    localStorage.setItem("username", JSON.stringify(userinfo))
}, [userinfo])
    
  return (
    <authContext.Provider value={{userinfo,setUserinfo}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider