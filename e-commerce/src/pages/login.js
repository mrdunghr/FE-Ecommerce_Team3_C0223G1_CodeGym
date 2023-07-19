import "./login.css"
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
// import {} from "./register";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
  const Login = () =>{
      const [login, setLogin] = useState({})
      function handleChange(e){
          const {name, value} = e.target
          setLogin({...login, [name] : value})
      }
    return(
        <>
            <div id={'container'}>
                <div id={'login-form'}>
                    <p>Sign in with</p>
                    <hr/>
                    <input type="text" placeholder={'Username'} id={'username'} name={'username'} onChange={e => handleChange(e)}/>
                    <input type="password" placeholder={'Password'} id={'password'} name={'password'} onChange={e => handleChange(e)}/><br/>
                    <input type="checkbox"/><span>Remember me</span>
                    <Link to={'/register'}>Don't have account?</Link><br/>
                    <button id={'submit'} onClick={() => loginUser(login)}>Submit</button>
                </div>
            </div>

        </>
    )
}
 function loginUser(e){
    console.log(e)

  }
export default Login

const validationSchema = Yup.object().shape({
    email : Yup.string()
        .min(5, "Too short!")
        .max(45, "Too long!")
        .email("Invalid email!")
        .required("Email required!"),
    password : Yup.string()
        .min(5, "Too short!")
        .max(30, "Too long!")
        .required("Required!")
})
export const CustomerRegister = () =>{
    const navigate = useNavigate()
    const [customer, setCustomer] = useState({
        email : "",
        password : "",
    })
    return(
        <>
            <Formik
                initialValues={{
                    email : "",
                    password : ""
                }}
                enableReinitialize={true}
                onSubmit={(values) => {
                    console.log(values)
                    // axios.post("http://localhost:8080/api/v1/customers/register").then(() =>{
                    //     navigate('/login')
                    // })
                }}
                validationSchema={validationSchema}
            >
                <Form>
                    <label htmlFor="{'email'}">Enter your username: </label>
                    <Field name={'email'}></Field>
                    <ErrorMessage name={'email'}></ErrorMessage><br/>
                    <label htmlFor="{'password'}">Enter your username: </label>
                    <Field name={'password'}></Field>
                    <ErrorMessage name={'password'}></ErrorMessage><br/>
                    <button type={'submit'}>Submit</button>
                </Form>
            </Formik>
        </>
    )
}
