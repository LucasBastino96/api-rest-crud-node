function backUp() {
  console.log('hola');
}



function agregarFamiliarForm() {
  const form = document.getElementById('form-afiliado');
    const familiarForm = document.createElement("div");
    familiarForm.innerHTML = `<form id="form-familiar">
    <input id="nombre" type="text" name="nombre" placeholder="Nombre" />
    <input id="edad" type="text" name="edad" placeholder="Edad" />
    <input id="dni_original" type="text" name="dni_original" placeholder="DNI del Afiliado" />
    <div type="button" class="btn btn-primary btn-familiar" onclick="postFamiliarForm(); agregarFamiliarForm(); ocultarBotones();">AGREGAR OTRO FAMILIAR</div>
    <div type="button" class="btn btn-primary btn-familiar" onclick="postFamiliarForm(); desactivarBotones();">ENVIAR</div>
  </form>`;
  form.appendChild(familiarForm);
}
// const nombre = Array.from(document.querySelectorAll(".nombre")).pop();
