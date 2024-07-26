import React from 'react'
import { Navigate, useOutletContext } from 'react-router'


const ProtectedRoute = ({children}:any) => {
  const context:any = useOutletContext()
  if(!context.user)
  {
      return <Navigate to="/" replace/>
  }
  else{
    return children
  }
  
}

export default ProtectedRoute;