import CustomerHeader from "../../../components/customer/header";
import "./DetailProduct.css"
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
export function DetailProduct() {
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/products/detail/${id}`).then((response) => {
            const detail = response.data;
            console.log(detail);
        });
    }, []);

    return (
        <>
            <div id={"display"}>
                <div id={"customer-header"}>
                    <CustomerHeader/>
                </div>
                <div className="container" style={{paddingTop:"50px"}}>
                    <div className="row">
                        <div className="col-6" style={{textAlign: "center"}}>
                            <img src="/image/2.jpg" alt=""style={{width:"550px",height:"400px"}}/>
                        </div>
                        <div className="col-6">
                            <h4>{state.detail.name}</h4>
                            <div className="stars">
                                <form action="">
                                    <input className="star star-5" id="star-5" type="radio" name="star"/>
                                    <label className="star star-5" htmlFor="star-5"></label>
                                    <input className="star star-4" id="star-4" type="radio" name="star"/>
                                    <label className="star star-4" htmlFor="star-4"></label>
                                    <input className="star star-3" id="star-3" type="radio" name="star"/>
                                    <label className="star star-3" htmlFor="star-3"></label>
                                    <input className="star star-2" id="star-2" type="radio" name="star"/>
                                    <label className="star star-2" htmlFor="star-2"></label>
                                    <input className="star star-1" id="star-1" type="radio" name="star"/>
                                    <label className="star star-1" htmlFor="star-1"></label>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}