const urlAPI = "https://dummyjson.com/products";
let productos = []; // Almacena los productos cargados
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");
let busquedaActual = "";
let categoryActual = "";
let ordenActual = "";
const categoria = document.getElementById("categorias");



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
          <p class = "font-semibold  mt-2">${products.category}</p>
      </a>
        <div class="flex justify-between p-4 bg-gray-50 border-t">
            <button onclick="editarProduct(${products.id}, '${products.title}', ${products.price}, this)" 
            class="text-blue-600 font-bold hover:text-blue-800">Editar</button>
            <button onclick="borrarProduct(${products.id}, this)" 
            class="text-red-600 font-bold hover:text-red-800">Eliminar</button>
  </div>
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
  let finBusqueda = busquedaActual ? `${urlAPI}/search?q=${busquedaActual}&` :/* <--Cuando hace una busqueda */
    (categoryActual) ? `${urlAPI}/category/${categoryActual}?` : /* <--Para lo de categorias */
      `${urlAPI}?`;

  finBusqueda += `limit=${limit}&skip=${skip}`;//<--AGREGA LO DE PAGINACION

  if (ordenActual) {
    finBusqueda += `&sortBy=${ordenActual}`; //<--para ordenar
  }


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
//BSUQEDA POR CATEGORIA
const cargarCategrias = () => {
  fetch('https://dummyjson.com/products/category-list')
    .then(res => res.json())
    .then(categorias => {
      const contenedorCategorias = document.getElementById("categorias");
      contenedorCategorias.innerHTML = ""; // Limpiar el contenedor antes de mostrar nuevas categorias

      categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        contenedorCategorias.appendChild(option);
      });
    });
}
categoria.addEventListener("change", (e) => {//para cuando se cambia el select
  const SelectionCategory = e.target.value;
  if (SelectionCategory === "") {
    busquedaActual = "";
    categoryActual = "";
  }
  else {
    categoryActual = SelectionCategory;
    busquedaActual = "";
  }
  skip = 0;//parta reiniciar
  cargarProduct();
});
cargarCategrias();
/* ====================================================================================== */
/* ORDENAR POR */

const cambiarOrden = (valor) => {
  ordenActual = valor;
  skip = 0;
  cargarProduct();
}
/* ================================Eliminar Producto */
const borrarProduct = (id, boton) => {
  const conf = confirm(`¿Está seguro de eliminar este producto?`);
  if (conf) {
    fetch(`${urlAPI}/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.isDeleted) {
          alert(`Se ha eliminado el producto: ${data.title}`);
          const tarjetaHtml = boton.closest(".bg-white");
          tarjetaHtml.classList.add("opacity-0", "scale-95", "transition-all");
          setTimeout(() => {
            tarjetaHtml.remove();
          }, 300);
        }
      })
  }
};
/* =============================== */
const editarProduct = (id, titulo, precio, boton) => { /* trae los datos */
  const NuevoT = prompt("Agregar nuevo nombre", titulo);
  const NuevoP = prompt("Agregar nuevo precio", precio);
  if (NuevoT !== null && NuevoP !== null) {
    actualizar(id, NuevoT, parseFloat(nuevoP), boton);
  }
};
const actualizar = (id, NuevoT, NuevoP, boton) => {
  fetch(`${urlAPI}/${id}`, {
    method: 'PUT', /* PAtch */
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: NuevoT,
      price: NuevoP
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(`Datos Actualizados`)
      const tarjeta = boton.closest(".bg-white");
      const elementoTitulo = tarjeta.querySelector("p.font-bold");
      const elementoPrecio = tarjeta.querySelector("p.font-semibold");

      if (elementoTitulo) elementoTitulo.textContent = data.title;
      if (elementoPrecio) elementoPrecio.innerHTML = `<strong>Price: </strong>$${data.price}`;
    })
};