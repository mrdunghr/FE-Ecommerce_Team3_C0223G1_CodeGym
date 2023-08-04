import {Field, Form, Formik} from "formik";
import './ChangePassword.css'
export default function ChangePassword(){
    return(
        <>
            <div className={'content-edit-pass'}>
                <h1>Change Password</h1>
                <Formik>
                    <Form>
                        <table>
                            <tbody>
                            <tr>
                                <td>Enter your old password :</td>
                                <td><Field style={{textAlign:'left',width:'250px',marginLeft:'5px'}} type={'text'}></Field></td>
                            </tr>
                            <tr>
                                <td>Enter your new password :</td>
                                <td><Field style={{textAlign:'left',width:'250px',marginLeft:'5px'}} type={'password'}></Field></td>
                            </tr>
                            <tr>
                                <td>Confirm new password :</td>
                                <td><Field style={{textAlign:'left',width:'250px',marginLeft:'5px'}} type={'password'}></Field></td>
                            </tr>
                            <tr>
                                <button className={'bnt-edit'} style={{margin:'30px'}}>Update</button>
                            </tr>
                            </tbody>
                        </table>
                    </Form>
                </Formik>
            </div>
        </>
    )
}