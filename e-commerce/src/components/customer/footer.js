import "./footer.css"
export const CustomerFooter = () => {
    return(
        <>
            <div id={'cus-footer'}>
                <div id={'footer-nav'}>
                    <div className={'footer-nav-item'}>
                        <div className={'footer-nav-item-image'}></div>
                        <div className={'footer-nav-item-description'}>
                            <h2>Free Delivery</h2>
                            <p>For all order over $99</p>
                        </div>
                    </div>
                    <div className={'footer-nav-item'}>
                        <div className={'footer-nav-item-image'}></div>
                        <div className={'footer-nav-item-description'}>
                            <h2>30 Days Return</h2>
                            <p>If good have Problems</p>
                        </div>
                    </div>
                    <div className={'footer-nav-item'}>
                        <div className={'footer-nav-item-image'}></div>
                        <div className={'footer-nav-item-description'}>
                            <h2>Secure Payment</h2>
                            <p>100% secure payment</p>
                        </div>
                    </div>
                    <div className={'footer-nav-item'} style={{border : "none"}}>
                        <div className={'footer-nav-item-image'}></div>
                        <div className={'footer-nav-item-description'}>
                            <h2>24/7 Support</h2>
                            <p>Dedicated support</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}