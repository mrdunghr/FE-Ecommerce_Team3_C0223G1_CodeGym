import {useEffect, useState} from "react";
import axios from "axios";

export default function Customers(){
    const [listCustomer, setListCustomer] = useState([]);
    const [page, setPage] = useState(0);

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
                                        <td className="hideable-column">{customers.enabled ? 'Enabled' : 'Disabled'}</td>
                                        <td>
                                            <a
                                                href={`/Admin/customers/detail/#`}
                                                className="fas fa-file-alt icon-green link-detail"
                                                title="View details of this customer"
                                            ></a>
                                            &nbsp;
                                            <a
                                                href={`/Admin/customers/edit/#`}
                                                className="fas fa-edit icon-green"
                                                title="Edit this customer"
                                            ></a>
                                            &nbsp;
                                            <a
                                                href={`/Admin/customers/delete/#`}
                                                className="fas fa-trash icon-red link-delete"
                                                title="Delete this customer"
                                                // onClick={handleDelete}
                                            ></a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
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