import React, {useEffect, useState} from "react";
import axios from "axios";
import { Modal, Tab, Nav } from "react-bootstrap";

export default function Customers(){
    const [listCustomer, setListCustomer] = useState([]);
    const [page, setPage] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleOpenModal = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        fetchListS();
    }, [page]);

    const fetchListS = () => {
        axios
            .get(`http://localhost:8080/api/v1/account/customers/list?page=${page}`)
            .then(response => {
                const data = response.data.content;
                console.log(response)
                setListCustomer(data);
            })
            .catch(error => {
                console.log(error);
            });
    }; // hàm hiển thị danh sách

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
        console.log(page)
    }; //2 hàm để next và back page

    const handleNextPage = () => {
        if (listCustomer.length > 1) { // điều kiện list có length > 1 thì không được next nữa, nhỏ hơn mới được tăng giá trị page
            setPage((prevPage) => prevPage + 1);
        }
        console.log(page)

    };

    const handleToggleCustomerStatus = (customerId, currentStatus) => {
        // Tính toán trạng thái mới (nghịch đảo của trạng thái hiện tại)
        const newStatus = !currentStatus;
        console.log(newStatus)

        axios
            .put(`http://localhost:8080/api/v1/customers/${customerId}/enabled/${newStatus}`)
            .then((response) => {
                console.log("Thay đổi trạng thái người dùng thành công:", response.data);
                // Sau khi thay đổi thành công, cập nhật danh sách người dùng bằng cách gọi fetchListS
                fetchListS();
            })
            .catch((error) => {
                console.error("Lỗi khi thay đổi trạng thái người dùng:", error);
            });
    };

    const handleDeleteUser = (customerId) => {
        axios
            .delete(`http://localhost:8080/api/v1/customers/${customerId}`)
            .then((response) => {
                console.log("Xóa khách hàng thành công:", response.data);
                // Sau khi xóa thành công, cập nhật danh sách khách hàng bằng cách gọi fetchListS
                fetchListS();
            })
            .catch((error) => {
                console.error("Lỗi khi xóa khách hàng:", error);
            });
    };

    return (
        <>
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
                            <h3>Manage Customers </h3> <br/>
                            <a href="/Admin/customers/export/csv" className="fas fa-file-csv fa-2x mr-2 icon-success"
                               title="Export to CSV"></a>
                            &nbsp;&nbsp;
                            <a href="/Admin/customers/export/excel" className="fas fa-file-excel fa-2x mr-2 icon-excel"
                               title="Export to Excel"></a>
                            &nbsp;&nbsp;
                            <a href="/Admin/customers/export/pdf" className="fas fa-file-pdf fa-2x icon-red"
                               title="Export to PDF"></a>
                        </div>
                        <div className="card-body">
                            <div>
                                <form action="#" className="form-inline m-3">
                                    <div className="row">
                                        <div className="col-lg-4 mb-1">
                                            <div className="input-group mb-3">
                                                <input type="hidden" name="sortField" value="name"/>
                                                <input type="hidden" name="sortDir" value="asc"/>
                                                <span className="input-group-text" id="basic-addon1">Filter</span>
                                                <input type="search" name="keyword" value="" className="form-control"
                                                       required=""/>
                                                &nbsp;&nbsp;
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="fas fa-search"></i>
                                                </button>
                                                &nbsp;&nbsp;
                                                <button type="button" className="btn btn-secondary">
                                                    <i className="fas fa-eraser"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <table className="table table-bordered table-striped table-hover table-responsive-xl">
                                <thead className="thead-dark">
                                <tr>
                                    <th>
                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=id&amp;sortDir=asc">
                                            ID
                                        </a>

                                    </th>
                                    <th>
                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=firstName&amp;sortDir=desc">
                                            First Name
                                        </a>
                                        <span className="fas fa-sort-up"></span>
                                    </th>
                                    <th>
                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=lastName&amp;sortDir=asc">
                                            Last Name
                                        </a>

                                    </th>

                                    <th className="hideable-column">

                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=email&amp;sortDir=asc">
                                            E-mail
                                        </a>


                                    </th>
                                    <th className="hideable-column">

                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=city&amp;sortDir=asc">
                                            City
                                        </a>


                                    </th>
                                    <th className="hideable-column">

                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=state&amp;sortDir=asc">
                                            State
                                        </a>


                                    </th>
                                    <th>
                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=country&amp;sortDir=asc">
                                            Country
                                        </a>

                                    </th>
                                    <th>
                                        <a className="text-muted"
                                           href="/Admin/customers/page/1?sortField=enabled&amp;sortDir=asc">
                                            Status
                                        </a>

                                    </th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listCustomer.map((customers, i) => (
                                    <tr key={customers.id}>
                                        <td className="hideable-column">{customers.id}</td>
                                        <td className="hideable-column">{customers.firstName}</td>
                                        <td className="hideable-column">{customers.lastName}</td>
                                        <td className="hideable-column">{customers.email}</td>
                                        <td className="hideable-column">{customers.city}</td>
                                        <td className="hideable-column">{customers.state}</td>
                                        <td className="hideable-column">{customers.country.name}</td>
                                        <td>
                                            <a
                                                className={`fas ${customers.enabled ? "fa-check-circle icon-green" : "fa-times-circle icon-red"}`}
                                                title={customers.enabled ? "Disable this customer" : "Enable this customer"}
                                                onClick={() => handleToggleCustomerStatus(customers.id, customers.enabled)}
                                                style={{ color: customers.enabled ? "green" : "red" }}
                                            ></a>
                                        </td>
                                        <td>
                                            <a
                                                href="#"
                                                className="fas fa-file-alt icon-green link-detail"
                                                title="View details of this customer"
                                                onClick={() => handleOpenModal(customers)}
                                            ></a>
                                            &nbsp;
                                            <a
                                                href="#"
                                                className="fas fa-edit icon-green"
                                                title="Edit this customer"
                                            ></a>
                                            &nbsp;
                                            <a
                                                href="#"
                                                className="fas fa-trash icon-red link-delete"
                                                title="Delete this customer"
                                                onClick={() => handleDeleteUser(customers.id)}
                                            ></a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal show={showModal} onHide={handleCloseModal} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>Customer Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedCustomer && (
                                    <Tab.Container defaultActiveKey="general">
                                        <Nav variant="tabs">
                                            <Nav.Item>
                                                <Nav.Link eventKey="general">General</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="address">Address</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="general">
                                                <div className="form-group row">
                                                    <label htmlFor="id" className="col-sm-4 col-form-label">Customer ID:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readOnly className="form-control" value={selectedCustomer.id} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="name" className="col-sm-4 col-form-label">Full Name:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.fullName}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="email" className="col-sm-4 col-form-label">E-mail:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.email}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="phone" className="col-sm-4 col-form-label">Phone Number:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.phoneNumber}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="enabled" className="col-sm-4 col-form-label">Status:</label>
                                                    <div className="col-sm-8">
                                                        <input type="checkbox" disabled="disabled" checked={selectedCustomer.enabled ? "checked" : ""} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="createdTime" className="col-sm-4 col-form-label">Created Time:</label>
                                                    <div class="col-sm-8">
                                                        <span>{selectedCustomer.createdTime}</span>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="address">
                                                <div className="form-group row">
                                                    <label htmlFor="address1" className="col-sm-4 col-form-label">Address Line 1:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readOnly className="form-control" value={selectedCustomer.addressLine1} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="address2" className="col-sm-4 col-form-label">Address Line 2:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.addressLine2}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="city" className="col-sm-4 col-form-label">City:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.city}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="state" className="col-sm-4 col-form-label">State/Province:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.state}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="country" className="col-sm-4 col-form-label">Country:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.country.name}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="postal" className="col-sm-4 col-form-label">Postal Code:</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" readonly="" class="form-control" value={selectedCustomer.postalCode}/>
                                                    </div>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                            </Modal.Footer>
                        </Modal>
                        <div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination pagination-danger justify-content-center">
                                    <button className="btn btn-secondary" onClick={handlePrevPage}>Previous</button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-secondary" onClick={handleNextPage}>Next</button>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}