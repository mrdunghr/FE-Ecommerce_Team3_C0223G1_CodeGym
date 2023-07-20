import "./shop.css"

 export const Shop = () =>{

    return(
        <>
            <div id={'shop-container'}>
                <p>Manage Shops</p>
                <div id={'main-shop'}>
                    <input type="text" placeholder={'Search'} id={'search'}/>
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
                        <tr>
                            <td>1</td>
                            <td>Hieu</td>
                            <td>None</td>
                            <td>HN</td>
                            <td>20/09/2001</td>
                            <td>OK</td>
                            <td>Rat OK</td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
}
export const CreateShop = () =>{
    return(
        <>
            <div id={'shop-container'}>
                <p>Add new shop</p>
                <div id={'main-shop'}>
                    <div id={'first-main-shop'}>
                        <input type="text" placeholder={'Name'}/>
                        <input type="text" placeholder={''}/>
                        <button>Save change</button>
                    </div>
                    <div id={'second-main-shop'}>
                        <input type="text" placeholder={'Delivery Address'}/>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}