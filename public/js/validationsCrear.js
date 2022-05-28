window.addEventListener('load', (e) => {
    const form = document.querySelector('.crud-form');

    form.name.focus();
    form.addEventListener('submit', e=>{
        const name = document.querySelector('#name');
        const price = document.querySelector('#price');
        const stock = document.querySelector('#stock');
        const details = document.querySelector('#details');


        let errors = [];

        if(name.value === " "){
            errors.push('Ingrese un nombre válido');
            // AÑADIR CLASSLIST.ADD Y CREAR LA CLASE
        }


        if(errors.length > 0){
            let ulErrors = document.querySelector('.errors');
            e.preventDefault();
            ulErrors.classList.add('error');
            ulErrors.innerHTML = "";
            for(let i = 0; i < errors.length; i++){
                ulErrors.innerHTML += '<li>' + errors[i] + '</li>';
            }
        }else {
            alert('SI')
        }

    })
}) 