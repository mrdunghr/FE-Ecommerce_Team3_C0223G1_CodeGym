import "./orders.css"

export const OrdersManage = () =>{


    return(
        <div id={'order-display'}>
            <div id={'main-order'}>
                <div id={'main-order-header'}>
                    <div className={'order-item-info'}>
                        <b>Product</b>
                    </div>
                    <div className={'order-item'}>
                        <b>Quantity</b>
                    </div>
                    <div className={'order-item'}>
                        <b>Status</b>
                    </div>
                    <div className={'order-item'}>
                        <b>Customer</b>
                    </div>
                    <div className={'order-action'}>
                        <b>Action</b>
                    </div>
                </div>
                <div id={'main-order-main'}>
                    <div className={'orders'}>
                        <div className={'order-item-info'}>
                            <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                            <b>This product name</b>
                        </div>
                        <div className={'order-item'}>
                            <span>33</span>
                        </div>
                        <div className={'order-item'}>
                            <div className={'order-status'}>New</div>
                        </div>
                        <div className={'order-item'}>
                            <b>Ten tao la</b>
                        </div>
                        <div className={'order-action'}>
                            <button>Confirm</button>
                            <button>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}