function fetchCryptoData() {
    fetch('https://dolarapi.com/v1/dolares/cripto') // Llamada a la API
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Cambiamos a .text() para ver el contenido de la respuesta
        })
        .then(data => {
            console.log("Respuesta de la API:", data); // Imprime la respuesta para depuración
            try {
                const jsonData = JSON.parse(data); // Intentamos convertir la respuesta en JSON
                renderCryptoData(jsonData);
            } catch (error) {
                console.error("Error al analizar los datos:", error);
                document.getElementById("dataContainer").innerHTML = 
                    "<p>Error al analizar los datos de la API. Intenta de nuevo.</p>";
            }
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            document.getElementById("dataContainer").innerHTML = 
                "<p>Error al cargar los datos. Intenta de nuevo.</p>";
        });
}

function renderCryptoData(data) {
    const container = document.getElementById("dataContainer");
    container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos datos

    data.forEach(cripto => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${cripto.nombre}:</strong> $${cripto.precio}`;
        container.appendChild(div);
    });
}
