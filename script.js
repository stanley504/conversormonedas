async function fetchData() {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = "Cargando datos...";

    // Datos de prueba
    const payload = {
        asset: 'USDT',
        fiat: 'VND',
        tradeType: 'BUY'
    };

    try {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            displayData(result);
        } else {
            dataContainer.innerHTML = `<p>Error: ${result.message}</p>`;
        }
    } catch (error) {
        dataContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    if (!data.length) {
        dataContainer.innerHTML = '<p>No se encontraron datos.</p>';
        return;
    }

    let html = '<table border="1"><tr><th>Precio</th><th>Mínimo</th><th>Máximo</th><th>Usuario</th></tr>';
    data.forEach(item => {
        html += `<tr>
            <td>${item.price}</td>
            <td>${item.minSingleTransAmount}</td>
            <td>${item.dynamicMaxSingleTransAmount}</td>
            <td>${item.nickName}</td>
        </tr>`;
    });
    html += '</table>';
    dataContainer.innerHTML = html;
}
