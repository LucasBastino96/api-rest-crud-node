function agregarFamiliarForm() {
  const form = document.getElementById('form-afiliado');
    const familiarForm = document.createElement("div");
    familiarForm.innerHTML = `<form id="form-familiar">
    <input id="nombre" type="text" name="nombre" placeholder="Nombre" />
    <input id="edad" type="text" name="edad" placeholder="Edad" />
    <div type="button" id="boton-agregar-familiar" class="btn btn-primary btn-familiar" onclick="postFamiliarForm(); agregarFamiliarForm(); ocultarBotones(); desactivarBotonesNavegacion();">AGREGAR OTRO FAMILIAR</div>
    <div type="button" id="boton-listo" class="btn btn-primary btn-familiar" onclick="postFamiliarForm(); desactivarBotones(); activarBotonesNavegacion();">LISTO</div>
  </form>`;
  form.appendChild(familiarForm);
}
// const nombre = Array.from(document.querySelectorAll(".nombre")).pop();
