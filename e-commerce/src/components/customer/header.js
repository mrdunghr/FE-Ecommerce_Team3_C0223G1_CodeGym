import {Link, useNavigate} from "react-router-dom";
import "./header.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import {useState} from "react";

export default function CustomerHeader(){
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const logout = () =>{
        sessionStorage.setItem('user', null)
        navigate('/')
    }
    const [search, setSearch] = useState()
    console.log(search)
    const searchSomething = () =>{
        navigate('/product/search/' + search)
    }

    return(
        <>
            <div id={'cus-header'}>
                <div id={'header'}>
                    <div id={'first-header'}>
                        <Link to={''}>SHOP EVENTS & SAVE UP TO 50% OFF</Link>
                        <Link to={""}>Call us: <span style={{fontFamily : "Arial", letterSpacing : "2px"}}>0975163309</span></Link>
                        {user === null ? <></> : <Link to={'/customer/profile'}>Seller Centre</Link>}
                    </div>
                    <div id={'second-header'}>
                        <Link to={'/'}>Home</Link>
                        <Link>Question & Answer</Link>
                        {user === null ? <></> : <Link><span>Hi, {user.firstName}</span></Link>}
                        {user === null ? <></> : <Link to={'/customer/cart'}><ShoppingCartIcon></ShoppingCartIcon></Link>}
                        {user === null ? <Link to={'/login'}><LoginIcon></LoginIcon></Link> : <LogoutIcon onClick={logout}></LogoutIcon>}
                    </div>
                </div>
                <div id={'navbar'}>
                    <div id={'logo'}>
                        <Link to={'/'}><img src="/image/logo.png" alt=""/></Link>
                    </div>
                    <div id={'main-navbar'}>
                        <input type="text" style={{paddingLeft : "10px"}} onChange={(e) => setSearch(e.target.value)}/>
                        <button onClick={searchSomething}><SearchIcon></SearchIcon></button>
                    </div>
                </div>
            </div>
        </>
    )
}