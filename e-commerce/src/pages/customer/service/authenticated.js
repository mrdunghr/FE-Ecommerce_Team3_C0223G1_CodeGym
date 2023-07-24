import {useNavigate} from "react-router-dom";


const CheckLogin = () =>{
    const navigate = useNavigate()
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user === null){
        navigate('/login')
    }
}