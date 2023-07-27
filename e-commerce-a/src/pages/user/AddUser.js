import React, { useState } from 'react';
import {Link} from "react-router-dom";

export default function AddUser() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [enabled, setEnabled] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const handleRoleChange = (roleId) => {
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(roleId)
                ? prevRoles.filter((role) => role !== roleId)
                : [...prevRoles, roleId]
        );
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your logic to handle form submission here.
        // You can access the form values using the state variables (e.g., email, firstName, etc.)
    };

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
                    <form onSubmit={handleSubmit} action="/Admin/users/save" method="post" encType="multipart/form-data">
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
                                        <input type="checkbox" value="1" className="m-2" id="roles1" name="roles" checked={selectedRoles.includes('1')}
                                               onChange={() => handleRoleChange('1')}/>
                                        <input type="hidden" name="_roles" value={selectedRoles.includes('1') ? 'on' : ''} />
                                        Admin - <small>Manage everything</small>
                                        <br />
                                        <input type="checkbox" value="2" className="m-2" id="roles2" name="roles" checked={selectedRoles.includes('2')}
                                               onChange={() => handleRoleChange('2')}/>
                                        <input type="hidden" name="_roles" value={selectedRoles.includes('1') ? 'on' : ''} />
                                        Salesperson -  <small>Manage product price, customers, shipping, orders and sales report</small>
                                        <br />
                                        <input type="checkbox" value="3" className="m-2" id="roles3" name="roles" checked={selectedRoles.includes('3')}
                                               onChange={() => handleRoleChange('3')}/>
                                        <input type="hidden" name="_roles" value={selectedRoles.includes('1') ? 'on' : ''} />
                                        Editor -  <small>Manage categories, brands, products, articles and menus</small>
                                        <br />
                                        <input type="checkbox" value="4" className="m-2" id="roles4" name="roles" checked={selectedRoles.includes('4')}
                                               onChange={() => handleRoleChange('4')}/>
                                        <input type="hidden" name="_roles" value={selectedRoles.includes('1') ? 'on' : ''} />
                                        Shipper -  <small>View products, view orders and update order</small>
                                        <br />
                                        <input type="checkbox" value="5" className="m-2" id="roles5" name="roles" checked={selectedRoles.includes('5')}
                                               onChange={() => handleRoleChange('5')}/>
                                        <input type="hidden" name="_roles" value={selectedRoles.includes('1') ? 'on' : ''} />
                                        Assistant -  <small>Manage questions and reviews</small>
                                        <br />
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
