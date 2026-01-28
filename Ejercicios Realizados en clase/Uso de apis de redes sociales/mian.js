const selectUsuario = document.getElementById('select-usuario');
const muroDiv = document.getElementById('muro');
const avatarImg = document.getElementById('avatar-img');
const nombreHeader = document.getElementById('nombre-usuario');

//caragar los usuarios en el select
fetch('https://jsonplaceholder.typicode.com/users')
  .then(respuesta => respuesta.json())//convertir la respuesta a json para manipularla
  .then(USUARIOS => {//preguntar si esta bien la respuesta
    USUARIOS.forEach(usuario => { //recorrer el array de usuarios
      
        const option = `<option value="${usuario.id}">${usuario.name}</option>`; //crear una opcion por cada usuario
        selectUsuario.innerHTML += option;


        /* const option = document.createElement('option'); //crear una opcion por cada usuario
      option.value = usuario.id;
      option.textContent = usuario.name;
      selectUsuario.appendChild(option); */
      /* alert(usuario.name); */
    });
  });

  const cargarMuro = () => {
    //limpiar el muro
    const userId = selectUsuario.value;
    const nombre = selectUsuario.options[selectUsuario.selectedIndex].text;
    muroDiv.innerHTML.src = '';
    nombreHeader.textContent = nombre;
    avatarImg.src = `https://api.dicebear.com/9.x/adventurer/svg?seed=${nombre}`;
    avatarImg.style.display = 'block';
   /*  avatarImg.style.width = '100px'; */
    /* alert(userId +  ' - ' + nombre); */

    //cargar los posts del usuario seleccionado
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then(respuesta => respuesta.json())
      .then(posts => {
        muroDiv.innerHTML = '';//limpiar el muro
        
        posts.forEach(post => {
     muroDiv.innerHTML += `
            <div class="post">
              <h3 class="post-title">${post.title}</h3>
              <p>${post.body}</p>
            </div>
          `;          
          });
        });
  }
    //cargar los posts del usuario seleccionado
    

  //dicebear ==> crea una imagen de avatar a partir del nombre del usuario