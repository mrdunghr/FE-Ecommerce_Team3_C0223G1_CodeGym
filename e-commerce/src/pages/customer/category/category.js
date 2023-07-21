import CustomerHeader from "../../../components/customer/header";
import "./category.css"
import {CustomerFooter} from "../../../components/customer/footer";

export const Category = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    return(
        <>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'banner'}>
                    <h2>Shop Details</h2>
                    <p><i className={'fa fa-home'} style={{fontSize : "26px"}}></i> / <span>Shop Details</span></p>
                </div>
                <div id={'category-display'}>
                    <div id={'category-sidebar'}>
                        <div id={'category-first-sidebar'}>
                            <h2>New Arrival</h2>
                            <hr/>
                            <div className={'sidebar-product-item'}>
                                <div className={'sidebar-product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'sidebar-product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                            <div className={'sidebar-product-item'}>
                                <div className={'sidebar-product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'sidebar-product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                            <div className={'sidebar-product-item'}>
                                <div className={'sidebar-product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'sidebar-product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                        </div>
                        <div id={'category-second-sidebar'}>
                            <button>SHOP NOW</button>
                            <img src="/image/6228c8689d1fe414adeb300a_1646839912310.jpg" alt=""/>
                        </div>
                    </div>
                    <div id={'category-main'}>
                        <b>Shop Grid</b>
                        <hr/>
                        <div id={'category-main-product'}>
                            <div className={'product'}>
                                <div className={'product-cost'}>
                                    25%
                                </div>
                                <div className={'product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                            <div className={'product'}>
                                <div className={'product-cost'}>
                                    25%
                                </div>
                                <div className={'product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                            <div className={'product'}>
                                <div className={'product-cost'}>
                                    25%
                                </div>
                                <div className={'product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={'customer-footer'}>
                    <CustomerFooter></CustomerFooter>
                </div>
            </div>
        </>
    )

}