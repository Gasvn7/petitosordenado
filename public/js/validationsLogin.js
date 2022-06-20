const form = document.querySelector('.form-login')
const inputs = document.querySelectorAll('input');
let emailText = document.querySelector('.text-danger-email')
let passText = document.querySelector('.text-danger-password')
let errorText = document.querySelector('.text-danger-text')


const expresiones = {
    email: /^[a-zA-Z0-9S\_\-\s]{5,15}$/, // Letras, numeros, guion y guion_bajo
    password:  /^[a-zA-ZÀ-ÿ0-9\_\s]{5,200}$/, // Letras y espacios, pueden llevar acentos.
}

const campos = {
    emailC: false,
    passwordC: false,
}

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "email":
            validarCampo(expresiones.email, e.target, 'emailC', 'emailText');
        break;
        case "password":
            validarCampo(expresiones.password, e.target, 'passwordC', 'passText');
        break;
    }
}

const validarCampo = (expresion, input, campo, text) => { 
    if(!expresion.test(input.value)){
        if(text === 'emailText'){
            emailText.innerHTML = '<span>Ingresa un email válido</span>'
            console.log(campos.emailC);
            campos[campo] = false;
        }
        if(text === 'passText'){
            passText.innerHTML = '<span>Ingresa una contraseña válida</span>'
            console.log(campos.passwordC);
            campos[campo] = false;
        }
    } else {
        if(text === 'emailText'){
            emailText.innerHTML = []; 
            console.log(campos.emailC);
            campos[campo] = true;
        }
        if(text === 'passText'){
            passText.innerHTML = [];
            console.log(campos.passwordC);
            campos[campo] = true;
        }
    }
}

inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(!(campos.emailC && campos.passwordC)) {
        //! SI LOS DATOS SON INCORRECTOS
        console.log(campos);
        errorText.style.alignContent = 'center';
        errorText.style.width = '100%';
        errorText.style.textAlign = 'center';
        return errorText.innerHTML = '<span>Debe completar los campos correspondientes</span>'
    }
    form.submit();
})