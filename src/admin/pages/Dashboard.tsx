import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/authProvider';

type Props = {

}

const Dashboard: React.FC<Props> = ({}) => {

  const { authState } = useContext(AuthContext);

  const { email } = authState;
  
  return (
    <>
      <h2>Hello! {email}</h2>
    </>
      
  )
};

export default Dashboard