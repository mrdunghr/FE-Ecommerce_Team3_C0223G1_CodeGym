import "./dashboard.css"
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
                        <span>Dashboard</span>
                        <span>Add New Shop</span>
                        <span>Manage Products</span>
                    </div>
                </div>
            </div>
            <div id={'dashboard-main'}>

            </div>
        </>
    )
}