import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../store/themeSlice";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "../styles/colors.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Reports = () => {
    const isDarkMode = useSelector(selectIsDarkMode);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: isDarkMode ? "white" : "black",
                },
            },
            title: {
                display: true,
                color: isDarkMode ? "white" : "black",
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDarkMode ? "white" : "black",
                },
                grid: {
                    color: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                },
            },
            y: {
                ticks: {
                    color: isDarkMode ? "white" : "black",
                },
                grid: {
                    color: isDarkMode
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                },
            },
        },
    };

    const salesData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Sales",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const inventoryData = {
        labels: [
            "Product A",
            "Product B",
            "Product C",
            "Product D",
            "Product E",
        ],
        datasets: [
            {
                label: "Stock Level",
                data: [50, 30, 40, 20, 60],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const profitData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Profit",
                data: [5, 8, 1, 3, 6, 9],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div
            className={`p-6 min-h-screen transition-opacity duration-500 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
                backgroundColor: "var(--color-background)",
                color: "var(--color-text-primary)",
            }}
        >
            <h1 className="text-3xl font-bold mb-6">Reports</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                    style={{ backgroundColor: "var(--color-card-background)" }}
                >
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        Sales Report
                    </h2>
                    <Bar
                        data={salesData}
                        options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: "Monthly Sales",
                                },
                            },
                        }}
                    />
                </div>

                <div
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                    style={{ backgroundColor: "var(--color-card-background)" }}
                >
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        Inventory Report
                    </h2>
                    <Pie
                        data={inventoryData}
                        options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: "Current Stock Levels",
                                },
                            },
                        }}
                    />
                </div>

                <div
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow md:col-span-2"
                    style={{ backgroundColor: "var(--color-card-background)" }}
                >
                    <h2
                        className="text-xl font-semibold mb-4"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        Profit Trend
                    </h2>
                    <Line
                        data={profitData}
                        options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: "Monthly Profit Trend",
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Reports;
