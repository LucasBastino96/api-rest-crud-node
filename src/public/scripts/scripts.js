function decirHola() {
  console.log('hola');
}

const postForm = () => {
  let nombre = document.getElementById("nombre").value
  let apellido = document.getElementById("apellido").value
  let edad = document.getElementById("edad").value
  console.log(nombre);
  console.log(apellido);
  console.log(edad);
  fetch('http://localhost:5000/agregarAfiliado', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "nombre" : nombre,
        "apellido" : apellido,
        "edad" : edad
      })
  }).then(console.log(`Afiliado ${nombre} agregado mediante postForm()`))}

  function postFamiliarForm(){
    let nombre = Array.from(document.getElementsByName('nombre')).pop().value;
    console.log(nombre);
    let edad = Array.from(document.getElementsByName('edad')).pop().value;
    console.log(edad);
    let dni_original = Array.from(document.getElementsByName('dni_original')).pop().value;
    console.log(dni_original)

    fetch('http://localhost:5000/agregarFamiliar', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          "nombre" : nombre,
          "edad" : edad,
          "dni_original" : dni_original
        })
    }).then(console.log(`Familiar ${nombre} agregado mediante postFamiliarForm()`))}

function agregarFamiliarForm() {
  const form = document.getElementById('form-afiliado');
    const familiarForm = document.createElement("div");
    familiarForm.innerHTML = `<form id="form-familiar">
    <input id="nombre" type="text" name="nombre" placeholder="Nombre" />
    <input id="edad" type="number" name="edad" placeholder="Edad" />
    <input id="dni_original" type="number" name="dni_original" placeholder="DNI del Afiliado" />
    <div type="button" class="btn btn-primary btn-familiar" onclick="postFamiliarForm(); agregarFamiliarForm(); ocultarBotones();">AGREGAR OTRO FAMILIAR</div>
    <div type="button" class="btn btn-primary btn-familiar" onclick="postFamiliarForm(); desactivarBotones();">ENVIAR</div>
  </form>`;
  form.appendChild(familiarForm);
}
// const nombre = Array.from(document.querySelectorAll(".nombre")).pop();

function ocultarBotones() {
  console.log('Funcion botones se ejecuto')
  const botones = Array.from(document.querySelectorAll(".btn-familiar"));
  for (let boton of botones) {
    boton.style.display = "none";
  }
  botones.pop().style.display = "inline";
  botones.pop().style.display = "inline";

  // probar desactivar los botones en vez de esconderlos
}

const desactivarBotones = () =>{
  const botones = Array.from(document.querySelectorAll('.btn-familiar'))
  // botones.pop().disabled = 'true';
  // botones.pop().disabled = 'true';
  botones.pop().classList.add('disabled');
  botones.pop().classList.add('disabled');
  console.log('Funcion desactivar botones ejecutada')

}