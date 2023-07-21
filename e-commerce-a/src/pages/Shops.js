import {useEffect, useState} from "react";
import axios from "axios";

export default function Shops(){
    const [listShop, setListShop] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchListS();
    }, [page]);

    const fetchListS = () => {
        axios
            .get(`http://localhost:8080/api/v1/shop/list?page=${page}`)
            .then(response => {
                const data = response.data.content;
                console.log(response)
                setListShop(data);
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
        if (listShop.length > 1) { // điều kiện list có length > 1 thì không được next nữa, nhỏ hơn mới được tăng giá trị page
            setPage((prevPage) => prevPage + 1);
        }
        console.log(page)

    };
    return(
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
                            <h3>Manage Shops </h3> <br/>
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
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>
                                        <a className="text-muted"
                                           href="/Admin/categories/page/1?sortField=name&amp;sortDir=desc">Shop Name</a>
                                        <span className="fas fa-sort-up"></span>
                                    </th>
                                    <th className="hideable-column">Description</th>
                                    <th>Delivery Address</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listShop.map((shops, i) => (
                                    <tr key={shops.id}>
                                        <td className="hideable-column">{shops.id}</td>
                                        <td className="hideable-column">{shops.image}</td>
                                        <td className="hideable-column">{shops.name}</td>
                                        <td className="hideable-column">{shops.alias}</td>
                                        <td className="hideable-column">{shops.deliveryAddress}</td>
                                        <td className="hideable-column">{shops.customer.email}</td>
                                        <td className="hideable-column">{shops.enabled ? 'Enabled' : 'Disabled'}</td>
                                        <td>
                                            <a className="fas fa-file-alt icon-green link-detail"
                                               href="/Admin/shops/detail/1" title="View details of this shop"></a>
                                            &nbsp;
                                            <a className="fas fa-trash icon-red link-delete"
                                               href="/Admin/shops/delete/1" entityid="1" title="Delete this shop"></a>
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