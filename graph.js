function drawStockChart(dates, prices) {
    const ctx = document.getElementById("stocks-chart");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "$ Stocks Price",
                data: prices,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    })
}