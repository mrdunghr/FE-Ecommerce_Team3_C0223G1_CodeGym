import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
 import './EditCustomer.css'

export default function EditCustomer(){
    const user = JSON.parse(sessionStorage.getItem('user'));
   const [customer,setCustomer] = useState({
       email : "",
       firstName : "",
       lastName : "",
       addressLine1:"",
       addressLine2:"",
       phoneNumber : "",
       city:"",
       state : "",
       country : {
           id : ""
       }
   });
    const [country, setCountry] = useState([{
        id : 0,
        name : "",
        code : ""}]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/customers/list-country").then(res => {
            console.log(res.data)
            setCountry(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/customers/"+ user.id).then(res => {
            console.log(res.data)
            setCustomer(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleFormSubmit = (value) =>{
        axios.put('http://localhost:8080/api/v1/customers/update/'+user.id,value).then(() =>{
                console.log("OK")
            }
        )
    }

    return(
        <>
            <h1>Edit Customer</h1>
            <Formik initialValues={customer} onSubmit={handleFormSubmit} enableReinitialize={true}>
                <Form>
                    <table>
                        <tbody>
                        <tr>
                            <td> Email:</td>
                            <td><Field type={'text'} name={'email'}></Field></td>
                        </tr>
                        <tr>
                            <td> First Name:</td>
                            <td><Field type={'text'} name={'firstName'}></Field></td>
                        </tr>
                        <tr>
                            <td> Last Name:</td>
                            <td><Field type={'text'} name={'lastName'}></Field></td>
                        </tr>
                        <tr>
                            <td> Address Line1:</td>
                            <td><Field type={'text'} name={'addressLine1'}></Field></td>
                        </tr>
                        <tr>
                            <td> Address Line2:</td>
                            <td><Field type={'text'} name={'addressLine2'}></Field></td>
                        </tr>
                        <tr>
                            <td> Phone Number:</td>
                            <td><Field type={'text'} name={'phoneNumber'}></Field></td>
                        </tr>
                        <tr>
                            <td>City:</td>
                            <td><Field type={'text'} name={'city'}></Field></td>
                        </tr>
                        <tr>
                            <td>State:</td>
                            <td><Field type={'text'} name={'state'}></Field></td>
                        </tr>
                        <tr>
                            <td>Country:</td>
                            <td>
                                <Field as={'select'} name={'country.id'}>
                                    <option>-- Country --</option>
                                    {country.map((item) =>(
                                        <option key={item.id} value={item.id}> {item.code} </option>
                                    ))}
                                </Field>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <button>Update</button>
                        </tr>
                        </tbody>
                    </table>
                </Form>

            </Formik>
        </>
    )

}