const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	edad: /^\d{1,2}$/, // 7 a 14 numeros.
    dni: /^\d{7,14}$/ // 7 a 14 numeros.
};

const campos = {
    nombre: false,
    apellido: false,
    edad: false,
    dni: false,
    empresa: false
}

const inputs = document.querySelectorAll('#form-afiliado input');
const boton = document.getElementById('boton-submit');

const validarFormulario = (input)=>{
    switch(input.target.name){
        case 'nombre':
            validarCampo(expresiones.nombre, input.target, 'nombre')
        break;
        case 'apellido':
            validarCampo(expresiones.apellido, input.target, 'apellido')
        break;
        case 'edad':
            validarCampo(expresiones.edad, input.target, 'edad')
        break;
        case 'dni':
            validarCampo(expresiones.dni, input.target, 'dni')
        break;
    }
}

const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`${campo}-correcto`).classList.add('d-inline');
        // document.getElementById(`${campo}`).classList.add('correcto');
        document.getElementById(`${campo}-incorrecto`).classList.remove('d-inline');
        document.getElementById(`${campo}`).classList.remove('incorrecto');
        campos[campo] = true;
    }
        else{
            document.getElementById(`${campo}-incorrecto`).classList.add('d-inline')
            document.getElementById(`${campo}`).classList.add('incorrecto');
            document.getElementById(`${campo}-correcto`).classList.remove('d-inline')
            document.getElementById(`${campo}`).classList.remove('correcto');
            campos[campo] = false;
        }
}

inputs.forEach( input => {
    input.addEventListener('keyup', validarFormulario);
});

boton.addEventListener('click', (e)=> {
    e.preventDefault();
    
    if (campos.nombre && campos.apellido && campos.dni && campos.edad && campos.empresa){
        postForm();
        desactivarBotones();
        activarBotonFamiliar();
        activarBotonesNavegacion();
    }
    
})


