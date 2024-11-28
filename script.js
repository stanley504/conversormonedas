async function fetchData() {
    try {
        const response = await fetch('http://localhost/api/binance.php'); // Asegúrate de cambiar la URL a la correcta
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
