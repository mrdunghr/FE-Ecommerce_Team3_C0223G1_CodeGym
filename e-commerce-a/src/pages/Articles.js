import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Articles() {
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
                        <h3>Manage Articles </h3> <br/>
                        <a href="#" className="fas fa-folder-plus fa-2x icon-dark mr-2">
                            &nbsp;Add New Articles
                        </a>
                    </div>
                    <div className="card-body">
                        <div>
                            <form action="#" className="form-inline m-3">
                                <div className="row">
                                    <div className="col-lg-4 mb-1">
                                        <div className="input-group mb-3">
                                            <input type="hidden" name="sortField" value="name"/>
                                            <input type="hidden" name="sortDir" value="asc"/>
                                            <span className="input-group-text" id="basic-addon1">
                        Filter
                      </span>
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
                                    <a className="text-muted" href="/Admin/articles/page/1?sortField=id&amp;sortDir=asc">ID</a>
                                </th>
                                <th>
                                    <a className="text-muted" href="/Admin/articles/page/1?sortField=title&amp;sortDir=desc">Title</a>
                                    <span className="fas fa-sort-up"></span>
                                </th>
                                <th className="hideable-column">
                                    <a className="text-muted" href="/Admin/articles/page/1?sortField=type&amp;sortDir=asc">Type</a>
                                </th>
                                <th>
                                    <a className="text-muted" href="/Admin/articles/page/1?sortField=user&amp;sortDir=asc">Created by</a>
                                </th>
                                <th className="hideable-column">
                                    <a className="text-muted" href="/Admin/articles/page/1?sortField=updatedTime&amp;sortDir=asc">Updated Time</a>
                                </th>
                                <th>
                                    <a className="text-muted" href="/Admin/articles/page/1?sortField=published&amp;sortDir=asc">Published</a>
                                </th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}