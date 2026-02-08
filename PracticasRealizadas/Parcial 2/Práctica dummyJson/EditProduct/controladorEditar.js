const idProducto = new URLSearchParams(window.location.search).get('id');

const cargarProducto = () => {
    
    fetch(`https://dummyjson.com/products/${idProducto}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: ''
        })
    })
        .then(res => res.json())
        .then(console.log);

};

cargarProducto();