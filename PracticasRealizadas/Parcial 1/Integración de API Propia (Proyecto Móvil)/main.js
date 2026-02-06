const urlApiLista = "https://juandios.grupoctic.com/Peliculas/api/listar.php";

const obtenerLista = () => {
    fetch(urlApiLista)
        .then(respuesta => respuesta.json())
        .then(data => {
            const empleados = data;
            console.log("Datos recibidos:", empleados);
            mostrarLista(empleados);
        })
        .catch(error => {
            console.error("Error al cargar la lista:", error);
            alert("Hubo un error al cargar los datos");
        });
}

const mostrarLista = (empleados) => {
    const contenedorEmpleados = document.getElementById("contenedor-empleados");
    contenedorEmpleados.innerHTML = "";

    empleados.forEach(empleado => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("empleado-card");
        const nombreCompleto = empleado.nombre + " " + empleado.Apellido_Paterno + " " + empleado.Apellido_Materno;
        tarjeta.innerHTML = `
            <img src="https://juandios.grupoctic.com/Peliculas/img/${empleado.foto}" alt="${nombreCompleto}" width="100%" style="object-fit: contain; height: 300px;" onerror="this.src='user.jpg'">
            <h3 class="practice-title">${nombreCompleto}</h3>
            <p><strong>Correo:</strong> ${empleado.Correo}</p>
            <p><strong>Telefono:</strong> ${empleado.Telefono}</p>
        `;

        contenedorEmpleados.appendChild(tarjeta);
    });
}