export default function AddBrand(){
    return(
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
                        <h3>Manage Brands | Create New Brand</h3>
                    </div>

                    <form action="#" method="post">
                        <input type="hidden" name="_csrf" value="2c985357-d0ab-4f11-8927-dc2082dfad9c"/>
                        <input type="hidden" id="id" name="id" value=""/>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="email-id-column">Name</label>
                                            <input type="text" className="form-control" required="" minLength="3" maxLength="128" id="name" name="name" value=""/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="username-column">Image</label>
                                            <input type="hidden" id="logo" name="logo" value=""/>
                                                <input type="file" name="fileImage" id="fileImage" accept="image/*" required="required"/>
                                                    <img id="thumbnail" alt="Image preview" src="/image-thumbnail.png" className="img-fluid" style={{height: "100px"}}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="last-name-column">Select one or more categories</label>
                                            <input type="hidden" name="_categories" value="1"/>
                                                <select className="form-control" multiple="" required="" style={{resize: "vertical", height: "200px"}} id="categories" name="categories">

                                                    <option value="10">Automotive</option>

                                                    <option value="30">--Bike, E-bike</option>

                                                </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6 col-12">
                                        <div class="form-group">
                                            <label for="username-column">Chosen categories</label>
                                            <div id="chosenCategories"></div>

                                        </div>
                                    </div>



                                </div>


                                <div class="clearfix">
                                    <div class="text-center">
                                        <input type="submit" value="Submit" class="btn btn-primary m-3"/>
                                            <input type="button" value="Cancel" class="btn btn-danger" id="buttonCancel"/>
                                    </div>
                                </div>
                            </div>
                    </form>

                    <div class="modal fade text-center" id="modalDialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="modalTitle">Warning</h4>
                                    <button type="button" class="close" data-bs-dismiss="modal">×</button>
                                </div>

                                <div class="modal-body">
                                    <span id="modalBody"></span>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}