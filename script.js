function fetchCryptoData() {
    console.log("El botón fue presionado.");

    fetch('https://dolarapi.com/v1/dolares/cripto') // Llamada a la API
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Usamos .json() directamente ya que la API devuelve JSON
        })
        .then(data => {
            console.log("Respuesta de la API:", data); // Verifica la respuesta de la API
            renderCryptoData(data); // Pasamos el objeto completo a renderCryptoData
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

    // Aquí accedemos directamente a las propiedades del objeto 'data'
    const div = document.createElement("div");
    div.innerHTML = `
        <p><strong>Moneda:</strong> ${data.moneda}</p>
        <p><strong>Casa:</strong> ${data.casa}</p>
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Compra:</strong> $${data.compra}</p>
        <p><strong>Venta:</strong> $${data.venta}</p>
        <p><strong>Última actualización:</strong> ${data.fechaActualizacion}</p>
    `;
    container.appendChild(div); // Agrega la nueva información al contenedor
}
