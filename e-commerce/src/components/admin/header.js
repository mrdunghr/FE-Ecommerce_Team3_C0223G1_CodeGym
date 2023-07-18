import "./header.css";
import {useState} from "react";
export default function Header() {
    const [customer, setCustomer] = useState({name : 'default'})
    return(
        <>
            <div id={'header'}>
                <p>Hi, {customer.name}</p>
            </div>
        </>
    )
}