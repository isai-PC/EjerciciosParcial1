const urlAPI = "https://dummyjson.com/products";
let productos = []; // Almacena los productos cargados
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");

formBusqueda.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const terminoBusqueda = inputBusqueda.value.toLowerCase();
  const filtrarProductos = productos.filter((producto) =>
    producto.title.toLowerCase().includes(terminoBusqueda)
  );
  mostrarProductos(filtrarProductos);
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
    tarjeta.classList.add("bg-white", "rounded-lg", "shadow");


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
}

// Cargar productos al iniciar la página
/* cargarProductos(); */

///------------------------------------
// Obtener el id de la URL para vista detalle
/* const urlParams = new URLSearchParams(window.location.search);
const idProducto = urlParams.get("id");

//obtener detallew del producto
const cargarDetalleProducto = () => {
  if (!idProducto) return;
  fetch(`https://dummyjson.com/products/${idProducto}`)
    .then((respuesta) => respuesta.json())
    .then((producto) => {
      mostrarDetalleProducto(producto);
    }).catch((err) => console.error('Error loading product detail:', err));
}
//mostrar detalle del producto
const mostrarDetalleProducto = (producto) => {
  productoDetalle = document.getElementById("producto-detalle");
  productoDetalle.innerHTML = `
   <div class="bg-white rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-auto rounded">

                <div class="md:col-span-2">
                    <h2 class="text-2xl font-bold mb-2">${product.title}</h2>
                    <p class="text-gray-700 mb-2"><strong>Price:</strong> $${product.price}</p>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    <a href="index.html" class="text-blue-500 hover:underline">Volver a la lista de productos</a>
                    </div>
            </div>
                    `;

} */