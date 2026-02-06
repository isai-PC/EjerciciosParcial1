
let lat, lon;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (respuesta) => {
            /* lat = respuesta.coords.latitude;
            lon = respuesta.coords.longitude; */
            lat = 21.132916;
            lon = -98.398520;
            const coordenadas = [lat, lon];
            alert(`Latitud: ${lat}, Longitud: ${lon}`);

            //Crear el mapa
            // 1. Inicializar el mapa en el elemento HTML con id 'map', centrado en las coordenadas obtenidas y con zoom 13
            let mapa = L.map('map').setView(coordenadas, 17);
            // 2. Agregar una capa de tiles (imágenes del mapa) desde OpenStreetMap
            //    - URL de los tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            //    - Opciones: maxZoom para el zoom máximo permitido, y attribution para créditos legales
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap del 5 c</a> contributors'
            }).addTo(mapa);
            // 3. Agregar un marcador en las coordenadas obtenidas al mapa
            var marca = L.marker(coordenadas).addTo(mapa)
                .bindPopup(`<b>Mi casa esta aqui</b><br>Mis coordenadas son: <br>Latitud: ${lat} <br>Longitud: ${lon}`)//mensaje emergente, puede manejar html
                .openPopup();//que este abierto al cargar la pagina

            /* // 4. Agregar un círculo rojo con borde rojo y relleno semitransparente alrededor de las coordenadas obtenidas  
            var circulo = L.circle(coordenadas, {
                color: 'red',
                fillColor: '#f03',
                radius: 5
            }).addTo(mapa); */

            /* perímetro: 
            21.133061, -98.398592
            21.132863, -98.398688  
            21.133070, -98.398283
            21.132787, -98.398361
             */
            // 5. Agregar un polígono con vértices en tres puntos cercanos a las coordenadas obtenidas (offsets pequeños en grados para ~100 metros)
            var perimetro = L.polygon(
                [
                    [21.132863, -98.398688],
                    [21.133066, -98.398592],
                    [21.133070, -98.398283],
                    [21.132787, -98.398361]
                ], { color: 'green', fillColor: '#1b582c', fillOpacity: 0.1 }

            ).addTo(mapa);
            //agregar una funcion al perimetro para que muestre informacion adicional
            perimetro.on('click', function () {
                perimetro.bindPopup(`
                    <img src="house.png" width="150px" /><br>
                    <b>Este es mi perímetro</b><br> 
                    <a href="https://www.google.com/maps/@21.132881,-98.3985294,20.75z/data=!5m1!1e3?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D">
                    Acceder a Google Maps</a>`);
            },
                () => { alert("No se pudo obtener la geolocalización") }
            );
        });
}
else {
    alert("Tu navegador no soporta la geolocalización");
}


