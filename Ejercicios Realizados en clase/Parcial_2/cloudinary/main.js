const cloudname = "dq63gma00";
const present = "APLICACIONES WEB";
const inpuntf = document.getElementById("fileinput");
const img = document.getElementById("imagen");
//const btn  = document.getElementById("btnSubir");
const subirimg = () => {
    const foto = inpuntf.files[0];  
    //preparar el cuerpo
    const formdata = new FormData();
    formdata.append(`file`, foto)
    formdata.append(`upload_preset`, present);//lugar a donde se va a ir esa foto

     fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: 'POST',
        body: formdata
    })
    .then(res =>{
        if(!res.ok)
            throw new Error("Fallo al subir Imagen")
        return res.json(); 
    })
    .then((data)=>{
        alert("Imagen subida correctamente");
        img.src = data.secure_url;
    })
    .catch((err) => console.log(err));
};


