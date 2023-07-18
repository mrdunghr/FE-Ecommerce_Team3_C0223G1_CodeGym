import Sidebar from "../components/sidebar";
import Header from "../components/header";
import {Route, Routes} from "react-router-dom";
// import {BrowserRouter, Outlet} from "react-router-dom";

export default function HomePage(){
    return(
            <>
                <Header></Header>
                <Sidebar></Sidebar>
                <Routes>
                    <Route path={"/home"}/>
                </Routes>
            </>
    )
}