let venta;  // Variable global para el valor de venta

function fetchCryptoData() {
  fetch('https://dolarapi.com/v1/dolares/cripto')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
      console.log("Respuesta de la API:", data); // Ver en consola los datos recibidos
      renderCryptoData(data); // Pasar los datos a la función que los renderiza
      venta = data.venta;  // Guardar el valor de compra en una variable global
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



const solesAmount = document.getElementById('solesAmount');

// Función para convertir soles a pesos argentinos
function convertirSolesAPesos() {
  
  if (solesAmount.value && venta) {  // Verificar que solesAmount y compra estén definidos
    const resultado = (solesAmount.value / 3.78) * venta; 
    document.getElementById('resultadoConversor').innerText = 
      `${solesAmount.value} Soles = ${resultado.toFixed(2)} Pesos Argentinos`;
  } else {
    document.getElementById('resultadoConversor').innerText = "Por favor, ingresa una cantidad válida y asegúrate de que los datos estén cargados.";
  }
}

solesAmount.addEventListener('input', convertirSolesAPesos);

const pesosAmount = document.getElementById('pesosAmount');

// Función para convertir soles a pesos argentinos
function convertirPesosaSoles() {
  
  if (pesosAmount.value && venta) { 

    const resultado = (pesosAmount.value / venta) * 3.78; 
    document.getElementById('pesosConversor').innerText = 
      `${pesosAmount.value} Pesos = ${resultado.toFixed(2)} Soles Argentinos`;
  } else {
    document.getElementById('pesosConversor').innerText = "Por favor, ingresa una cantidad válida y asegúrate de que los datos estén cargados.";
  }
}

pesosAmount.addEventListener('input', convertirPesosaSoles);


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
};

