async function fetchData() {
    try {
        const response = await fetch('http://localhost/api/binance.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                asset: 'BTC',
                fiat: 'USD',
                tradeType: 'BUY'
            })
        });
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
