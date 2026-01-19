const coordenadas = document.getElementById("parrafo");
const enlaceMapa = document.getElementById("enlace");


const obtener = () => {
    //vereficar si el navegador soporta la geolocalizacion//hacer referencia al navegador
    if (navigator.geolocation) { //si esta activa el navegador
        coordenadas.innerHTML = "Obteniendo coordenadas...";
        /* navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError); */
        navigator.geolocation.getCurrentPosition(
            (posicion) => {
                const latitud = posicion.coords.latitude;//obtener la
                const longitud = posicion.coords.longitude;
                alert(`Latitud: ${latitud} <br> Longitud: ${longitud}`);
                enlaceMapa.href = `https://www.google.com/maps?q=${latitud},${longitud}`;
                enlaceMapa.style.display = "block";
            }


        );
    } else {
        coordenadas.innerHTML = "La geolocalización no es compatible con este navegador.";
    }
};
