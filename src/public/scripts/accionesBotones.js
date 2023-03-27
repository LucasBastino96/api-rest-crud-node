
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