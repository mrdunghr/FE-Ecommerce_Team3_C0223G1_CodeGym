import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup"
import "./register.css"

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
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        country : {
            id : ""
        },
        phoneNumber : "",
        state : ""
    })
    const [country, setCountry] = useState([{
        id : 0,
        name : "",
        code : ""}])
   useEffect(() => {
       axios.get("http://localhost:8888/api/v1/customers/list-country").then(res => {
           console.log(res.data)
           setCountry(res.data)
       }).catch(err => {
           console.log(err)
       })
   }, [])
    return(
        <><div id={'container'}>
            <Formik
                initialValues={{
                    email : "",
                    password : ""
                }}
                enableReinitialize={true}
                onSubmit={(values) => {
                    console.log(values)
                    axios.post("http://localhost:8888/api/v1/customers/register", values).then(() =>{
                        navigate('/')
                    }).catch(err => {
                        console.log(err)
                    })
                }}
                validationSchema={validationSchema}
            >
                <Form id={'form-register'}>
                    <h2>SIGN UP HERE</h2>
                    <label htmlFor="">Enter your first name: </label>
                    <Field name={'firstName'}></Field>
                    <ErrorMessage name={'firstName'}></ErrorMessage><br/>
                    <label htmlFor="">Enter your last name: </label>
                    <Field name={'lastName'}></Field>
                    <ErrorMessage name={'lastName'}></ErrorMessage><br/>
                    <label htmlFor="">Enter your state: </label>
                    <Field name={'state'}></Field>
                    <ErrorMessage name={'state'}></ErrorMessage><br/>
                    <label htmlFor="">Choose your country: </label>
                    <Field name={'country.id'} component={'select'}>
                        {country.map(country => {
                            return (
                                <>
                                    <option value={country.id} >{country.code}</option>
                                </>
                            )
                        })}
                    </Field><br/>
                    <label htmlFor="{'phoneNumber'}">Enter your phone number: </label>
                    <Field name={'phoneNumber'}></Field>
                    <ErrorMessage name={'phoneNumber'}></ErrorMessage><br/>
                    <label htmlFor="{'email'}">Enter your username: </label>
                    <Field name={'email'}></Field>
                    <ErrorMessage name={'email'}></ErrorMessage><br/>
                    <label htmlFor="{'password'}">Enter your password: </label>
                    <Field name={'password'}></Field>
                    <ErrorMessage name={'password'}></ErrorMessage><br/>
                    <button type={'submit'} id={'submit'}>Submit</button>
                </Form>
            </Formik>
         </div>
        </>
    )
}

