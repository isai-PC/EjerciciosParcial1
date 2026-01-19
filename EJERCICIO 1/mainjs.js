/* Arreglo que cuete con informacion */
const coleccion_docentes = [/* Similar al formato JASON */
    {
        nombre: "Pancho"/* Valor que va a tener */,
        apellido: "Pascual Cruz",
        puesto: "adminstrador",
        edad: 20,
        estado: true
    },
    {
        nombre: "Doc. efren"/* Valor que va a tener */,
        apellido: "juarez",
        puesto: "Doctor",
        edad: 40,
        estado: false
    },
    {
        nombre: "hermes"/* Valor que va a tener */,
        apellido: "Salazar",
        puesto: "Investigaador",
        edad: 43,
        estado: true
    }
]
const mostrar = () => {
    /* alert("Alerta"+coleccion_docentes[0].nombre) */
    //rescatar elemento de div no es necesario ue tenga el mismo nombre del html
    const contenedor = document.getElementById("contenedor")
    contenedor.innerHTML="" /* limpiar el contenedor */
    coleccion_docentes.forEach((docente) => {
        if (docente.estado) {
            contenedor.innerHTML += `<div class="tarjeta"><p>${docente.nombre}</p></div>`
        }
    })/* se crea una funcion para que recorra */
}