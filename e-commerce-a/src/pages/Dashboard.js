import '../style-all/css/app.css';
import '../style-all/css/bootstrap.css';
import TotalUsersChart from "./chart/TotalUsersChart";
import TotalCategoryChart from "./chart/TotalCategoryChart";
import TotalBrandChart from "./chart/TotalBrandChart";
import TotalCustomerChart from "./chart/TotalCustomerChart";
import ShippingRateChart from "./chart/ShippingRateChart";
import TotalViewChart from "./chart/TotalViewChart";
import TotalMenuChart from "./chart/TotalMenuChart";
import ShopsChart from "./chart/ShopsChart";

export default function Dashboard() {
    return (
        <>
            <div className="main-content container-fluid">
                <div className="page-title">
                    <h3>Dashboard</h3>
                    <p className="text-subtitle text-muted">A good dashboard to display your statistics</p>
                </div>
                <section className="section">
                    <div className="row mb-2">
                        <TotalUsersChart/>
                        <TotalCategoryChart/>
                        <TotalBrandChart/>
                        <TotalCustomerChart/>

                        <ShippingRateChart/>
                        <TotalViewChart/>
                        <TotalMenuChart/>
                        <ShopsChart/>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-heading p-1 pl-3">Total Orders</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4 col-12">
                                            <div className="pl-3">
                                                <h1 className="mt-5">14</h1>
                                                <div className="legends">
                                                    <div className="legend d-flex flex-row align-items-center">
                                                        <div className="w-3 h-3 rounded-full bg-success me-2"></div>
                                                        {/*<span className="text-xs">New <b*/}
                                                        {/*    style="color: red;">5</b></span>*/}
                                                    </div>
                                                    <div className="legend d-flex flex-row align-items-center">
                                                        <div className="w-3 h-3 rounded-full bg-info me-2"></div>
                                                        {/*<span className="text-xs">Delivered <b style="color: red;">1</b></span>*/}
                                                    </div>
                                                    <div className="legend d-flex flex-row align-items-center">
                                                        <div className="w-3 h-3 rounded-full bg-blue me-2"></div>
                                                        {/*<span className="text-xs">Processing <b*/}
                                                        {/*    style="color: red;">0</b></span>*/}
                                                    </div>
                                                    <div className="legend d-flex flex-row align-items-center">
                                                        <div className="w-3 h-3 rounded-full bg-yellow me-2"></div>
                                                        {/*<span className="text-xs">Shipping <b style="color: red;">0</b></span>*/}
                                                    </div>
                                                    <div className="legend d-flex flex-row align-items-center">
                                                        <div className="w-3 h-3 rounded-full bg-red me-2"></div>
                                                        {/*<span className="text-xs">Cancelled <b style="color: red;">1</b></span>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-12">
                                            <div className="chartjs-size-monitor">
                                                <div className="chartjs-size-monitor-expand">
                                                    <div className=""></div>
                                                </div>
                                                <div className="chartjs-size-monitor-shrink">
                                                    <div className=""></div>
                                                </div>
                                            </div>
                                            {/*<canvas id="bar" style="display: block; width: 447px; height: 223px;"*/}
                                            {/*        width="447" height="223"*/}
                                            {/*        className="chartjs-render-monitor"></canvas>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4">

                            <div className="card widget-todo">
                                <div
                                    className="card-header border-bottom d-flex justify-content-between align-items-center">
                                    <h4 className="card-title d-flex">
                                        <i className="bx bx-check font-medium-5 pl-25 pr-75"></i>Products
                                    </h4>

                                </div>
                                <div className="card-body px-0 py-1">
                                    <table className="table table-borderless">
                                        <tbody>
                                        <tr>
                                            <td className="col-3">Total Products</td>
                                            <td className="col-6">
                                                <div className="progress progress-info">
                                                    {/*<div className="progress-bar" role="progressbar" style="width: 60%"*/}
                                                    {/*     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>*/}
                                                </div>
                                            </td>
                                            <td className="col-3 text-center">25</td>
                                        </tr>
                                        <tr>
                                            <td className="col-3">Enabled</td>
                                            <td className="col-6">
                                                <div className="progress progress-success">
                                                    {/*<div className="progress-bar" role="progressbar" style="width: 35%"*/}
                                                    {/*     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>*/}
                                                </div>
                                            </td>
                                            <td className="col-3 text-center">25</td>
                                        </tr>
                                        <tr>
                                            <td className="col-3">Disabled</td>
                                            <td className="col-6">
                                                <div className="progress progress-danger">
                                                    {/*<div className="progress-bar" role="progressbar" style="width: 50%"*/}
                                                    {/*     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>*/}
                                                </div>
                                            </td>
                                            <td className="col-3 text-center">0</td>
                                        </tr>
                                        <tr>
                                            <td className="col-3">In Stock</td>
                                            <td className="col-6">
                                                <div className="progress progress-primary">
                                                    {/*<div className="progress-bar" role="progressbar" style="width: 80%"*/}
                                                    {/*     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>*/}
                                                </div>
                                            </td>
                                            <td className="col-3 text-center">25</td>
                                        </tr>
                                        <tr>
                                            <td className="col-3">Out of Stock</td>
                                            <td className="col-6">
                                                <div className="progress progress-secondary">
                                                    {/*<div className="progress-bar" role="progressbar" style="width: 65%"*/}
                                                    {/*     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>*/}
                                                </div>
                                            </td>
                                            <td className="col-3 text-center">0</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}