import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import '../style-all/css/app.css';
import '../style-all/css/bootstrap.css';
import {Outlet} from "react-router-dom";

export default function Home() {
    return (
        <>
            <div id="app">
                <Sidebar/>
                <div id="main">
                    <Header/>
                    <Outlet/>
                    <Footer/>
                </div>
            </div>
        </>
    );
}