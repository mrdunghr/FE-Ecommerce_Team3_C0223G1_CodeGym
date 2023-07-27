import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Categories() {
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        fetchListS();
    }, []);
    const fetchListS = () => {
        axios
            .get(`http://localhost:8080/api/v1/category/all`)
            .then(response => {
                const data = response.data;
                console.log(response)
                setListCategory(data);
            })
            .catch(error => {
                console.log(error);
            });
    }; // hàm hiển thị danh sách

    const handleToggleCategoryStatus = (categoryId, currentStatus) => {
        // Tính toán trạng thái mới (nghịch đảo của trạng thái hiện tại)
        const newStatus = !currentStatus;
        console.log(newStatus)

        axios
            .put(`http://localhost:8080/api/v1/category/${categoryId}/enabled/${newStatus}`)
            .then((response) => {
                console.log("Thay đổi trạng thái category thành công:", response.data);
                // Sau khi thay đổi thành công, cập nhật danh sách category bằng cách gọi fetchListS
                fetchListS();
            })
            .catch((error) => {
                console.error("Lỗi khi thay đổi trạng thái category:", error);
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
                            <h3>Manage Categories </h3> <br/>
                            <Link to="/category/add-category" className="fas fa-user-plus fa-2x mr-2" title="Add New Category"></Link>
                            &nbsp;&nbsp;
                            <a href="/Admin/categories/export/csv" className="fas fa-file-csv fa-2x mr-2 icon-success"
                               title="Export to CSV"></a>
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
                                    <th>Category Image</th>
                                    <th>
                                        <a class="text-muted" href="/Admin/categories/page/1?sortField=name&amp;sortDir=desc">Category Name</a>
                                        <span class="fas fa-sort-up"></span>
                                    </th>
                                    <th class="hideable-column">Alias</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {listCategory.map((category, i) => (
                                        <tr key={listCategory.id}>
                                            <td className="hideable-column">{category.id}</td>
                                            <td>
                                                <img src={category.image} style={{width : "100px"}}/>
                                            </td>
                                            <td className="hideable-column">{category.name}</td>
                                            <td className="hideable-column">{category.alias}</td>
                                            <td>
                                                <a
                                                    className={`fas ${category.enabled ? "fa-check-circle icon-green" : "fa-times-circle icon-red"}`}
                                                    title={category.enabled ? "Disable this Category" : "Enable this Category"}
                                                    onClick={() => handleToggleCategoryStatus(category.id, category.enabled)}
                                                    style={{ color: category.enabled ? "green" : "red" }}
                                                ></a>
                                            </td>
                                            <td>action</td>
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