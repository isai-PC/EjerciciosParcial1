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
cargarCategrias();
const guardarProducto = () => {
    const titulo = document.getElementById('titulo').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categorias').value; // id corregido
    const res = document.getElementById('resultado');
    /* validar, hacer que traiga valores */
    /* validar que no vengan vacio */
    if (titulo === '' || precio === '' || descripcion === '' || categoria === '') {
        alert('Los campos no pueden estar vacíos');
        return;
    }

    //crear producto
    const producto = {
        title: titulo,
        price: precio,
        category: categoria,
        description: descripcion,
        thumbnail: `https://dummyjson.com/image/400x200/008080/ffffff?text=${titulo}`
    };
    //hacer la peticion
    fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto) //se convierte a json
    })
        .then(resApi => resApi.json()) //Si sale bien
        .then(data => {
            console.log("Respuesta API:", data);
            //hacer visible el div que esta como resultado
            res.style.display = 'block';
            res.innerHTML = `<p class="text-green-600 font-bold">Producto agregado con éxito. 
                ID: ${data.id}<br>
                Nombre: ${data.title}<br>
                Precio: ${data.price}</p>`;
            //limpiar los campos
            document.getElementById('titulo').value = '';
            document.getElementById('precio').value = '';
            document.getElementById('descripcion').value = '';
            document.getElementById('categorias').value = '';
        })        
}


