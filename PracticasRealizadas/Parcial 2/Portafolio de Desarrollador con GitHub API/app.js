const url = "https://api.github.com/users/isai-PC";

const cargarUsuario = () => {
    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            const usuario = data
            mostrarUsuario(usuario)
        })
};

const mostrarUsuario = (user) => {
    const perfil = document.getElementById("contenedor-perfil");
    perfil.innerHTML = "";
    const tarjeta = document.createElement("div");
    tarjeta.innerHTML = `
        <img src="${user.avatar_url}" class="w-40 h-40 rounded-2xl border-2 border-slate-800 mb-4" id="img-perfil"> <p class="text-2xl font-bold text-white" id="name-user">${user.name || user.login}</p>
        <p class="text-slate-400 text-sm leading-relaxed" id="bibliografia-user">${user.bio || ""}</p>
        <p class="text-cyan-500 text-xs font-mono" id="ubicacion-user">${user.location || ""}</p>    
`;
    perfil.appendChild(tarjeta);
}

const mostrarRepositorios = () => {
    fetch(`${url}/repos?sort=update&per_page=6&type=owner&direction=desc`) .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("repositorios-user");
        data.forEach(repositorio => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("p-4", "mt-4", "bg-slate-900", "rounded-lg", "border", "border-slate-800"); tarjeta.innerHTML = `
                <div class="card-body">
                    <h3 class="card-title text-white font-bold">${repositorio.name}</h3>
                    <a href="${repositorio.html_url}" target="_blank" class="text-cyan-500 text-xs font-bold uppercase">Ver Codigo</a>
                </div> 
            `;
            contenedor.appendChild(tarjeta); });
    })
};

const mostrarSeguidores = () => {
    fetch(`${url}/followers`) .then(Response => Response.json())
    .then(data => {
        const lista = document.getElementById("comunidad-user")
        lista.innerHTML = ""

        data.forEach(seguidores => {
            const tarjeta = document.createElement("div")
            tarjeta.className = "flex items-center gap-3 p-1";
            tarjeta.innerHTML = `
            <img src="${seguidores.avatar_url}" alt="Avatar" class="w-8 h-8 rounded-full border border-slate-700" id="avatar-perfil">
                <p id="user-name" class="text-slate-300 text-xs">${seguidores.login}</p>
            `
            lista.appendChild(tarjeta)
        })
    })
}

cargarUsuario();
mostrarRepositorios();
mostrarSeguidores();