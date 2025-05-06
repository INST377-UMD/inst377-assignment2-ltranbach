const api_url = 'https://zenquotes.io/api/random'
fetch(api_url)
    .then(res => res.json())
    .then(resJson => {
        document.getElementById('quote-text').innerText = `"${resJson[0].q}" — ${resJson[0].a}`;
    });

if (annyang) {
    const commands = {
    'hello': () => alert('Hello World'),
    'change the color to *color': color => document.body.style.backgroundColor = color,
    'navigate to *page': page => {
        if (page == "home") 
            location.href = "home_page.html";
        else if (page == "stocks") 
            location.href = "stocks_page.html";
        else if (page == "dogs")
            location.href = "dogs_page.html"
    }
    }   
    annyang.addCommands(commands);
}

function startAudio() {
    if (annyang) {
        annyang.start();
    }
}

function stopAudio() {
    if (annyang) {
        annyang.abort();
    }
}

function getStocks(stocksTicker) {
    console.log("test");
    const input = document.getElementById("stocks-input");
    const days = parseInt(document.getElementById("days").value);
    const startDate = new Date();
    const endDate = new Date();
    const ticker = stocksTicker || input.value.toUpperCase();

    startDate.setDate(endDate.getDate() - days);
    
    const formatStartDate = startDate.toISOString().split("T")[0];
    const formatEndDate = endDate.toISOString().split("T")[0];

    const api_url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${days}/day/${formatStartDate}/${formatEndDate}?adjusted=true&sort=asc&limit=120&apiKey=Afi78pFpy0CXVWFsGbCOXuJlefUrxeHW`;

    fetch(api_url)
        .then(res => res.json())
        .then(resJson => {
            const labels = resJson.results.map(result =>
                new Date(result.t).toLocaleDateString()
            );

            const prices = resJson.results.map(result =>
                result.c
            );

            drawStockChart(labels, prices);
        })
}

function drawStockChart(labels, prices) {
    const ctx = document.getElementById("stocks-chart");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
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