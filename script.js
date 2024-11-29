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

function obtenerTipoCambioSunat() {
  // Datos
  const token = 'apis-token-1.aTSI1U7KEuT-6bbbCguH-4Y8TI6KS73N';

  // Obtener la fecha actual en formato YYYY-MM-DD
  const hoy = new Date();
  const fecha = hoy.toISOString().split('T')[0]; // Convierte la fecha a "YYYY-MM-DD"

  // Realizar la llamada a la API
  fetch(`https://api.apis.net.pe/v2/sunat/tipo-cambio?date=${fecha}`, {
    method: 'GET',  // Método GET
    headers: {
      'Referer': 'https://apis.net.pe/tipo-de-cambio-sunat-api', // Referer, como en el PHP
      'Authorization': 'Bearer ' + token,  // Token de autorización
    },
  })
  .then(response => response.json())  // Convertir la respuesta a JSON
  .then(data => {
    console.log(data);  // Datos que devuelve la API
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);  // Manejo de errores
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

// Código para habilitar el botón de modo oscuro
const darkModeToggle = document.getElementById("darkModeToggle");

// Detecta si ya está activado el modo oscuro en el navegador
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark-mode");
}

// Agrega un evento al botón para alternar el modo oscuro
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});


// Cargar la información automáticamente cuando la página se carga
window.onload = function() {
  fetchCryptoData(); // Llamar la función para obtener los datos
  // Actualizar los datos cada 30 segundos (30000 ms)
  setInterval(fetchCryptoData, 30000);
  // Llamar a la función para obtener el tipo de cambio
  obtenerTipoCambioSunat();
};

