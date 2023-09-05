
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
  })
  .then(res => res.json())
  .then(res => document.getElementById('link-nuevo-afiliado').href = `/fichaAfiliado/${res.nuevoAfiliado._id}`)
};



const postFamiliarForm = () => {
  const nombre = Array.from(document.getElementsByName('nombre')).pop().value;
  const edad = Array.from(document.getElementsByName('edad')).pop().value;
  const dni_original = document.getElementById('dni').value;

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
