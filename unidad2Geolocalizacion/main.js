const coordenadas = document.getElementById("parrafo");
const enlaceMapa = document.getElementById("enlace");


const obtener = () => {
    //vereficar si el navegador soporta la geolocalizacion//hacer referencia al navegador
    if (navigator.geolocation) { //si esta activa el navegador
        coordenadas.innerHTML = "Obteniendo coordenadas...";
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);
    } else {
        coordenadas.innerHTML = "La geolocalización no es compatible con este navegador.";
    }
}
