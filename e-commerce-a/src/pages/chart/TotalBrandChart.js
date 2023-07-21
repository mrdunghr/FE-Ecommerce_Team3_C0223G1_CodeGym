export default function TotalBrandChart(){
    return(
        <div className="col-12 col-md-3">
            <div className="card card-statistic">
                <div className="card-body p-0">
                    <div className="d-flex flex-column">
                        <div className="px-3 py-3 d-flex justify-content-between">
                            <h3 className="card-title">Total Brands</h3>
                            <div className="card-right d-flex align-items-center">
                                <p>12</p>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <div className="chartjs-size-monitor">
                                <div className="chartjs-size-monitor-expand">
                                    <div className=""></div>
                                </div>
                                <div className="chartjs-size-monitor-shrink">
                                    <div className=""></div>
                                </div>
                            </div>
                            {/*<canvas id="canvas3" style="height: 100px; display: block; width: 261px;"*/}
                            {/*        width="261" height="100"*/}
                            {/*        className="chartjs-render-monitor"></canvas>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}