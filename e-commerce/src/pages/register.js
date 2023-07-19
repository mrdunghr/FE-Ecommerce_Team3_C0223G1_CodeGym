import React, {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup"



// const validationSchema = Yup.object().shape({
//     email : Yup.string()
//         .min(5, "Too short!")
//         .max(45, "Too long!")
//         .email("Invalid email!")
//         .required("Email required!"),
//     password : Yup.string()
//         .min(5, "Too short!")
//         .max(30, "Too long!")
//         .required("Required!")
// })
// export const CustomerRegister = () =>{
//     const navigate = useNavigate()
//     const [customer, setCustomer] = useState({
//         email : "",
//         password : "",
//     })
//     return(
//         <>
//             <Formik
//                 initialValues={{
//                     email : "",
//                     password : ""
//                 }}
//                 enableReinitialize={true}
//                 onSubmit={(values) => {
//                     console.log(values)
//                     // axios.post("http://localhost:8080/api/v1/customers/register").then(() =>{
//                     //     navigate('/login')
//                     // })
//                 }}
//                 validationSchema={validationSchema}
//             >
//                 <Form>
//                     <label htmlFor="{'email'}">Enter your username: </label>
//                     <Field name={'email'}></Field>
//                     <ErrorMessage name={'email'}></ErrorMessage><br/>
//                     <label htmlFor="{'password'}">Enter your username: </label>
//                     <Field name={'password'}></Field>
//                     <ErrorMessage name={'password'}></ErrorMessage><br/>
//                     <button type={'submit'}>Submit</button>
//                 </Form>
//             </Formik>
//         </>
//     )
// }

