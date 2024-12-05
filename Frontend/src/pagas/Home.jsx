import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export const Home = () => {
    
  return (
    <div>
          <Navigate to={"/dashboard"} />
    </div>
  )
}
