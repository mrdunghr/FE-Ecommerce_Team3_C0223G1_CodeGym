import {Link, useNavigate} from "react-router-dom";
import "./header.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import {useEffect, useState} from "react";
import {createAction} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {Badge} from "@mui/material";
const updateNotify = createAction("addNotify")
const updateStatus = createAction("update")
const updateTracks = createAction("updateTracks")
export default function CustomerHeader(){
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const status = useSelector(state => state.update)
    const [shop, setShop] = useState([])
    const noti = useSelector(state => state.notify)
    const tracks = useSelector(state => state.tracks)

    console.log(tracks)
    // console.log(tracks)
    const logout = () =>{
        sessionStorage.setItem('user', null)
        dispatch(updateStatus())
        navigate('/')
    }
    const [search, setSearch] = useState()
    const searchSomething = () =>{
        dispatch(updateStatus())
        navigate('/product/search/' + search)
    }
    useEffect(() => {
        if(user !== null){
            axios.get('http://localhost:8080/api/v1/shop/' + user.id).then(res => {
                setShop(res.data.content)
            })
            axios.get('http://localhost:8080/api/v1/push-notifications/find-all/' + user.id).then(res =>{
                console.log(res.data)
                dispatch(updateTracks(res.data))
            })
            const sse = new EventSource('http://localhost:8080/api/v1/push-notifications/' + user.id)
            sse.addEventListener("user-list-event", (event) => {
                const data = JSON.parse(event.data);
                if (data.length > 0){
                    dispatch(updateNotify(data.length))
                }
            });

            sse.onerror = () => {
                sse.close();
            };
            return () => {
                sse.close();
            };
        }

    }, [status, noti])


    return(
        <>
            <div id={'cus-header'}>
                <div id={'header'}>
                    <div id={'first-header'}>
                        <Link to={''}>SHOP EVENTS & SAVE UP TO 50% OFF</Link>
                        <Link to={""}>Call us: <span style={{fontFamily : "Arial", letterSpacing : "2px"}}>0975163309</span></Link>
                        {user === null ? <></> : shop.length === 0 ? <Link to={'/customer/profile/add-shop'}>Become a seller now!</Link> : <Link to={'/customer/profile'}>Seller Central Cee</Link>}
                    </div>
                    <div id={'second-header'}>
                        {/*<Link to={'/'}><HomeIcon></HomeIcon></Link>*/}
                        {user === null ? <></> :
                            <>
                                <div id={'notify'}>
                                        <Link id={'dropdown-id'}>
                                            <Badge badgeContent={noti}>
                                                <NotificationsNoneIcon></NotificationsNoneIcon>
                                            </Badge>
                                            <div id={'notifies'}>
                                                {tracks.length === 0 ? null : tracks.filter(item => item.id !== -1).map(track => {
                                                    return(
                                                        <div className={'order-tracks'}>
                                                            {track.content}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </Link>
                                </div>
                            </>}
                        {user === null ? <></> : <Link><span>Hi, {user.firstName}</span></Link>}
                        {user === null ? <></> : <Link to={'/customer/cart'}><ShoppingCartIcon></ShoppingCartIcon></Link>}
                        {user === null ? <Link to={'/login'}><LoginIcon></LoginIcon></Link> : <Link><LogoutIcon onClick={logout}></LogoutIcon></Link>}
                    </div>
                </div>
                <div id={'navbar'}>
                    <div id={'logo'}>
                        <Link to={'/'}><img src="/image/logo.png" alt=""/></Link>
                    </div>
                    <div id={'main-navbar'}>
                        <input type="text" style={{paddingLeft : "10px"}}  onChange={(e) => setSearch(e.target.value)}/>
                        <button onClick={searchSomething} id={'search-btn'}><SearchIcon></SearchIcon></button>
                    </div>
                </div>
            </div>
        </>
    )
}