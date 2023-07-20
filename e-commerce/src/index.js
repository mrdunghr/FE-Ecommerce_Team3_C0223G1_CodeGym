import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

import Login from "./pages/login";
import RouterHome from "./Router";
import CustomerHome from "./pages/customer/customerHome";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
            {/*<Login></Login>*/}
          {/*<RouterHome></RouterHome>*/}
          <CustomerHome></CustomerHome>
      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
