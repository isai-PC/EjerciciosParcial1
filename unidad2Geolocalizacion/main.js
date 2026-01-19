const coordenadas = document.getElementById("parrafo");
const enlaceMapa = document.getElementById("enlace");


const obtener = () => {
    //vereficar si el navegador soporta la geolocalizacion
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
  } else {
    coordenadas.innerHTML = "La geolocalización no es compatible con este navegador.";
  }
}
