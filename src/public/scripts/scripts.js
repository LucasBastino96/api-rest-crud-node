function decirHola() {
  console.log('hola');
}

function postForm(){
  let nombre = document.getElementById("nombre")
  let apellido = document.getElementById("apellido")
  let edad = document.getElementById("edad")
  fetch('http://localhost:5000/agregarAfiliado', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        "nombre" : nombre.value,
        "apellido" : apellido.value,
        "edad" : edad.value
      })
  })
    .then(response => response.json())
    .then(response => console.log(response))
    .then(console.log(nombre.value));
    }


function agregarFamiliar() {
  const form = document.getElementById('form-afiliado');
    console.log('familiar agregado');
    const familiarForm = document.createElement("div");
    familiarForm.innerHTML = `<form id="form-familiar" action="/agregarFamiliar" method="POST">
    <input id="nombre" type="text" name="nombre" placeholder="Nombre" />
    <input id="apellido" type="text" name="apellido" placeholder="Apellido" />
    <input id="edad" type="number" name="edad" placeholder="Edad" />
    <input id="dni" type="number" name="dni" placeholder="DNI" />
    <button type="submit">Enviar</button>
    <button class="btn btn-primary btn-familiar" onclick="agregarFamiliar(); ocultarBotones();">AGREGAR FAMILIAR</button>

  </form>`;
  form.appendChild(familiarForm);
}


function ocultarBotones() {
  console.log('funcion botones se ejecuto')
  const botones = Array.from(document.querySelectorAll(".btn-familiar"));
  for (let boton of botones) {
    boton.style.display = "none";
  }
  botones.pop().style.display = "flex";
  // botones.pop().style.display = "flex";
}