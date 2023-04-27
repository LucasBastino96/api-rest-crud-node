const checkConfirm = (accion, tipo, id) => {
    const respuesta = confirm('seguro desea eliminar el afiliado?')
    console.log(id)
    if (respuesta){window.location.href = `/${accion}/${tipo}/${id}`}
    // else {window.location.href = '/rechazo'}
}