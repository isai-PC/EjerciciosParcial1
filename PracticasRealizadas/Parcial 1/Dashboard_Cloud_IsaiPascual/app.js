const baseDeDatosCloud = [
    { nombre: "Amazon EC2", tipo: "IaaS", estado: "Activo", costo: 35.00 },
    { nombre: "Google Drive Enterprise", tipo: "SaaS", estado: "Activo", costo: 12.50 },
    { nombre: "Heroku App Server", tipo: "PaaS", estado: "Inactivo", costo: 0.00 },
    { nombre: "Azure Virtual Machines", tipo: "IaaS", estado: "Activo", costo: 40.00 }
];

const cargarServicios = () => {
    const contenedorServicios = document.getElementById("contenedor-servicios");
    contenedorServicios.innerHTML = "";

    baseDeDatosCloud.forEach(servicio => {

        let claseEstado = "";
        if (servicio.estado === "Activo") {
            claseEstado = "activo";
        } else {
            claseEstado = "inactivo";
        }//kvnkdfj

        contenedorServicios.innerHTML += `
            <div class="card">
                <h3>${servicio.nombre}</h3>
                <p class="tipo">${servicio.tipo}</p>
                <p class="${claseEstado}">${servicio.estado}</p>
                <p>$${servicio.costo.toFixed(2)}</p>
            </div>
        `;
    });
};