const checkKey = (key) => {
    (key == '') ? enviarKeyVacia() : enviarKey(key);
}

const enviarKeyVacia = () => {
    const resultadosBusqueda = document.getElementById('seccion-busqueda');
    resultadosBusqueda.innerHTML = 'No hay coincidencias';
}

const enviarKey = (key) => {
fetch('http://localhost:5000/buscadorRealTime', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: key })
    })
    .then(res => res.json())
    .then(res => tablaResultadosBusqueda(res))
    .then(console.log(key))

};

const tablaResultadosBusqueda = (res) =>{
    const resultadosBusqueda = document.getElementById('seccion-busqueda');
    resultadosBusqueda.innerHTML = '';
    res.forEach(a => {
        resultadosBusqueda.innerHTML += `
        <h3>Nombre: ${a.nombre}</h3><br>
        <p>Apellido: ${a.apellido}</p><br>
        <p>Edad: ${a.edad}</p><br>
        <p name="dni">DNI: ${a.dni}</p><br>
        <a href="/editarAfiliado/${a._id}">Editar</a><br>
        <a href="/familiaresAfiliado/${a._id}">Familiares</a>
        <button name="eliminar" id="${a._id}" onclick="checkConfirm(name, id)">Eliminar</button>`
    })
}

const checkConfirm = (tipo, id) => {
    const respuesta = confirm('seguro desea eliminar el afiliado?')
    console.log(id)
    if (respuesta){window.location.href = `/${tipo}/${id}`}
    // else {window.location.href = '/rechazo'} 
    }
