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

if (document.getElementById("donut-chart") && typeof ApexCharts !== 'undefined') {
    const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
    chart.render();
}
