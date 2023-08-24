import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useBlgger from '../../Contexts/mainContext';

const Protected = ({children}) => {
    const {state, dispatch} = useBlgger();
    const navigate = useNavigate();

    useEffect(() =>{
        if(!state.auth.isAuthenticated){
            navigate('/login');
        }
    })
  return (
    <div>{children}</div>
  )
}

export default Protected