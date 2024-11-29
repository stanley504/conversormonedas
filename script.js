function fetchCryptoData() {
    fetch('https://dolarapi.com/v1/dolares/cripto') // Llamada a la API
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Convierte la respuesta en JSON
        })
        .then(data => {
            renderCryptoData(data); // Llama a una función para mostrar los datos
        })
        .catch(error => {
            console.error("Error al obtener datos:", error);
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
