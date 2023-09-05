
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

  const activarBotonFamiliar = () =>{
    const boton = document.getElementById('boton-agregar-familiar')
    boton.classList.remove('disabled')
  }

  const activarBotonesNavegacion = () =>{
    const afiliado = document.getElementById('boton-otro-afiliado')
    const ficha = document.getElementById('boton-ficha')
    afiliado.classList.remove('ocultar')
    ficha.classList.remove('ocultar')
  }

  const desactivarBotonesNavegacion = () =>{
    const afiliado = document.getElementById('boton-otro-afiliado')
    const ficha = document.getElementById('boton-ficha')
    afiliado.classList.add('ocultar')
    ficha.classList.add('ocultar')
  }