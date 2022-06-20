const form = document.querySelector('.crud-form')
const inputs = document.querySelectorAll('.crud-form input');
const textarea = document.querySelector('.crud-details textarea');
let pricesText = document.querySelector('.crud-prices .text-danger')
let nameText = document.querySelector('.crud-name .text-danger')
let stockText = document.querySelector('.crud-stock .text-danger')
let detailsText = document.querySelector('.crud-details .text-danger')
let errorText = document.querySelector('.crud-text')

const expresiones = {
    name: /^[a-zA-Z0-9\_\-\-s]{5,15}$/, // Letras, numeros, guion y guion_bajo
    prices: /^[\0-9]{1,10}$/, // Numeros.
    stock: /^[\0-9]{0,10}$/, // Numeros.
    details:  /^[a-zA-ZÀ-ÿ0-9\_\-s]{1,200}$/, // Letras y espacios, pueden llevar acentos.
}

const campos = {
    nameC: false,
    pricesC: false,
    stockC: false,
    detailsC: false
}

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "name":
            validarCampo(expresiones.name, e.target, 'nameC', 'nameText');
        break;
        case "price":
            validarCampo(expresiones.prices, e.target, 'pricesC', 'pricesText');
        break;
        case "stock":
            validarCampo(expresiones.stock, e.target, 'stockC', 'stockText');
        break;
        case "details":
            validarCampo(expresiones.details, textarea, 'detailsC', 'detailsText');
        break;
    }
}

const validarCampo = (expresion, input, campo, text) => { 
    if(!expresion.test(input.value)){
        if(text === 'pricesText'){
            pricesText.innerHTML = '<span>Este campo debe contener entre 1 y 10 números</span>'
            campos[campo] = false;
        }
        if(text === 'nameText'){
            nameText.innerHTML = '<span>Este campo debe contener entre 5 y 15 carateres</span>'
            campos[campo] = false;
        }
        if(text === 'stockText'){
            stockText.innerHTML = '<span>Este campo debe contener máximo 10 números</span>'
            campos[campo] = false;
        }
        if(text === 'detailsText'){
            detailsText.innerHTML = '<span>Este campo debe contener entre 1 y 200 carateres</span>'
            campos[campo] = false;
        }
        
    } else {
        if(text === 'pricesText'){
            pricesText.innerHTML = [];
            campos[campo] = true;
        }
        if(text === 'nameText'){
            nameText.innerHTML = []; 
            campos[campo] = true;
        }
        if(text === 'stockText'){
            stockText.innerHTML = []; 
            campos[campo] = true;
        }
        if(text === 'detailsText'){
            detailsText.innerHTML = [];
            campos[campo] = true;
        }
    }
}
inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    textarea.addEventListener('keyup', validarFormulario);
    textarea.addEventListener('blur', validarFormulario);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(!(campos.nameC && campos.pricesC && campos.stockC && campos.detailsC)) {
        //! SI LOS DATOS SON INCORRECTOS
        errorText.style.alignContent = 'center';
        errorText.style.width = '100%';
        errorText.style.textAlign = 'center';
        return errorText.innerHTML = '<span>Debe completar los campos correspondientes</span>'
    }
    form.submit();
})