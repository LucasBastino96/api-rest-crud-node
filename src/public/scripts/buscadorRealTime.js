const checkKey = (key, page) => {
    (key == '') ? enviarKeyVacia() : enviarKey(key, page);
}

const enviarKeyVacia = () => {
    document.getElementById('seccion-busqueda').innerHTML = '';
    document.getElementById('tabla-resultadosBusqueda').innerHTML = '';
    document.getElementById('footer-tabla').innerHTML = ``
    document.getElementById('logo').innerHTML = `<i class="bi bi-alexa"></i>`
    document.getElementById('container-tabla-footer').style.display = 'none'
}

const enviarKey = (key, page) => {
fetch('http://localhost:5000/buscadorRealTime', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: key, page: page})})
    .then(res => res.json())
    .then(res => tablaResultadosBusqueda(res))

};


const tablaResultadosBusqueda = (res) =>{
    const docs = res.resultadosBusqueda.docs
    const titulo = document.getElementById('seccion-busqueda')
    const headerTabla = document.getElementById('tabla-resultadosBusqueda')
    document.getElementById('logo').innerHTML = ``;
    if (docs == ''){
        titulo.innerHTML = 'No hay coincidencias'
        headerTabla.innerHTML = ``
        document.getElementById('footer-tabla').innerHTML = '';
        
    } else {
        titulo.innerHTML = 'Lista de afiliados:'
        headerTabla.innerHTML = `
        <thead>
        <tr>
        <th>Apellido y Nombre</th>
        <th>Edad</th>
        <th>DNI</th>
        <th></th>
        </tr>
        </thead>
        <tbody id="tbody-resultadosBusqueda"></tbody>`
        
        document.getElementById('container-tabla-footer').style.display = 'flex';
        const data = document.getElementById('tbody-resultadosBusqueda')
        docs.forEach(a => {
        data.innerHTML += `
            <tr>
                    <td>${a.apellido}, ${a.nombre}</td>
                    <td>${a.edad}</td>
                    <td>${a.dni}</td>
                    <td><a class="btn boton-ficha" href="/fichaAfiliado/${a._id}"><i class="bi bi-file-earmark-text"></i></a></td>     
            </tr>
        `
    })

    footerTabla(res);
}}

const footerTabla = (res) =>{
    const key = res.key
    const page = res.resultadosBusqueda.page
    const totalPages = res.resultadosBusqueda.totalPages
    const hasPrevPage = res.resultadosBusqueda.hasPrevPage
    const prevPage = res.resultadosBusqueda.prevPage
    const nextPage = res.resultadosBusqueda.nextPage
    const hasNextPage = res.resultadosBusqueda.hasNextPage
    const aproximador = Math.round(totalPages/6)
    const footerTabla = document.getElementById('ul-pagination')
    footerTabla.innerHTML = ``;

    
    
    // EMPIEZA EL IF
    if (totalPages > 10){
        if (hasPrevPage == true){
                footerTabla.innerHTML = `<button class="btn btn-paginador" id="btn-primera" value="${key}" name="1" onclick="enviarKey(value, name)"><<</button>`;
                footerTabla.innerHTML += `<button class="btn btn-paginador" id="aprox-menos" value="${key}" name="${page-aproximador}" onclick="enviarKey(value, name)">...</button>
                <button class="btn btn-paginador" id="btn-prev" value="${key}" name="${prevPage}" onclick="enviarKey(value, name)"><</button>`
            if (page < aproximador){
                document.getElementById('aprox-menos').name = 1;
            }
        }
        if (page <= 5){ // si son las primeras 5 paginas mostrar las primeras 10 paginas
            for (let i=1; i<10; i++){
                // console.log(i)
                footerTabla.innerHTML += `<button class="btn btn-paginador" value="${key}" name="${i}" onclick="enviarKey(value, name)">${i}</button>`
            }

        } else if (page >= totalPages-5){ // si son las ultimas 5 paginas mostrar las ultimas 10 paginas
            for (let i=totalPages-10; i<totalPages+1; i++){
                console.log(i)
                footerTabla.innerHTML += `<button class="btn btn-paginador" value="${key}" name="${i}" onclick="enviarKey(value, name)">${i}</button>`
            }

        } else {
            for (let i=page-5; i<page; i++){ // sino mostrar las anteriores 5
                // console.log(i)
                footerTabla.innerHTML += `<button class="btn btn-paginador" value="${key}" name="${i}" onclick="enviarKey(value, name)">${i}</button>`
            }

            for (let i=page; i<page+5; i++){ // y las siguientes 5
                // console.log(i)
                footerTabla.innerHTML += `<button class="btn btn-paginador" value="${key}" name="${i}" onclick="enviarKey(value, name)">${i}</button>`
            }
        }

        if (hasNextPage == true){
            footerTabla.innerHTML += `<button class="btn btn-paginador" value="${key}" name="${nextPage}" onclick="enviarKey(value, name)">></button>`;
            footerTabla.innerHTML += `<button class="btn btn-paginador" id="aprox-mas" value="${key}" name="${page+aproximador}" onclick="enviarKey(value, name)">...</button>
            <button class="btn btn-paginador" value="${key}" name="${totalPages}" onclick="enviarKey(value, name)">>></button>`
            if (totalPages-aproximador < page){
                document.getElementById('aprox-mas').name = totalPages
            }
    }

    } // TERMINA EL IF 
    // SI TUVIERA MENOS DE 10 PAGINAS
    else for (let i=0; i<totalPages; i++){
        footerTabla.innerHTML += `<button class="btn btn-paginador" value="${key}" name="${i+1}" onclick="enviarKey(value, name)">${i+1}</button>`
    }

    const pagActual = document.getElementsByName(`${page}`);
    pagActual[0].classList.add('pag-actual');

} // termina funcion


