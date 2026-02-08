const urlAPI = "https://dummyjson.com/products";
let productos = []; // Almacena los productos cargados
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");

formBusqueda.addEventListener("submit", (evento) => {
  evento.preventDefault();
  evento.preventDefault();
  const terminoBusqueda = inputBusqueda.value.trim();
  if (!terminoBusqueda) return; // Si el término de búsqueda está vacío, no hacer nada
  fetch(`https://dummyjson.com/products/search?q=${terminoBusqueda}`)
    .then(res => res.json())
    .then(data => {
      mostrarProductos(data.products);
    });
});


const cargarProductos = () => {
  fetch(urlAPI)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      productos = data.products; // asigna al arreglo global
      console.log(productos);
      mostrarProductos(productos);
    });
}

const mostrarProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedor-productos");
  contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevos productos

  productos.forEach((products) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("bg-white", "rounded-lg", "shadow", "overflow-hidden", "transform", "transition-transform", "duration-300", "hover:scale-105", "hover:shadow-lg", "cursor-pointer");


    tarjeta.innerHTML = `
      <a href="VistaDetalle.html?id=${products.id}" class="block p-4 hover:bg-gray-100 transition">
      <div class="p-4">
          <p class="text-gray-700 mb-2 font-bold ">${products.title}</p>
          <img src="${products.thumbnail}" alt="${products.title}" class="w-full h-56 bg-gray-200 rounded mb-2" />
          <p>${products.description}</p> 
          <p><strong>Price: </strong>${products.price}</p>
          </a>
      `;
    contenedorProductos.appendChild(tarjeta);
  });
}// Cargar productos al iniciar la página
cargarProductos();

