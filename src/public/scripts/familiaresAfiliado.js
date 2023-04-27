const renderFamiliares = (familiares) =>{
    const headerTabla = document.getElementById('tabla-resultadosBusqueda')
    headerTabla.innerHTML = `
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Edad</th>
        </tr>
    </thead>
    <tbody id="tbody-resultadosBusqueda"></tbody>`

    renderData(familiares);
}

const renderData = (familiares) =>{
    const data = document.getElementById('tbody-resultadosBusqueda')
    familiares.map(f => {
    data.innerHTML += `
        <tr>
            <td>${f.nombre}</td>
            <td>${f.edad}</td>
        </tr>
    `
})

}

decirHola = () => {
    console.log('hola')
}