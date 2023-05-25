const checkConfirm = (accion, tipo, id) => {
    const respuesta = confirm(`seguro desea ${accion} el afiliado?`)
    console.log(id)
    if (respuesta){window.location.href = `/${accion}/${tipo}/${id}`}
    // else {window.location.href = '/rechazo'}
}

const confirmar = (mensaje) =>{
    return confirm(`¿Seguro desea ${mensaje}?`);
}

