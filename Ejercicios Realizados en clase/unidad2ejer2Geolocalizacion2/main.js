
let lat, lon;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (respuesta) => {
            lat = respuesta.coords.latitude;
            lon = respuesta.coords.longitude;
            const coordenadas = [lat, lon];
            alert(`Latitud: ${lat}, Longitud: ${lon}`);

            //Crear el mapa
            // 1. Inicializar el mapa en el elemento HTML con id 'map', centrado en las coordenadas obtenidas y con zoom 13
            let mapa = L.map('map').setView(coordenadas, 13);
            // 2. Agregar una capa de tiles (imágenes del mapa) desde OpenStreetMap
            //    - URL de los tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            //    - Opciones: maxZoom para el zoom máximo permitido, y attribution para créditos legales
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 80,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap del 5 c</a> contributors'
            }).addTo(mapa);
            // 3. Agregar un marcador en las coordenadas obtenidas al mapa
            var marca = L.marker(coordenadas).addTo(mapa)
                .bindPopup(`<b>Rstoy aqui</b>---<br>Mis coordenadas son: <br>Latitud: ${lat} <br>Longitud: ${lon}`)//mensaje emergente, puede manejar html
                .openPopup();//que este abierto al cargar la pagina

            // 4. Agregar un círculo rojo con borde rojo y relleno semitransparente alrededor de las coordenadas obtenidas  
            var circulo = L.circle(coordenadas, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 5
            }).addTo(mapa);

            // 5. Agregar un polígono con vértices en tres puntos cercanos a las coordenadas obtenidas (offsets pequeños en grados para ~100 metros)
            var poligono = L.polygon([
                [lat + 0.001, lon + 0.001],
                [lat + 0.001, lon - 0.001],
                [lat - 0.001, lon - 0.001]
            ]).addTo(mapa);
            circulo.bindPopup("I am a circle.").openPopup();
            poligono.bindPopup("I am a polygon.").openPopup();
        },
        () => { alert("No se pudo obtener la geolocalización") }
    );

}
else {
    alert("Tu navegador no soporta la geolocalización");
}

