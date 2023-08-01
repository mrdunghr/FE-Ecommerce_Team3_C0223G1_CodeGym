import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup"
import "./register.css"
import Swal from "sweetalert2";

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
                        Swal.fire("Register success!")
                        navigate('/')
                    }).catch(err => {
                        console.log(err)
                    })
                }}
                validationSchema={validationSchema}
            >
                <Form id={'form-register'}>
                    <h2>SIGN UP HERE</h2>
                   <table>
                       <tr>
                           <td>Enter your first name: </td>
                           <td><Field name={'firstName'}></Field><ErrorMessage name={'firstName'} className={'err-msg'}></ErrorMessage></td>
                       </tr>
                       <tr>
                           <td>Enter your last name: </td>
                           <td><Field name={'lastName'}></Field> <ErrorMessage name={'lastName'} className={'err-msg'}></ErrorMessage></td>
                       </tr>
                       <tr>
                           <td>Choose your country: </td>
                           <td><Field name={'country.id'} component={'select'}>
                               {country.map(country => {
                                   return (
                                       <>
                                           <option value={country.id} >{country.code}</option>
                                       </>
                                   )
                               })}
                           </Field>
                           </td>
                       </tr>
                       <tr>
                           <td>Enter your state:</td>
                           <td><Field name={'state'}></Field>
                               <ErrorMessage name={'state'} className={'err-msg'}></ErrorMessage>
                           </td>
                       </tr>
                       <tr>
                           <td>Enter your phone number: </td>
                           <td><Field name={'phoneNumber'}></Field>
                               <ErrorMessage name={'phoneNumber'} className={'err-msg'}></ErrorMessage>
                           </td>
                       </tr>
                       <tr>
                           <td>Enter your email: </td>
                           <td><Field name={'email'}></Field>
                               <ErrorMessage name={'email'} className="err-msg"></ErrorMessage></td>
                       </tr>
                       <tr>
                           <td>Enter your password: </td>
                           <td><Field name={'password'}></Field>
                               <ErrorMessage name={'password'} className={'err-msg'}></ErrorMessage></td>
                       </tr>
                       <tr>
                           <td colSpan={2}><button id={'submit'}>Submit</button></td>
                       </tr>
                   </table>
                </Form>
            </Formik>
        </div>
        </>
    )
}
