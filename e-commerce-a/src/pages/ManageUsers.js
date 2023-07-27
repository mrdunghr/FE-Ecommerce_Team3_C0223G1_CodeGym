import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';

export default function ManageUsers() {
    const [listUser, setListUser] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchListS();
    }, [page]);

    const fetchListS = () => {
        axios
            .get(`http://localhost:8080/api/v1/account/users/list?page=${page}`)
            .then(response => {
                const data = response.data.content;
                console.log(response)
                setListUser(data);
            })
            .catch(error => {
                console.log(error);
            });
    }; // hàm hiển thị danh sách

    const handleDeleteUser = (userId) => {
        axios
            .delete(`http://localhost:8080/api/v1/users/${userId}`)
            .then((response) => {
                console.log("Xóa người dùng thành công:", response.data);
                // Sau khi xóa thành công, cập nhật danh sách người dùng bằng cách gọi fetchListS
                fetchListS();
            })
            .catch((error) => {
                console.error("Lỗi khi xóa người dùng:", error);
            });
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
        console.log(page)
    }; //2 hàm để next và back page

    const handleNextPage = () => {
        if (listUser.length > 1) { // điều kiện list có length > 1 thì không được next nữa, nhỏ hơn mới được tăng giá trị page
            setPage((prevPage) => prevPage + 1);
        }
        console.log(page)

    };

    const handleToggleUserStatus = (userId, currentStatus) => {
        // Tính toán trạng thái mới (nghịch đảo của trạng thái hiện tại)
        const newStatus = !currentStatus;
        console.log(newStatus)

        axios
            .put(`http://localhost:8080/api/v1/users/${userId}/enabled/${newStatus}`)
            .then((response) => {
                console.log("Thay đổi trạng thái người dùng thành công:", response.data);
                // Sau khi thay đổi thành công, cập nhật danh sách người dùng bằng cách gọi fetchListS
                fetchListS();
            })
            .catch((error) => {
                console.error("Lỗi khi thay đổi trạng thái người dùng:", error);
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
                            <h3>Manage Users </h3> <br/>
                            <Link to="/users/add-user" className="fas fa-user-plus fa-2x mr-2" title="Add New User"></Link>
                            &nbsp;&nbsp;
                            <a href="http://localhost:8080/api/v1/users/export/csv" className="fas fa-file-csv fa-2x mr-2 icon-success"
                               title="Export to CSV"></a>
                            &nbsp;&nbsp;
                            <a href="http://localhost:8080/api/v1/users/export/excel" className="fas fa-file-excel fa-2x mr-2 icon-excel"
                               title="Export to Excel"></a>
                            &nbsp;&nbsp;
                            <a href="http://localhost:8080/api/v1/users/export/pdf" className="fas fa-file-pdf fa-2x icon-red"
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
                                    <th className="hideable-column">
                                        <a className="text-muted" href="/Admin/users/page/1?sortField=id&amp;sortDir=asc">User ID</a>
                                    </th>
                                    <th>Photos</th>
                                    <th className="hideable-column">
                                        <a className="text-muted" href="/Admin/users/page/1?sortField=email&amp;sortDir=asc">E-mail</a>
                                    </th>
                                    <th>
                                        <a className="text-muted" href="/Admin/users/page/1?sortField=firstName&amp;sortDir=desc">First Name</a>
                                        <span className="fas fa-sort-up"></span>
                                    </th>
                                    <th>
                                        <a className="text-muted" href="/Admin/users/page/1?sortField=lastName&amp;sortDir=asc">Last Name</a>
                                    </th>
                                    <th>Roles</th>
                                    <th>
                                        <a className="text-muted" href="/Admin/users/page/1?sortField=enabled&amp;sortDir=asc">Status</a>
                                    </th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listUser.map((user, i) => (
                                    <tr key={listUser.id}>
                                        <td className="hideable-column">{user.id}</td>
                                        <td>
                                            <img src={user.photos} style={{width : "100px"}}/>
                                        </td>
                                        <td className="hideable-column">{user.email}</td>
                                        <td className="hideable-column">{user.firstName}</td>
                                        <td className="hideable-column">{user.lastName}</td>
                                        <td className="hideable-column">{user.roles[0].name}</td>
                                        <td>
                                            <a
                                                className={`fas ${user.enabled ? "fa-check-circle icon-green" : "fa-times-circle icon-red"}`}
                                                title={user.enabled ? "Disable this user" : "Enable this user"}
                                                onClick={() => handleToggleUserStatus(user.id, user.enabled)}
                                                style={{ color: user.enabled ? "green" : "red" }}
                                            ></a>
                                        </td>
                                        <td>
                                            <Link to={`/users/edit-user/${user.id}`} className="fas fa-edit icon-green" title="Chỉnh sửa người dùng"></Link>
                                            &nbsp;&nbsp;
                                            <button className="fas fa-trash icon-red link-delete" onClick={() => handleDeleteUser(user.id)} title="Delete this user"></button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-center m-1">
                            <span>Showing users # 1 to 3 of 25</span>
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