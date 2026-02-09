const urlAPI = "https://dummyjson.com/products";
let productos = []; // Almacena los productos cargados
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");
let busquedaActual = "";

formBusqueda.addEventListener("submit", (evento) => {
  evento.preventDefault();
  busquedaActual = inputBusqueda.value.trim();
  skip = 0;
  cargarProduct();
  /* if (!terminoBusqueda) return; // Si el término de búsqueda está vacío, no hacer nada
  fetch(`https://dummyjson.com/products/search?q=${terminoBusqueda}`)
    .then(res => res.json())
    .then(data => {
      mostrarProductos(data.products);
    }); */
});

/* 
const cargarProductos = () => {
  fetch(urlAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      productos = data.products; // asigna al arreglo global
      console.log(productos);
      mostrarProductos(productos);
    });
} */

const mostrarProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedor-productos");
  contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos productos

  productos.forEach((products) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("bg-white", "rounded-lg", "shadow", "overflow-hidden", "transform", "transition-transform", "duration-300", "hover:scale-105", "hover:shadow-lg", "cursor-pointer");


    tarjeta.innerHTML = `
      <a href="VistaDetalle.html?id=${products.id}" class="block p-4 hover:bg-gray-100 transition">
          <p class="text-gray-700 mb-2 font-bold">${products.title}</p>
          <img src="${products.thumbnail}" alt="${products.title}" class="w-full h-56 bg-gray-200 rounded mb-2" />
          <p class="text-sm text-gray-600">${products.description}</p>
          <p class="font-semibold  mt-2"><strong>Price: </strong>$${products.price}</p>
      </a>
    `;
    contenedorProductos.appendChild(tarjeta);
  });
}// Cargar productos al iniciar la página
/* cargarProductos(); */

/* PAGINACION 
======================================================*/
let skip = 0;
const limit = 10; // Cantidad de productos por página
let total = 0;
const numPaginas = document.getElementById("num-paginas");
const btnAnterior = document.getElementById("btn-anterior");
const btnSiguiente = document.getElementById("btn-siguiente");



const cargarProduct = () => {
  const finBusqueda = busquedaActual ?
    `${urlAPI}/search?q=${busquedaActual}&limit=${limit}&skip=${skip}` : `${urlAPI}?limit=${limit}&skip=${skip}`;

  fetch(finBusqueda)
    .then(res => res.json())
    .then(data => {
      total = data.total;
      mostrarProductos(data.products);

      //obtener el numero de paginas
      const paginas = Math.ceil(total / limit)
      numPaginas.innerHTML = "";
      //ver si esta activo}

      for (let i = 1; i <= paginas; i++) {
        const Activo = (skip / limit) + 1 === i;
        const Activar = Activo ? "bg-blue-600 text-white scale-105"
          : "bg-gray-100 text-gray-600 hover:bg-blue-200 hover:text-gray-800";
        numPaginas.innerHTML += `
        <button onclick="ir(${i - 1})" class="px-3 py-1 bg-gray-200 rounded transition ${Activar}" > ${i}</button>
        `;
      }
    })
};

//eventos para los botones
btnAnterior.addEventListener("click", () => {
  if (skip > 0) {
    skip -= limit;
    cargarProduct();
  }
});
btnSiguiente.addEventListener("click", () => {
  if (skip + limit < total) {
    skip += limit;
    cargarProduct();
  }
});
const ir = (i) => {
  skip = i * limit;
  cargarProduct();
};

cargarProduct();
//=================================================================================
