import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Brands(){
    const [listBrands, setListBrands] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchListS();
    }, [page]);

    const fetchListS = () => {
        axios
            .get(`http://localhost:8080/api/v1/brand/all?page=${page}`)
            .then(response => {
                const data = response.data.content;
                setListBrands(data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
        console.log(page)
    }; //2 hàm để next và back page

    const handleNextPage = () => {
        if (listBrands.length > 1) { // điều kiện list có length > 1 thì không được next nữa, nhỏ hơn mới được tăng giá trị page
            setPage((prevPage) => prevPage + 1);
        }
        console.log(page)

    };

    const handleBrand = (brandId) => {
        axios
            .delete(`http://localhost:8080/api/v1/brand/${brandId}`)
            .then((response) => {
                console.log("Xóa người dùng thành công:", response.data);
                // Sau khi xóa thành công, cập nhật danh sách người dùng bằng cách gọi fetchListS
                fetchListS();
            })
            .catch((error) => {
                console.error("Lỗi khi xóa người dùng:", error);
            });
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
                            <h3>Manage Brands </h3> <br/>
                            <Link to="/brands/add-brands">Add New Brand</Link>
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
                                    <th>Brand ID</th>
                                    <th>Logo</th>
                                    <th>
                                        <a className="text-muted"
                                           href="/Admin/categories/page/1?sortField=name&amp;sortDir=desc">Brand Name</a>
                                        <span className="fas fa-sort-up"></span>
                                    </th>
                                    <th className="hideable-column">Categories</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listBrands.map((brand) => (
                                    <tr key={brand.id}>
                                        <td>{brand.id}</td>
                                        <td>{brand.logo}</td>
                                        <td>
                                            <img src={brand.name} style={{width : "100px"}}/>
                                        </td>
                                        <td>
                                            {brand.categories.map((category) => (
                                                <span key={category.id} className="badge bg-warning text-dark mr-1">{category.name}</span>
                                            ))}
                                        </td>
                                        <td>
                                            <a className="fas fa-edit icon-green" href="/Admin/brands/edit/15" title="Edit this brand"></a>
                                            &nbsp;
                                            <a className="fas fa-trash icon-red link-delete" onClick={() => handleBrand(brand.id)} title="Delete this brand"></a>
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