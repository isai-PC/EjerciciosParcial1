const urlAPI = "https://dog.ceo/api";
let razaActal = "";
let busquedaActual = "";
let skip = 0;
let total = 60;
let todasLasRazas = [];
let paginaciones = [];  // Almacena todas las imágenes cargadas
const limit = 8;
const paginas = document.getElementById("paginacion");//<--Num,ero de paginas
const raza = document.getElementById("raza");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("busqueda");


const cargarPerros = () => {
    const fin = razaActal
        ? `${urlAPI}/breed/${razaActal}/images`
        : `${urlAPI}/breeds/image/random/60`;

    fetch(fin)
        .then(res => res.json())
        .then(data => {
            paginaciones = data.message;
            total = paginaciones.length;
            mostrarPagina();
            paginacion();
        })
        .catch(err => console.error("Error cargando perros:", err));
};
const mostrarPagina = () => {
    const perrosPaginados = paginaciones.slice(skip, skip + limit);
    mostrarPerros(perrosPaginados);
};

const paginacion = () => {
    const totalPaginas = Math.ceil(total / limit);
    const numPaginas = document.getElementById("num-paginas");
    numPaginas.innerHTML = "";

    for (let i = 0; i < totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = i + 1;
        btn.className = "px-3 py-1 rounded bg-gray-100 hover:bg-blue-200";
        btn.onclick = () => ir(i);
        numPaginas.appendChild(btn);
    }
};

const cargarRaza = () => {
    fetch(`${urlAPI}/breeds/list/all`)
        .then(res => res.json())
        .then(razas => {
            todasLasRazas = Object.keys(razas.message);
            const contenedorRaza = document.getElementById("raza");
            contenedorRaza.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevas categorias

            todasLasRazas.forEach(raza => {
                const option = document.createElement("option");
                option.value = raza;
                option.textContent = raza;
                contenedorRaza.appendChild(option);
            });
        });
};
//evento del formulario de búsqueda
formBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();
    busquedaActual = inputBusqueda.value.trim().toLowerCase();

    if (busquedaActual === "") {
        razaActal = "";
        raza.value = "";
    } else {
        // Buscar la raza que coincida con la búsqueda
        const razaEncontrada = todasLasRazas.find(r => r.toLowerCase().includes(busquedaActual));
        if (razaEncontrada) {
            razaActal = razaEncontrada;
            raza.value = razaEncontrada;
        } else {
            alert("Raza no encontrada. Por favor, intenta de nuevo.");
            return;
        }
    }
    skip = 0;
    cargarPerros();
});
//cambio del select
raza.addEventListener("change", (e) => {//para cuando se cambia el select
    const seleccionRaza = e.target.value;
    if (seleccionRaza === "") {
        busquedaActual = "";
        razaActal = "";
        inputBusqueda.value = "";
    }
    else {
        razaActal = seleccionRaza;
        busquedaActual = "";
        inputBusqueda.value = seleccionRaza;
    }
    skip = 0;//parta reiniciar
    cargarPerros();
});
cargarRaza();

/* MOSTRAR */
const mostrarPerros = (perros) => {
    const contenedorPerros = document.getElementById("contenedor-perros");
    contenedorPerros.innerHTML = "";
    /* _==============SIMULAR EL endpoint, ya quie el api no tiene eso]================ */
    perros.forEach((url, i) => {

        const perro = {
            id: skip + i,
            imagen: url,
            raza: razaActal || 'Raza Mixta'
        };
        const tarjeta = document.createElement("div");
        tarjeta.className = "bg-white rounded-lg shadow overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer";
        tarjeta.innerHTML = `
    <div class="block p-4">
                <p class="text-gray-700 mb-2 font-bold capitalize">${perro.raza}</p>
                <img src="${perro.imagen}" alt="perro" class="w-full h-56 object-cover rounded mb-2" />
                <p class="text-sm text-gray-600 italic leading-relaxed"></p>
                <p class="font-semibold mt-4 text-blue-600 text-sm">Ver Detalles →</p>
            </div>
    `;
        tarjeta.addEventListener("click", () => {
            abrirdetalle(perro);
        });
        contenedorPerros.appendChild(tarjeta);
    });
}

btnAnterior.addEventListener("click", () => {
    if (skip > 0) {
        skip -= limit;
        mostrarPagina();
    }
});
btnSiguiente.addEventListener("click", () => {
    if (skip + limit < total) {
        skip += limit;
        mostrarPagina();
        
    }
});
const ir = (i) => {
    skip = i * limit;
    mostrarPagina();
};

cargarPerros();

/* crear una vista detalle basica */
const abrirdetalle = (perro) => {
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
                <h2 class="text-2xl font-bold mb-4 capitalize">${perro.raza}</h2>
                <img class="w-full rounded mb-4" src="${perro.imagen}" alt="${perro.raza}">
                <p class="text-lg font-bold mb-4"><strong>ID:</strong> ${perro.id}</p>
                <p class="text-gray-500 text-sm mt-2">
                    Detalle obtenido simulando para el GET /dog/${perro.id}
                </p>
            </div>
        </div>
    `;
};
const cerrarDetalle = () => {
    const detai = document.getElementById("detalle");
    if (detai) detai.innerHTML = "";
};