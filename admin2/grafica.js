const getChartOptions = () => {
    return {
        series: [40, 30, 20, 10],
        colors: ["#E81C2E", "#F25757", "#FFB3B3", "#D9D9D9"],  // Paleta de rojos y grises combinada
        chart: {
            height: 320,
            width: "100%",
            type: "donut",
        },
        stroke: {
            colors: ["transparent"],
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "Servicios",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return sum;  // Texto total ajustado
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            formatter: function (value) {
                                return value + " servicios";  // Formato de valor ajustado
                            },
                        },
                    },
                    size: "80%",
                },
            },
        },
        labels: ["Lavado externo", "Lavado interno", "Brillado", "Polichado"],
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
    };
};

const getChartOptions2 = () => {
    return {
        series: [5, 10, 20, 5],
        colors: ["#E81C2E", "#F25757", "#FFB3B3", "#D9D9D9"],  // Paleta de rojos y grises combinada
        chart: {
            height: 320,
            width: "100%",
            type: "donut",
        },
        stroke: {
            colors: ["transparent"],
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "Premios",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return sum;  // Texto total ajustado
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            formatter: function (value) {
                                return value + " servicios";  // Formato de valor ajustado
                            },
                        },
                    },
                    size: "80%",
                },
            },
        },
        labels: ["Lavado sencillo", "Jabon", "Brillado", "Polichado"],
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
    };
};

const getChartOptions3 = () => {
    return {
        series: [2, 1, 1, 1],
        colors: ["#E81C2E", "#F25757", "#FFB3B3", "#D9D9D9"],  // Paleta de rojos y grises combinada
        chart: {
            height: 320,
            width: "100%",
            type: "donut",
        },
        stroke: {
            colors: ["transparent"],
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "Premios",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return sum;  // Texto total ajustado
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            formatter: function (value) {
                                return value + " servicios";  // Formato de valor ajustado
                            },
                        },
                    },
                    size: "80%",
                },
            },
        },
        labels: ["Lavado con Aspirado", "Polichado", "Ambientador", "Paño"],
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
        },
    };
};

if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
    chart.render();
}

if (document.getElementById("donut-chart-2") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("donut-chart-2"), getChartOptions2());
    chart.render();
}

if (document.getElementById("donut-chart-3") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("donut-chart-3"), getChartOptions3());
    chart.render();
}
