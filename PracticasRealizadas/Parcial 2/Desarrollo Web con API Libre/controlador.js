const url_info = "https://dogapi.dog/api/v2/breeds";//<-Listadi
const url_img = "https://dog.ceo/api/breed";
let razaActalId = "";
let nombreRazaActual = "";
let busquedaActual = "";
let skip = 0;
let total = 0;
const limit = 12;
const contenedorPerros = document.getElementById("contenedor-perros");
const seleccionRaza = document.getElementById("raza");
const inputBusqueda = document.getElementById("busqueda");
const formBusqueda = document.getElementById("form-busqueda");
const numPaginas = document.getElementById("num-paginas");
//const paginas = document.getElementById("paginacion");//<--Num,ero de paginas
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
let listaRazaCompleta = [];


const cargarPerros = () => {
    //Endpont 1............................................
    contenedorPerros.innerHTML = "";
    fetch(url_info)
        .then(res => res.json())
        .then(response => {
            const razas = response.data;//Lista la info
            total = razas.length;//<-el total de datos que trae
            
            // Filtrar según skip y limit
            const razasPaginadas = razas.slice(skip, skip + limit);
            
            razasPaginadas.forEach(infoPerros => {
                const id = infoPerros.id;
                const name = infoPerros.attributes.name;
                const description = infoPerros.attributes.description;
                const img = `https://placedog.net/500/300?id=${Math.floor(Math.random() * 100)}`;

                crearTarjeta(id, name, description, img);
            });
            cargarPaginacion();
        })
        .catch(err => console.error("Error cargando perros:", err));
};

/* ======================MOSTRAR LAS INDORMACION================ */
const crearTarjeta = (id, name, description, img) => {
    /* contenedorPerros.innerHTML = ""; */
    const tarjeta = document.createElement("div");
    tarjeta.className = "bg-white rounded-lg shadow overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer";
    tarjeta.innerHTML = `
            <div class="block p-4 flex-1">
            <p class="text-gray-900 mb-2 font-bold capitalize text-lg">${name}</p>
            <img src="${img}" alt="${name}" class="w-full h-56 object-cover rounded mb-3 bg-gray-100" />
            <p class="text-sm text-gray-600 line-clamp-2 italic">
                ${description || "Sin descripción disponible."}
            </p>
        </div>
        <div class="p-4 bg-gray-50 border-t">
            <p class="font-semibold text-blue-600 text-sm flex justify-between items-center">
                Ver detalle <span>→</span>
            </p>
        </div>
    `;
    tarjeta.addEventListener("click", () => {
        abrirdetalle(id, img);
    });
    contenedorPerros.appendChild(tarjeta);
};
//===============SECCION DE PAGINACION===========================================
const cargarPaginacion = () => {
    const totalPaginas = Math.ceil(total / limit);

    numPaginas.innerHTML = "";

    for (let i = 0; i < totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = i + 1;
        const paginaActiva = (skip / limit);
        const activa = i == paginaActiva ? "bg-blue-600 text-white shadow-lg scale-110" : "bg-gray-100 hover:bg-blue-200 text-gray-700";
        btn.className = `px-3 py-1 rounded-md font-bold transition-all ${activa}`;
        btn.onclick = () => ir(i);
        numPaginas.appendChild(btn);
    }
};
const ir = (i) => {
    skip = i * limit;
    cargarPerros();
};
btnAnterior.addEventListener("click", () => {
    if (skip > 0) {
        skip -= limit;
        cargarPerros();
    }
});
btnSiguiente.addEventListener("click", () => {
    if (skip + limit < total) {
        skip += limit;
        cargarPerros();
    }
});
/* const mostrarPagina = () => {
    const perrosPaginados = paginaciones.slice(skip, skip + limit);
    mostrarPerros(perrosPaginados);
}; */
//=============================SECCION DE BSUQUEDAS=================================
const cargarRaza = () => {
    fetch(url_info)
        .then(res => res.json())
        .then(response => {
            listaRazaCompleta = response.data;
            seleccionRaza.innerHTML = `<option value="">Todas las razas</option>`; // Limpiar el contenedor antes de mostrar las razas

            listaRazaCompleta.forEach(raza => {
                const option = document.createElement("option");
                option.value = raza.id;
                option.textContent = raza.attributes.name;//<---Prueba
                seleccionRaza.appendChild(option);
            });
        });
};

//evento del formulario de búsqueda
formBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();
    busquedaActual = inputBusqueda.value.trim().toLowerCase();

    if (busquedaActual === "") {
        razaActalId = "";
        seleccionRaza.value = "";
    } else {
        // Buscar la raza que coincida con la búsqueda
        const razaEncontrada = listaRazaCompleta.find(r => r.attributes.name.toLowerCase().includes(busquedaActual));
        if (razaEncontrada) {
            razaActalId = razaEncontrada.id;
            seleccionRaza.value = razaEncontrada.id;
            nombreRazaActual = razaEncontrada.attributes.name;
        } else {
            alert("Raza no encontrada. Por favor, intenta de nuevo.");
            return;
        }
    }
    skip = 0;
    cargarPerros();
});
//cambio del select
seleccionRaza.addEventListener("change", (e) => {//para cuando se cambia el select
    const seleccion = e.target.value;
    if (seleccion === "") {
        busquedaActual = "";
        razaActalId = "";
        inputBusqueda.value = "";
    }
    else {
        razaActalId = seleccion;
        busquedaActual = "";
        const perro = listaRazaCompleta.find(r => r.id === seleccion);
        inputBusqueda.value = perro ? perro.attributes.name : "";
        nombreRazaActual = perro ? perro.attributes.name : "";
    }
    skip = 0;//parta reiniciar
    cargarPerros();
});
cargarRaza();
cargarPerros();

/* crear una vista detalle basica */
const abrirdetalle = (id, imagen) => {
    const perroCompleto = listaRazaCompleta.find(r => r.id === id);
    if (!perroCompleto) {
        alert("Información del perro no encontrada");
        return;
    }
    
    const info = {
        name: perroCompleto.attributes.name,
        imagen: imagen,
        description: perroCompleto.attributes.description || "Sin descripción",
        life: perroCompleto.attributes.life_span ? {min: perroCompleto.attributes.life_span.min || 0, max: perroCompleto.attributes.life_span.max || 0} : {min: 0, max: 0},
        male_weight: perroCompleto.attributes.male_weight || {min: 0, max: 0},
        id: id
    };
    
    let detai = document.getElementById("detalle");
    if (!detai) {
        detai = document.createElement("div");
        detai.id = "detalle";
        document.body.appendChild(detai);
    }
    detai.innerHTML = `
        <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onclick="cerrarDetalle()"> 
            <div class="bg-white rounded-lg p-6 max-w-lg w-full relative" onclick="event.stopPropagation()">
                <button onclick="cerrarDetalle()" class="absolute top-3 right-3 text-red-600 font-bold text-2xl">&times;</button>
                <h2 class="text-2xl font-bold mb-4 capitalize">${info.name}</h2>
                <img class="w-full rounded mb-4" src="${info.imagen}" alt="${info.name}">
                <p class="text-lg font-bold mb-4">${info.description}</p>
                <div class="grid grid-cols-2 gap-4 mt-4">
                                <div class="bg-blue-50 p-3 rounded-lg">
                                    <p class="text-xs text-blue-500 font-bold uppercase">Vida promedio</p>
                                    <p class="text-gray-800 font-semibold">${info.life.min} - ${info.life.max} años</p>
                                </div>
                                <div class="bg-green-50 p-3 rounded-lg">
                                    <p class="text-xs text-green-500 font-bold uppercase">Peso (Macho)</p>
                                    <p class="text-gray-800 font-semibold">${info.male_weight.min} - ${info.male_weight.max} kg</p>
                                </div>
                            </div>
                <p class="text-gray-500 text-sm mt-2">
                    ID${info.id}| DogAPI v2
                </p>
            </div>
        </div>
    `;
};
const cerrarDetalle = () => {
    const detai = document.getElementById("detalle");
    if (detai) detai.innerHTML = "";
};