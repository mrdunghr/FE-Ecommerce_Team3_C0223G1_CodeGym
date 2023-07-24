import {useEffect, useState} from "react";
import axios from "axios";

export default function ManageProducts(){
    const [listCategory, setListCategory] = useState([]);
    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        fetchListS();
    }, []);

    const fetchListS = () => {
        axios
            .get(`http://localhost:8080/api/v1/category/all`)
            .then(response => {
                const data = response.data;
                // console.log(">>>>>>>", response)
                setListCategory(data);
            })
            .catch(error => {
                console.log(error);
            });

        axios
            .get(`http://localhost:8080/api/v1/products/all`)
            .then(response => {
                const data = response.data;
                // console.log(">>>>>>>", response)
                setListProduct(data);
            })
            .catch(error => {
                console.log(error);
            });
    }; // hàm hiển thị danh sách

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
                            <h3>Manage Products</h3>
                        </div>
                        <div className="card-body">
                            <div>
                                <form action="#" className="form-inline m-3" id="searchForm">
                                    <div className="row">
                                        <div className="col-lg-4 mb-1">
                                            <div className="input-group mb-3">
                                                <input type="hidden" name="sortField" value="name" />
                                                <input type="hidden" name="sortDir" value="asc" />
                                                <span className="input-group-text" id="basic-addon1">Category</span>
                                                &nbsp;&nbsp;
                                                <select className="form-control" name="categoryId" id="dropdownCategory" value="">
                                                    <option value="0">All Categories</option>
                                                    {listCategory.map(category => (
                                                        <option key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <table className="table table-bordered table-striped table-hover table-responsive-xl">
                                <thead className="thead-dark">
                                <tr>
                                    <th className="hideable-column">
                                        <a className="text-muted" href="/Admin/products/page/1?sortField=id&amp;sortDir=asc&amp;categoryId=0">ID</a>
                                    </th>
                                    <th>Main Image</th>
                                    <th>
                                        <a className="text-muted" href="/Admin/products/page/1?sortField=name&amp;sortDir=desc&amp;categoryId=0">Product Name</a>
                                        <span className="fas fa-sort-up"></span>
                                    </th>
                                    <th className="hideable-column">
                                        <a className="text-muted" href="/Admin/products/page/1?sortField=brand&amp;sortDir=asc&amp;categoryId=0">Brand</a>
                                    </th>
                                    <th className="hideable-column">
                                        <a className="text-muted" href="/Admin/products/page/1?sortField=category&amp;sortDir=asc&amp;categoryId=0">Category</a>
                                    </th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listProduct.map((product) =>(
                                    <tr key={product.id}>
                                        <td className="hideable-column">{product.id}</td>
                                        <td className="hideable-column">{product.mainImage}</td>
                                        <td className="hideable-column">{product.name}</td>
                                        <td className="hideable-column">{product.brand.logo}</td>
                                        <td className="hideable-column">{product.category.name}</td>
                                        <td className="hideable-column">{product.enabled}</td>
                                        <td>
                                            <a className="fas fa-file-alt icon-green link-detail" href="/Admin/products/detail/1" title="View details of this product"></a>
                                            &nbsp;

                                            <a className="fas fa-edit icon-green" href="/Admin/products/edit/1" title="Edit this product"></a>
                                            &nbsp;
                                            <a className="fas fa-trash icon-red link-delete" href="/Admin/products/delete/1" entityid="1" title="Delete this product"></a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}