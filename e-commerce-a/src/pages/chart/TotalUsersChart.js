import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import 'chart.js/auto'; // Import thư viện chart.js

export default function TotalUsersChart() {
    // Dữ liệu mẫu cho biểu đồ
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Total Users',
                data: [12, 19, 3, 5, 2, 3, 9], // Thay đổi dữ liệu tương ứng với số lượng người dùng trong các tháng
                backgroundColor: 'rgb(57,248,6)',
                borderColor: 'rgb(245,10,81)',
                borderWidth: 1,
            },
        ],
    };

    // Cấu hình biểu đồ
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="col-12 col-md-3">
            <div className="card card-statistic">
                <div className="card-body p-0">
                    <div className="d-flex flex-column">
                        <div className="px-3 py-3 d-flex justify-content-between">
                            <h3 className="card-title">Total Users</h3>
                            <div className="card-right d-flex align-items-center">
                                <p>25 </p>
                            </div>
                        </div>
                        <div className="chart-wrapper">
                            <Line data={data} options={options} /> {/* Thêm biểu đồ Bar */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
