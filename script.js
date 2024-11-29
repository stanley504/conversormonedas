let compra;  // Variable global para el valor de compra

function fetchCryptoData() {
  fetch('https://dolarapi.com/v1/dolares/cripto')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
      console.log("Respuesta de la API:", data); // Ver en consola los datos recibidos
      renderCryptoData(data); // Pasar los datos a la función que los renderiza
      compra = data.compra;  // Guardar el valor de compra en una variable global
    })
    .catch(error => {
      console.error("Error al obtener los datos:", error);
    });
}

function renderCryptoData(data) {
  const cryptoDataContainer = document.getElementById('cryptoDataContainer');
  
  // Acceder a los valores de la API
  const moneda = data.moneda;
  const casa = data.casa;
  const nombre = data.nombre;
  const compra = data.compra;
  const venta = data.venta;
  const fechaActualizacion = data.fechaActualizacion;

  // Crear un string con los datos para mostrar (solo los datos cripto)
  const cryptoInfo = `
    <p><strong>Moneda:</strong> ${moneda}</p>
    <p><strong>Casa:</strong> ${casa}</p>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Compra:</strong> ${compra}</p>
    <p><strong>Venta:</strong> ${venta}</p>
    <p><strong>Última actualización:</strong> ${fechaActualizacion}</p>
  `;

  // Actualizar solo la parte de datos cripto
  cryptoDataContainer.innerHTML = cryptoInfo;
}

// Función para convertir soles a pesos argentinos
function convertirSolesAPesos() {
  const solesAmount = document.getElementById('solesAmount').value;
  
  if (solesAmount && compra) {  // Verificar que solesAmount y compra estén definidos
    const resultado = solesAmount * compra; // Conversión usando el valor de compra
    document.getElementById('resultadoConversor').innerText = 
      `${solesAmount} Soles = ${resultado.toFixed(2)} Pesos Argentinos`;
  } else {
    document.getElementById('resultadoConversor').innerText = "Por favor, ingresa una cantidad válida y asegúrate de que los datos estén cargados.";
  }
}

// Cargar la información automáticamente cuando la página se carga
window.onload = function() {
  fetchCryptoData(); // Llamar la función para obtener los datos
  // Actualizar los datos cada 30 segundos (30000 ms)
  setInterval(fetchCryptoData, 30000);
};

