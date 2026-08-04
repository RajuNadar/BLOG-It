import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({
    children,
    authentication = true
}) {
    const [loder, setloder] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        // if (authStatus === true) {
        //     navigate("/")
        // }else if (authStatus === false) {
        //     navigate("/log-in")
        // }
        if (authentication && authStatus !== authentication) {
            navigate("/log-in")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloder(false)
    }, [authStatus, navigate, authentication])
  return loder ? <p>Loading...</p> : <>{children}</>
}