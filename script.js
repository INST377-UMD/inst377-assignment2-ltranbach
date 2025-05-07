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
    },
    'lookup *ticker': stocksTicker => {
        document.getElementById("stocks-input").value = stocksTicker;
        document.getElementById("days").value = 30;
        getStocks(stocksTicker);
    },
    'load dog breed *dogBreed': dogBreed => {
        fetch("https://dogapi.dog/api/v2/breeds")
            .then(res => res.json())
            .then(resJson => {
                breedInfo(resJson.data.find(breed => breed.attributes.name == dogBreed))
            })
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

    const api_url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formatStartDate}/${formatEndDate}?adjusted=true&sort=asc&limit=120&apiKey=Afi78pFpy0CXVWFsGbCOXuJlefUrxeHW`;

    fetch(api_url)
        .then(res => res.json())
        .then(resJson => {
            const dates = resJson.results.map(result =>
                new Date(result.t).toLocaleDateString()
            );

            const prices = resJson.results.map(result =>
                result.c
            );

            drawStockChart(dates, prices);
        })
}

let stockChart;

function drawStockChart(dates, prices) {
    const ctx = document.getElementById("stocks-chart");

    if (stockChart)
        stockChart.destroy();

    stockChart = new Chart(ctx, {
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

function redditStocks() {
    const url = "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03";
    const tableBody = document.getElementById("reddit-table");
    
    fetch(url)
        .then(res => res.json())
        .then(resJson => {
            resJson = resJson.slice(0, 5);

            resJson.forEach(stock => {
                const tableRow = document.createElement("tr");
                const rowTicker = document.createElement("td");
                const rowLink = document.createElement("a");
                
                rowLink.href = `https://finance.yahoo.com/quote/${stock.ticker}`
                rowLink.textContent = stock.ticker;
                
                rowTicker.appendChild(rowLink);
                tableRow.appendChild(rowTicker);

                const rowComments = document.createElement("td");
                rowComments.textContent = stock.no_of_comments;
                tableRow.appendChild(rowComments);

                const rowSentiment = document.createElement("td");
                const trendImage = document.createElement("img");
                const animalImage = document.createElement("img");
                trendImage.width = animalImage.width = 500;
                trendImage.height = animalImage.height = 500;
                if (stock.sentiment == "Bullish") {
                    trendImage.src = "https://t3.ftcdn.net/jpg/10/39/82/54/360_F_1039825401_t0XFa0iXw9xl0yGVakzum8YSxXS6FpQO.jpg"; 
                    animalImage.src = "https://media.istockphoto.com/id/1283694295/vector/bull-silhouette-monochrome-logo-symbol-of-the-year-in-the-chinese-zodiac-calendar-vector.jpg?s=612x612&w=0&k=20&c=fTCczmqfwNmAZZ8m0EyZX2E63Rwet_OSEt7qj0-zbWQ=";
                    
                    rowSentiment.appendChild(trendImage);
                    rowSentiment.appendChild(animalImage);
                } else if (stock.sentiment == "Bearish") {
                    trendImage.src = "https://img.freepik.com/free-vector/isolated-red-arrow-going-down_1308-111603.jpg"; 
                    animalImage.src = "https://c8.alamy.com/comp/2RP6M9W/bear-icon-bear-silhouette-black-symbol-of-a-sitting-bear-vector-illustration-2RP6M9W.jpg";
                    
                    rowSentiment.appendChild(trendImage);
                    rowSentiment.appendChild(animalImage);
                }
                tableRow.appendChild(rowSentiment);

                tableBody.appendChild(tableRow);
            });
        })
}

document.addEventListener("DOMContentLoaded", redditStocks);

function dogSlider() {
    const url = "https://dog.ceo/api/breeds/image/random/10";
    
    fetch(url) 
        .then(res => res.json()) 
        .then(resJson => {
            const slider = document.getElementById("dog-slider");
            
            resJson.message.forEach(dogImageURL => {
                const img = document.createElement("img");
                img.src = dogImageURL;
                img.width = 250;
                img.height = 250;
                slider.appendChild(img);
            })

    //        simpleslider.getSlider({
    //            container: slider
    //        })
        simpleslider.getSlider()
    })

}

//document.addEventListener("DOMContentLoaded", dogSlider);

function dogButtons() {
    const url = "https://dogapi.dog/api/v2/breeds";

    fetch(url)
        .then(res => res.json())
        .then(resJson => {
            const breeds = resJson.data;
            const dogBreedButtons = document.getElementById("dog-breed-buttons");

            breeds.forEach(breed => {
                const button = document.createElement("button");
                
                button.textContent = breed.attributes.name;
                button.setAttribute("class", "button-53");
                button.onclick = () => breedInfo(breed);
                dogBreedButtons.appendChild(button);
            })
        })
}

function breedInfo(breed) {
    document.getElementById("dog-breed-info").style.display = "block";

    const attribute = breed.attributes;

    document.getElementById("dog-breed-info").innerHTML = `
        <h2><strong>Name: ${attribute.name}</strong></h2>
        <p><strong>Description: ${attribute.description}</strong></p>
        <p><strong>Min Life: ${attribute.life.min}</strong></p>
        <p><strong>Max Life: ${attribute.life.max}</strong></p>
    `;
}