import "./shop.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "../../../firebase";
 export const Shop = () =>{
    const [shops, setShops] = useState([])
     const user = JSON.parse(sessionStorage.getItem('user'))
     const navigate = useNavigate()
     const [page, setPage] = useState(0)
     const [update, setUpdate] = useState(false)
     const [search, setSearch] = useState('')
     useEffect(() => {
         if(user === null){
              navigate('/login')
         }else{
         axios.get("http://localhost:8080/api/v1/shop/" + user.id + "?page=" +page).then((res) => {
             console.log(res.data.content)
             setShops(res.data.content)

         })}
     }, [page, update, search])

     const disableStatusShop = (id) => {
        Swal.fire({
            title : "Are you sure you want to disable this shop!",
            showCancelButton : true
        }).then(res => {
           if(res.isConfirmed){
               axios.put('http://localhost:8080/api/v1/shop/' + id +'/close').then((res) =>{
                   if(update){
                       setUpdate(false)
                   }else{
                       setUpdate(true)
                   }
                   Swal.fire("Disable success!")
               }).catch(erros => {
                   Swal.fire("Something went wrong!")
               })
           }else{

           }
        })
     }
     const enabledStatusShop = (id) =>{
         Swal.fire({
             title : "Active this shop !?",
             showCancelButton : true
         }).then(res => {
             if(res.isConfirmed){
                 axios.put('http://localhost:8080/api/v1/shop/' + id +'/open').then((res) =>{
                     if(update){
                         setUpdate(false)
                     }else{
                         setUpdate(true)
                     }
                     Swal.fire("Active success!")
                 }).catch(erros => {
                     Swal.fire("Something went wrong!")
                 })
             }
         })
     }
     const handlePrevPage = () => {
         if (page > 0) {
             setPage((prevPage) => prevPage - 1);
         }
         console.log(page)
     };

     const handleNextPage = () => {
         if (shops.length > 1) { // điều kiện list có length > 1 thì không được next nữa, nhỏ hơn mới được tăng giá trị page
             setPage((prevPage) => prevPage + 1);
         }
     };
    return(
        <>
            <div id={'shop-container'}>
                <p>Manage Shops</p>
                <div id={'main-shop'}>
                    <input type="text" placeholder={'Search'} id={'search'} onChange={(e) => setSearch(e.target.value)}/>
                    <table id={'table-shop'}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Delivery Address</th>
                            <th>Created Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {shops.filter(item => item.name.toLowerCase().includes(search)).map(shop => {
                            return(
                                <tr>
                                    <td>{shop.id}</td>
                                    <td>{shop.name}</td>
                                    <td>{shop.image === ".png" ? <img src={'/image/image-thumbnail.png'}></img> : <img src={shop.image} width={"120px"} height={'100px'}></img>}</td>
                                    <td>{shop.deliveryAddress}</td>
                                    <td>{shop.createdTime}</td>
                                    <td>{shop.enabled ? <span className={'active-shop'} style={{fontSize : "15px"}}>Active</span> : <p className={'inactive-shop'} style={{fontSize : "15px"}}>Inactive</p>}</td>
                                    <td>{shop.enabled ? <BlockIcon className={'block-icon product-icon'} onClick={() => disableStatusShop(shop.id)}></BlockIcon> : <KeyIcon className={'key-icon product-icon'} onClick={() => enabledStatusShop(shop.id)}></KeyIcon>} <EditIcon></EditIcon></td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div>
                    <button onClick={handlePrevPage}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </>
    )
}
export const CreateShop = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [selectedImage, setSelectedImage] = useState(null)
    const [urlImage, setUrlImage ] = useState("")

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            uploadImageToFirebaseStorage(file).then(r => {
            }); // Thêm dòng này để tải hình ảnh lên Firebase Storage
        }
    };
    const uploadImageToFirebaseStorage = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, "images/" + file.name);
            await uploadBytes(storageRef, file);
            const imageURL = await getDownloadURL(storageRef);
            console.log(imageURL)
            setUrlImage(imageURL);
        } catch (error) {
            console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
        }
    };
    return(
        <Formik
            initialValues={{
                name : "",
                deliveryAddress : "",
                customer : user,
                alias : "",
                image : urlImage
            }}
            onSubmit={(values) =>{
                console.log(values)
                axios.post('http://localhost:8080/api/v1/shop/create', values).then((res) => {
                    console.log(res)
                    Swal.fire("Create success!")
                }).catch((errors) => {
                    console.log(errors)
                    Swal.fire("Something went wrong!")
                })
            }}
            enableReinitialize={true}
        >
            <Form>
            <div id={'shop-container-create'}   >
                <div id={'main-shop'}>
                    <div id={'first-main-shop'}>
                        <Field name={'name'} placeholder={'Name'}/>
                        <Field name={'alias'} placeholder={'Alias'}/>
                        <input type="file" onChange={handleImageChange}/>
                        <button type={'submit'}>Save change</button>
                    </div>
                    <div id={'second-main-shop'}>
                        <Field name={'deliveryAddress'} placeholder={'Delivery Address'}/>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <button type={'reset'}>Cancel</button>
                    </div>
                </div>
            </div>
            </Form>
        </Formik>
    )
}