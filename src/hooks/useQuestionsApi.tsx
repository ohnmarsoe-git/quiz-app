import React from 'react'
import BASEAPI from '../API/config';

function useQuestionsApi() {
  
  const api:any = BASEAPI();

  const getallByCategory:any = async (cat: string) => {
    
    try {
      await api.get('/api/v1', {
        params: {
          category: cat
        }
      }).then((res:any) => {
          return res.data;
      }).catch((err:any) => {
         return err;
      }) 
      
    } catch(error) {
      return error;
    }
  }
  
  return (
    getallByCategory
  )
}

export default useQuestionsApi