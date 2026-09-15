import React from 'react'
import {useformik} from 'react'
export const Login = () => {
    const formik = useformik({
        initialvalues:{
            UserName:"",
            Password:""
        },
        onSubmit:(values)=>{
            console.log(values)
        }
    })
  return (
    <>
 
    
    </>
  )
}
