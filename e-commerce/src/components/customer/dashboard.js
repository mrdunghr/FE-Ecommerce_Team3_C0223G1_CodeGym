import "./dashboard.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
export default function Dashboard(){
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const [shops, setShops] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/shop/" + user.id + "?list=true").then((res) => {
            console.log(res.data)
            setShops(res.data)
        })
    }, [])
    return(
        <>
            <div id={'dashboard-sidebar'}>
                <div id={'nav-dashboard'}>
                    <div id={'first-nav'}>
                        <img src="/image/avatar/avatar-1.png" alt=""/>
                        <h2>{user === null ? null : user.firstName}</h2>
                    </div>
                    <div id={'second-nav'}>
                        <Link to={'/customer/profile'}>Dashboard</Link>
                        {shops.length > 0 ?  <Link to={'order-manager'}>Manage Orders</Link> : <Link to={'add-shop'}>Add New Shop</Link>}
                        <Link to={'product-manager'}>Manage Products</Link>
                    </div>
                </div>
            </div>
            <div id={'dashboard-main'}>

            </div>
        </>
    )
}