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
}

function startAudio() {
    if (annyiang) {
        annyang.start();
    }
}

function stopAudio() {
    if (annyiang) {
        annyiang.abort();
    }
}

function getStocks() {
    const api_url = "https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?adjusted=true&sort=asc&limit=120&apiKey=Afi78pFpy0CXVWFsGbCOXuJlefUrxeHW";
    
}