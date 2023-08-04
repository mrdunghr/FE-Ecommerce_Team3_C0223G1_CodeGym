import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './ChangePassword.css';

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Please enter old password'),
    newPassword: Yup.string().min(6, 'Passwords must be at least 6 characters').required('Please enter a new password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Password does not match')
        .required('Please re-enter new password'),
});

export default function ChangePassword() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const handleSubmit = (values) => {
        axios.put('http://localhost:8080/api/v1/customers/edit-password/'+user.id, {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        })
            .then(response => {
                // Xử lý phản hồi thành công từ API
                console.log(response.data);
                alert('Password change successful!');
            })
            .catch(error => {
                // Xử lý lỗi từ API
                console.error(error);
                alert('An error occurred while changing the password!');
            });
    };

    return (
        <div className="content-edit-pass">
            <h1>Change Password</h1>
            <Formik initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }} onSubmit={handleSubmit} validationSchema={ChangePasswordSchema}>
                {({ errors, touched }) => (
                    <Form>
                        <table>
                            <tbody>
                            <tr>
                                <td>Enter your old password:</td>
                                <td><Field style={{ textAlign: 'left', width: '250px', marginLeft: '5px' }} type="password" name="oldPassword" /></td>
                                {errors.oldPassword && touched.oldPassword && <div className="error-message">{errors.oldPassword}</div>}
                            </tr>
                            <tr>
                                <td>Enter your new password:</td>
                                <td><Field style={{ textAlign: 'left', width: '250px', marginLeft: '5px' }} type="password" name="newPassword" /></td>
                                {errors.newPassword && touched.newPassword && <div className="error-message">{errors.newPassword}</div>}
                            </tr>
                            <tr>
                                <td>Confirm new password:</td>
                                <td><Field style={{ textAlign: 'left', width: '250px', marginLeft: '5px' }} type="password" name="confirmPassword" /></td>
                                {errors.confirmPassword && touched.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                            </tr>
                            <tr>
                                <button className="bnt-edit" style={{ margin: '30px' }} type="submit">Update</button>
                            </tr>
                            </tbody>
                        </table>
                    </Form>
                )}
            </Formik>
        </div>
    );
}