export default function Categories() {
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
                            <a href="/Admin/categories/new" className="fas fa-calendar-plus fa-2x mr-2"
                               title="Add New Category"></a>
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
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}