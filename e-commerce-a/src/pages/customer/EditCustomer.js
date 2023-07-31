import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EditCustomer() {
    const [listCountry, setListCountry] = useState([])
    const [listState, setListState] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/v1/countries`)
            .then(response => {
                const data = response.data;
                console.log(data);
                setListCountry(data);
            })
            .catch(err => {
                console.log(err)
            })

        axios
            .get(`http://localhost:8080/api/v1/states`)
            .then(response => {
                const data = response.data;
                console.log(data);
                setListState(data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div className="main-content container-fluid">
            <div className="page-title">
                <div className="row">
                    <div className="col-12 col-md-6 order-md-1 order-last">
                        <h3>Datatable</h3>
                        <p className="text-subtitle text-muted">
                            A good dashboard to display your statistics
                        </p>
                    </div>
                </div>
            </div>
            <section className="section">
                <div className="card">
                    <div className="card-header">
                        <h3>Manage Customers | Edit Customer (ID: 47)</h3>
                    </div>
                    <form action="#" method="post">
                        <input type="hidden" name="_csrf" value="4aa4d470-9bda-4319-90d1-14987ceb3991" />
                        <input type="hidden" id="id" name="id" value="47" />
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email-id-column">Email</label>
                                        <input type="email" className="form-control"
                                               required minLength="8" maxLength="128" id="email" name="email" value="minna_amigon@yahoo.com"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="first-name-column">First Name</label>
                                        <input type="text" required="" minLength="2" maxLength="45"
                                               className="form-control" name="firstName" id="firstName" value="Abel"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">Last Name</label>
                                        <input type="text" className="form-control" name="lastName"
                                               required="" minLength="2" maxLength="45" id="lastName" value="Maclead"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="customername-column">Password</label>
                                        <input type="password" className="form-control" placeholder="Leave blank if you don't want to change password"
                                               minLength="8" maxLength="20" id="password" name="password" value=""/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">Phone Number</label>
                                        <input type="text" className="form-control" name="phoneNumber" pattern="^[0-9]*$"
                                               required="" minLength="10" maxLength="10" id="phoneNumber" value="0123456789"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">Address Line 1</label>
                                        <input type="text" className="form-control" name="addressLine1"
                                               required="" minLength="2" maxLength="45" id="addressLine1" value="1933 Packer Ave #2"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">Address Line 2</label>
                                        <input type="text" className="form-control" name="addressLine2"
                                               required="" minLength="2" maxLength="45" id="addressLine2" value="1933 Packer Ave #2"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">City</label>
                                        <input type="text" className="form-control" name="city"
                                               required="" minLength="2" maxLength="45" id="city" value="Ha Noi"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="customername-column">Status</label>
                                        <input type="checkbox" id="enabled1" name="enabled" value="true" checked="checked"/>
                                            <input type="hidden" name="_enabled" value="on"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">Country</label>
                                        <select className="form-control" id="country" name="country">
                                            {listCountry.map(country => (
                                                <option key={country.id} value={country.id}>
                                                    {country.code}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">State/Province</label>
                                        <select className="form-control" id="state" name="state">
                                            {listState.map(state => (
                                                <option key={state.id} value={state.id}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="last-name-column">Postal Code</label>
                                        <input type="text" className="form-control"
                                               required="" minLength="3" maxLength="6" id="postalCode" name="postalCode" value="32804"/>
                                    </div>
                                </div>
                            </div>

                            <div className="clearfix">
                                <div className="text-center">
                                    <input type="submit" value="Submit" className="btn btn-primary m-3" />
                                    <input type="button" value="Cancel" className="btn btn-danger" id="buttonCancel" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
