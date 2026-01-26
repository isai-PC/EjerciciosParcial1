const urlApiLista = "https://juandios.grupoctic.com/Peliculas/api/listar.php";

const obtenerLista = () => {
    fetch(urlApiLista)
        .then(respuesta => respuesta.json())
        .then(data => {
            const empleados = data.items;
            console.log("Datos recibidos:", empleados);
            mostrarLista(empleados);
        })
        .catch(error => {
            console.error("Error al cargar la lista:", error);
            alert("Hubo un error al cargar los datos");
        });
}

const mostrarLista = (lista) => {
    const contenedorEmpleados = document.getElementById("contenedor-empleados");
    contenedorEmpleados.innerHTML = "";

    lista.forEach(empleados => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("practice-card");
        const nombreCompleto = empleados.nombre + " " + empleados.Apellido_Paterno + " " + empleados.Apellido_Materno;
        tarjeta.innerHTML = `
            <img src="https://juandios.grupoctic.com/Peliculas/img/${empleados.imagen}" alt="${empleados.nombreCompleto}" width="100%" style="object-fit: contain; height: 300px;">
            <h3 class="practice-title">${empleados.nombreCompleto}</h3>
            <p class="practice-description">${empleados.Correo}</p>
            <p><strong>Año:</strong> ${empleados.Telefono}</p>
        `;

        contenedorEmpleados.appendChild(tarjeta);
    });
}