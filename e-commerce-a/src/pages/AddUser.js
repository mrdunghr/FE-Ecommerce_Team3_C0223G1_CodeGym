import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./firebase"; // Đường dẫn tới tệp firebase.js đã cấu hình

export default function AddUser() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [enabled, setEnabled] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const handleRoleChange = (roleId) => {
        setSelectedRoles((prevRoles) => {
            if (prevRoles.some((role) => role.id === roleId)) {
                // Nếu role đã tồn tại trong mảng, loại bỏ nó
                return prevRoles.filter((role) => role.id !== roleId);
            } else {
                // Nếu role chưa tồn tại trong mảng, thêm nó vào
                const newRole = { id: roleId };
                return [...prevRoles, newRole];
            }
        });
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            uploadImageToFirebaseStorage(file); // Thêm dòng này để tải hình ảnh lên Firebase Storage
        }
    };
    const uploadImageToFirebaseStorage = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, "images/" + file.name);
            await uploadBytes(storageRef, file);
            const imageURL = await getDownloadURL(storageRef);
            setSelectedImage(imageURL);
        } catch (error) {
            console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
        }
    };


    const handleSubmit =  async (event) => {
        event.preventDefault();
        const data = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            enabled: enabled,
            photos: selectedImage, // cái này giờ không còn tên ảnh web nữa mà là link ảnh firebase
            roles: selectedRoles
        };
        console.log(data)

        try {
            const response = await axios.post("http://localhost:8080/api/v1/users/create-user", data);
            // Xử lý phản hồi theo cần thiết
            console.log("Tạo người dùng thành công:", response.data);
            alert("Tạo người dùng thành công")

            // Sau khi tạo thành công, reset tất cả dữ liệu đã chọn và nhập
            resetForm();
        } catch (error) {
            console.error("Lỗi khi tạo người dùng:", error);
        }
    };

    // Hàm reset form
    const resetForm = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setEnabled(true);
        setSelectedImage(null);
        setSelectedRoles([]);
    };

    const roles = [
        { id: 1, name: 'Admin', description: 'Manage everything' },
        { id: 2, name: 'Salesperson', description: 'Manage product price, customers, shipping, orders and sales report' },
        { id: 3, name: 'Editor ', description: 'Manage categories, brands, products, articles and menus' },
        { id: 4, name: 'Shipper ', description: 'View products, view orders and update order' },
        { id: 5, name: 'Assistant ', description: 'Manage questions and reviews' },
    ];

    return (
        <div className="main-content container-fluid">
            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Datatable</h3>
                        <p className="text-subtitle text-muted">A good dashboard to display your statistics</p>
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-header">
                        <h3>Manage Users | Create New User</h3>
                    </div>
                    <form onSubmit={handleSubmit} action="#" method="post">
                        <input type="hidden" name="_csrf" value="415739da-d6db-488f-a571-104da8f70309" />
                        <input type="hidden" id="id" name="id" value="" />
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email-id-column">Email</label>
                                        <input type="email" className="form-control" required minLength="8" maxLength="128" id="email" name="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="first-name-column">First Name</label>
                                        <input type="text" className="form-control" required minLength="2" maxLength="45" id="firstName" name="firstName" value={firstName}
                                        	onChange={(e) => setFirstName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">Last Name</label>
                                        <input type="text" className="form-control" required minLength="2" maxLength="45" id="lastName" name="lastName" value={lastName}
                                        	onChange={(e) => setLastName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="username-column">Password</label>
                                        <input type="password" className="form-control" required="" minLength="8" maxLength="20" id="password" name="password" value={password}
                                        	onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="username-column">Status</label>
                                        <input type="checkbox" id="enabled1" name="enabled" value="true" checked={enabled}
                                            onChange={(e) => setEnabled(e.target.checked)}/>
                                        <input type="hidden" name="_enabled" value={enabled ? 'on' : ''} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="username-column">Photos</label>
                                        <input type="hidden" id="photos" name="photos" value="" />
                                        <input type="file" name="image" id="fileImage" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange}/>
                                        {selectedImage ? (
                                            <img id="thumbnail" alt="Image preview" src={selectedImage} className="img-fluid" style={{ height: '150px' }}/>
                                        ) : (
                                            <img id="thumbnail" alt="Image preview" src="/logo.png" className="img-fluid" style={{ height: '150px' }}/>)}
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="username-column">Roles</label> <br />
                                        {roles.map((role) => (
                                            <React.Fragment key={role.id}>
                                                <input type="checkbox" value={role.id} className="m-2" name="roles"
                                                       checked={selectedRoles.some((selectedRole) => selectedRole.id === role.id)}
                                                    onChange={() => handleRoleChange(role.id)}/>
                                                <input type="hidden" name={`_roles${role.id}`}
                                                    value={selectedRoles.some((selectedRole) => selectedRole.id === role.id) ? 'on' : ''}/>
                                                {role.name} - <small>{role.description}</small>
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="clearfix">
                                <div className="text-center">
                                    <input type="submit" value="Submit" className="btn btn-primary m-3" />
                                    <Link to={"/users"}><input type="button" value="Cancel" className="btn btn-danger" id="buttonCancel" /></Link>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="modal fade text-center" id="modalDialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="modalTitle">Warning</h4>
                                    <button type="button" className="close" data-bs-dismiss="modal">×</button>
                                </div>

                                <div className="modal-body">
                                    <span id="modalBody"></span>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
