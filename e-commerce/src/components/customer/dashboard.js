import "./dashboard.css"
import {Link} from "react-router-dom";
export default function Dashboard(){
    return(
        <>
            <div id={'dashboard-sidebar'}>
                <div id={'nav-dashboard'}>
                    <div id={'first-nav'}>
                        <img src="/image/avatar/avatar-1.png" alt=""/>
                        <h2>Hieu</h2>
                    </div>
                    <div id={'second-nav'}>
                        <Link to={'/customer/profile'}>Dashboard</Link>
                        <Link to={'add-shop'}>Add New Shop</Link>
                        <Link to={'/product-manager'}>Manage Products</Link>
                    </div>
                </div>
            </div>
            <div id={'dashboard-main'}>

            </div>
        </>
    )
}