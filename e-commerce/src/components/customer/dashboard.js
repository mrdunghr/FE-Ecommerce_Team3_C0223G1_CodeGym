import "./dashboard.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
export default function Dashboard(){
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const [shops, setShops] = useState([])
    const status = useSelector(state => state.update)
    useEffect(() => {
        const tabs = document.querySelectorAll('.tab-dashboard')
        const tab = tabs[0]
        tab.classList.add('active')
        tabs.forEach((tab, index)=> {
            tab.addEventListener('click', e => {
                tabs.forEach(tab => tab.classList.remove('active'))
                tab.classList.add('active')
            })
        })
        axios.get("http://localhost:8080/api/v1/shop/" + user.id + "?list=true").then((res) => {
            console.log(res.data)
            setShops(res.data)
        })
    }, [status])
    return(
        <>
            <div id={'dashboard-sidebar'}>
                <div id={'nav-dashboard'}>
                    <div id={'first-nav'}>
                        <img src="/image/avatar/avatar-1.png" alt=""/>
                        <h2>{user === null ? null : user.firstName}</h2>
                    </div>
                    <div id={'second-nav'}>
                        <Link to={'/customer/profile'} className={'tab-dashboard'}>Dashboard</Link>
                        {shops.length > 0 ?  <Link to={'order-manager'} className={'tab-dashboard'}>Manage Orders</Link> : <Link className={'tab-dashboard'} to={'add-shop'}>Add New Shop</Link>}
                        <Link to={'product-manager'} className={'tab-dashboard'}>Manage Products</Link>
                        <Link to={'update-customer'} className={'tab-dashboard'}>Edit Customer</Link>
                        <Link to ={'change-password'} className={'tab-dashboard'}>Change Password</Link>
                    </div>
                </div>
            </div>
            <div id={'dashboard-main'}>

            </div>
        </>
    )
}