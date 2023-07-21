import "./login.css"
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {useDispatch} from "react-redux";
import {createAction} from "@reduxjs/toolkit";

    const validationSchema = Yup.object().shape({
        email : Yup.string()
            .required("Required"),
        password : Yup.string()
            .required("Required")
    })
    const updateUser = createAction('updateUser')
  const Login = () =>{
      const dispatch = useDispatch();
       const navigate =  useNavigate()
    return(
        <>
            <div id={'container'}>
                    <Formik
                        initialValues={{
                            email : "",
                            password : ""
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values)
                            axios.post("http://localhost:8080/api/v1/customers/login", values).then((res) => {
                                dispatch(updateUser(res.data))
                                sessionStorage.setItem('user', JSON.stringify(res.data))
                                Swal.fire("Sign in successful!")
                                navigate('/', {state : res.data})
                            }).catch((res) => {
                                Swal.fire("Wrong email or password!")
                                navigate("/login", res)
                            })
                        }}
                    >
                        <Form id={'login-form'}>
                            <p>Sign in with</p>
                            <hr/>
                            <Field type="text" placeholder={'Enter your email'} id={'username'} name={'email'}/>
                            <ErrorMessage name={'email'}></ErrorMessage>
                            <Field type="password" placeholder={'Password'} id={'password'} name={'password'}/><br/>
                            <Field type="checkbox"/><span>Remember me</span>
                            <Link to={'/register'}>Don't have account?</Link><br/>
                            <button id={'submit'}>Submit</button>
                        </Form>
                    </Formik>
            </div>

        </>
    )
}
export default Login

