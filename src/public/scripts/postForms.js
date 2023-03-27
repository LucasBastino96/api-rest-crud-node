
const postForm = () => {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const edad = document.getElementById('edad').value;
  const dni = document.getElementById('dni').value;
  fetch('http://localhost:5000/agregarAfiliado', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      dni: dni
    })
  }).then(console.log(`Afiliado ${nombre} agregado mediante postForm()`));
};



const postFamiliarForm = () => {
  const nombre = Array.from(document.getElementsByName('nombre')).pop().value;
  console.log(nombre);
  const edad = Array.from(document.getElementsByName('edad')).pop().value;
  console.log(edad);
  const dni_original = Array.from(
    document.getElementsByName('dni_original')
  ).pop().value;
  console.log(dni_original);

  fetch('http://localhost:5000/agregarFamiliar', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: nombre,
      edad: edad,
      dni_original: dni_original
    })
  }).then(
    console.log(`Familiar ${nombre} agregado mediante postFamiliarForm()`)
  );
}
