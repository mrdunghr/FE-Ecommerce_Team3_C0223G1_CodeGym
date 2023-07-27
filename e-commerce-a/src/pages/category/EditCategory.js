import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "../firebase";

export default function EditCategory(){
    const [categoryName, setCategoryName] = useState('');
    const [aliasName, setAliasName] = useState('');
    const [enabled, setEnabled] = useState(true)
    const [selectedImage, setSelectedImage] = useState(null)

    const { categoryId } = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        // Gọi API để lấy thông tin người dùng cần chỉnh sửa dựa vào userId
        axios
            .get(`http://localhost:8080/api/v1/category/${categoryId}`)
            .then((response) => {
                const categoryData = response.data;
                setCategory(categoryData);
                // Cập nhật các state với thông tin của user từ API
                setCategoryName(categoryData.name)
                setAliasName(categoryData.alias)
                setEnabled(categoryData.enabled)
                setSelectedImage(categoryData.image)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [categoryId]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
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
            setSelectedImage(imageURL);
        } catch (error) {
            console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
        }
    };
    const handleSubmit =  async (event) => {
        event.preventDefault();
        const data = {
            name: categoryName,
            alias: aliasName,
            enabled: enabled,
            image: selectedImage, // cái này giờ không còn tên ảnh web nữa mà là link ảnh firebase
        };

        console.log(data)
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/category/${categoryId}`, data);
            // Xử lý phản hồi theo cần thiết
            console.log("Sửa người dùng thành công:", response.data);
            alert("Sửa người dùng thành công")

        } catch (error) {
            console.error("Lỗi khi sửa người dùng:", error);
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
                        <h3>Manage Categories | Create New Category</h3>
                    </div>
                    <form onSubmit={handleSubmit} action="#" method="post">
                        <input type="hidden" name="_csrf" value="f9a971d8-cf26-4bf0-a5bf-152cf824e414"/>
                        <input type="hidden" id="id" name="id" value=""/>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email-id-column">Category Name</label>
                                        <input type="text" className="form-control" required="" minLength="3" maxLength="128" id="name" name="name" value={categoryName}
                                               onChange={(e) => setCategoryName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="first-name-column">Alias</label>
                                        <input type="text" required="" minLength="3" maxLength="64" className="form-control" name="alias" id="alias" value={aliasName}
                                               onChange={(e) => setAliasName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="username-column">Status</label>
                                        <input type="checkbox" id="enabled1" name="enabled" value="true" checked={enabled}
                                               onChange={(e) => setEnabled(e.target.checked)}/>
                                        <input type="hidden" name="_enabled" value={enabled ? 'on' : ''} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <label htmlFor="username-column">image</label>
                                        <input type="hidden" id="photos" name="photos" value="" />
                                        <input type="file" name="image" id="fileImage" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange}/>
                                        {selectedImage ? (
                                            <img id="thumbnail" alt="Image preview" src={selectedImage} className="img-fluid" style={{ height: '150px' }}/>
                                        ) : (
                                            <img id="thumbnail" alt="Image preview" src="/image-thumbnail.png" className="img-fluid" style={{ height: '150px' }}/>)}
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix">
                                <div className="text-center">
                                    <input type="submit" value="Submit" className="btn btn-primary m-3"/>
                                    <Link to={"/categories"}><input type="button" value="Cancel" className="btn btn-danger" id="buttonCancel" /></Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}