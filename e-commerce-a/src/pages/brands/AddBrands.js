import React, {useEffect, useState} from "react";
import axios from "axios";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "../firebase";
import {set} from "../../style-all/js/feather-icons/feather";

export default function AddBrand(){
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [chosenCategories, setChosenCategories] = useState([]);

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

    const handleCategorySelect = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions);
        const selectedCategories = selectedOptions.map(
            (option) => listCategory.find((category) => category.id === parseInt(option.value))
        );
        setChosenCategories(selectedCategories);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setName(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            uploadImageToFirebaseStorage(file); // Thêm dòng này để tải hình ảnh lên Firebase Storage
        }
    };
    const uploadImageToFirebaseStorage = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, "images/" + file.name);
            await uploadBytes(storageRef, file);
            const imageURL = await getDownloadURL(storageRef);
            setName(imageURL);
        } catch (error) {
            console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
        }
    };

    const handleSubmit =  async (event) => {
        event.preventDefault();
        const data = {
            name: name,
            logo: logo,
            categories: chosenCategories
        };
        console.log(data)

        try {
            const response = await axios.post("http://localhost:8080/api/v1/brand/create-brand", data);
            // Xử lý phản hồi theo cần thiết
            console.log("Tạo brand thành công:", response.data);
            alert("Tạo brand thành công")

            // Sau khi tạo thành công, reset tất cả dữ liệu đã chọn và nhập
            // resetForm();
        } catch (error) {
            console.error("Lỗi khi tạo brand:", error);
        }
    };

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

                    <form onSubmit={handleSubmit} action="#" method="post">
                        <input type="hidden" name="_csrf" value="2c985357-d0ab-4f11-8927-dc2082dfad9c"/>
                        <input type="hidden" id="id" name="id" value=""/>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="email-id-column">Name</label>
                                            <input type="text" className="form-control" required="" minLength="3" maxLength="128" id="name" name="name" value={logo}
                                                onChange={(e) => setLogo(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="username-column">Image</label>
                                            <input type="hidden" id="logo" name="logo" value=""/>
                                            <input type="file" name="image" id="fileImage" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange}/>
                                            {name ? (
                                                <img id="thumbnail" alt="Image preview" src={name} className="img-fluid" style={{height: "100px"}} />
                                            ) : (
                                                <img id="thumbnail" alt="Image preview" src="/image-thumbnail.png" className="img-fluid" style={{height: "100px"}} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="last-name-column">Select one or more categories</label>
                                            <select className="form-control" multiple required style={{ resize: "vertical", height: "200px" }} id="categories" name="categories" onChange={handleCategorySelect}>
                                                {listCategory.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="username-column">Chosen categories</label>
                                            <div id="chosenCategories">
                                                {chosenCategories.map((category) => (
                                                    <span className="badge bg-warning text-dark m-1" key={category.id}>{category.name}</span>))}
                                            </div>
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