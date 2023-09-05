const checkKeyEmpresas = (key) => {
    (key == '') ? enviarKeyVaciaEmpresas() : enviarKeyEmpresas(key);
}

const enviarKeyVaciaEmpresas = () => {
    document.getElementById('resultados-busqueda').innerHTML = '';
    // document.getElementById('seccion-busqueda').innerHTML = '';
    // document.getElementById('tabla-resultadosBusqueda').innerHTML = '';
    // document.getElementById('footer-tabla').innerHTML = ``
    // document.getElementById('logo').innerHTML = `<i class="bi bi-alexa"></i>`
    // document.getElementById('container-tabla-footer').style.display = 'none'
}


const enviarKeyEmpresas = (key) => {
    fetch('http://localhost:5000/buscadorEmpresas', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: key })})
        .then(res => res.json())
        .then(res => resultadosEmpresas(res))
    
    };

    const resultadosEmpresas = (res) =>{
        const div = document.getElementById('resultados-busqueda')
        const docs = res.resultadosBusqueda.docs
        div.innerHTML = '';
        docs.forEach(e => {
            div.innerHTML += `<li><div class="btn" onclick="elegirOpcion('${e.nombre}');">${e.nombre}</div></li>`
        })
    }

    const identificador = () => {
        const input = document.getElementById('input-empresa');
        const buscador = document.getElementById('buscador-empresa');
        const edit = document.getElementById('edit');
        const div = document.getElementById('resultados-busqueda');
        return {input, buscador, edit, div};
    }

    const elegirOpcion = (empresa) =>{
        // const input = document.getElementById('input-empresa');
        // const buscador = document.getElementById('buscador-empresa');
        // const edit = document.getElementById('edit');
        // const div = document.getElementById('resultados-busqueda');

        identificador().input.value = empresa
        identificador().div.innerHTML = '';
        identificador().input.classList.remove('ocultar');    
        identificador().edit.classList.remove('ocultar');    
        identificador().buscador.classList.add('ocultar');

        campos.empresa = true;
    }

    const editarEmpresa = () =>{
        // const input = document.getElementById('input-empresa');
        // const buscador = document.getElementById('buscador-empresa');
        // const edit = document.getElementById('edit');
        // const div = document.getElementById('resultados-busqueda');

        identificador().input.classList.add('ocultar');
        identificador().edit.classList.add('ocultar');  
        identificador().buscador.classList.remove('ocultar');

        campos.empresa = false;
    }


