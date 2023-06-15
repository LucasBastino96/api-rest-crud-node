
const toggleFamiliares = () =>{
    document.getElementById('familiares').classList.toggle('ocultar')
    // x.style.display = 'block' tambien sirve
    console.log('cambiado')
}

const editarAfiliado = () =>{
    const inputs = Array.from(document.getElementsByClassName('disabled'))
    inputs.map( i => {
        i.classList.remove('disabled')
    })
};

const editarFamiliar = (dataFamiliar) =>{
    const inputs = Array.from(document.querySelectorAll('[data-familiar= ' + CSS.escape(dataFamiliar) + ' ]'));
    inputs.map( i => {
        i.classList.remove('disabledFamiliar')
    })
}

const mostrarBoton = () =>{
    document.getElementById('guardar-cambios').classList.remove('ocultar')
    
}

const mostrarBotonFamiliar = (id) =>{
    document.getElementById(`guardar-cambios-${id}`).classList.remove('ocultar')
    
}

