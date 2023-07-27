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
       axios.get("http://localhost:8080/api/v1/customers/list-country").then(res => {
           console.log(res.data)
           setCountry(res.data)
       }).catch(err => {
           console.log(err)
       })
   }, [])
    return(
        <>
            <div id={'container'}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        firstName: "",
                        lastName: "",
                        state: "",
                        country: {id: ""},
                        phoneNumber: ""
                    }}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        console.log(values)
                        axios.post("http://localhost:8080/api/v1/customers/register", values)
                            .then(() => {
                                navigate('/')
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}
                    validationSchema={validationSchema}
                >
                    <Form id={'form-register'}>
                        <div className="form-column">
                            <h2>Register Form</h2><hr/>
                            <div style={{paddingBottom: '10px'}}>
                                <label htmlFor=""style={{paddingRight: '32px'}}>Enter your first name: </label>
                                <Field name={'firstName'}></Field>
                                <ErrorMessage name={'firstName'}></ErrorMessage><br/>
                            </div>
                            <div style={{paddingBottom: '10px'}}>
                                <label htmlFor=""style={{paddingRight: '36px'}}>Enter your last name: </label>
                                <Field name={'lastName'}></Field>
                                <ErrorMessage name={'lastName'}></ErrorMessage><br/>
                            </div>
                            <div>
                                <label htmlFor=""style={{paddingRight: '69px'}}>Enter your state: </label>
                                <Field name={'state'}></Field>
                                <ErrorMessage name={'state'}></ErrorMessage><br/>
                            </div>
                        </div>
                        <div className="form-column">
                            <div style={{paddingBottom: '10px'}}>
                                <label htmlFor=""style={{paddingRight: '33px'}}>Choose your country: </label>
                                <Field name={'country.id'} component={'select'}>
                                    {country.map(country => {
                                        return (
                                            <>
                                                <option value={country.id}>{country.code}</option>
                                            </>
                                        )
                                    })}
                                </Field><br/>
                            </div>
                            <div style={{paddingBottom: '10px'}}>
                                <label htmlFor="{'phoneNumber'}">Enter your phone number: </label>
                                <Field name={'phoneNumber'}></Field>
                                <ErrorMessage name={'phoneNumber'}></ErrorMessage><br/>
                            </div>
                            <div style={{paddingBottom: '10px'}}>
                                <label htmlFor="{'email'}"style={{paddingRight: '35px'}}>Enter your username: </label>
                                <Field name={'email'}></Field>
                                <ErrorMessage name={'email'}></ErrorMessage><br/>
                            </div>
                            <div>
                                <label htmlFor="{'password'}"style={{paddingRight: '37px'}}>Enter your password: </label>
                                <Field name={'password'}></Field>
                                <ErrorMessage name={'password'}></ErrorMessage><br/>
                            </div>
                            <button type={'submit'} id={'register'}>Register</button>
                        </div>
                    </Form>
                </Formik>
            </div>

        </>
    )
}

