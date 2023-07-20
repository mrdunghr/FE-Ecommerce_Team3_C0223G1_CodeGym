import "./shop.css"

export const Shop = () =>{

    return(
        <>
            <div id={'shop-container'}>
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