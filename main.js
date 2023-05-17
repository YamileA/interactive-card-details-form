const btnConfirm = document.getElementById("confirm");
const formulario = document.getElementById("form");
const success = document.querySelector(".success")
const btnContinue = document.getElementById("continue")

const inputs = document.querySelectorAll("input");
const nameCard = document.querySelector(".name");
const numberCard = document.querySelector(".number");
const mmCard = document.querySelector(".mm");
const yyCard = document.querySelector(".yy");
const cvcCard = document.querySelector(".cvc");
const mss = document.querySelectorAll(".error");


const area_form = document.getElementById("form");
var expReg = [
    {"param": nameCard, "expresion": /^[a-zA-Z\s]+$/,  "last_value" : "", "message" : "Wrong format, letters only", "valid" : false },
    {"param": numberCard, "expresion": /^(([0-9]{4}\s){3}[0-9]{4})$/, "last_value" : "", "message" : "Wrong format, numbers only", "valid" : false},
    {"param": mmCard, "expresion": /^(1[0-2]|[1-9])$/, "last_value" : "", "message" : "Wrong format", "valid" : false},
    {"param": yyCard, "expresion": /^(0?[1-9]|[1-9][0-9])$/, "last_value" : "", "message" : "Wrong format", "valid" : false},
    {"param": cvcCard, "expresion": /^\d{3}$/, "last_value" : "", "message" : "Wrong format, only three numbers", "valid" : false}
]

//evento input en todo el formulario 
area_form.addEventListener('keyup', ()=>{
    for(let index in inputs){
        var input_value = inputs[index].value; 
        //si tiene un valor diferente a ¨¨ y al anterior
        if (input_value && input_value != expReg[index]["last_value"] ){
            let reg_value = expReg[index]["expresion"];
            expReg[index]["last_value"] = input_value;
            //reemplaza el texto de la tarjeta con el del input 
            expReg[index]["param"].textContent = input_value;  
            validar(reg_value, input_value, index);
        }
    }
})

//Para añadir un espacio entre cada 4 caracteres
inputs[1].addEventListener('keyup', ()=>{
    let inputNumber = document.getElementById("number").value;
    if((inputNumber.length==4 || inputNumber.length==9 || inputNumber.length==14)){
        inputNumber = inputNumber + " ";

    //Actualizar el input con el texto formateado
    document.getElementById("number").value=inputNumber;
}})



function validar(reg_value, input_value, index ){
    let vali = reg_value.test(input_value);

    if(vali){
        inputs[index].setAttribute('style', 'border-color: blueviolet'); 
        mss[index].setAttribute('style', 'display:none');
        //mss[index].textContent.style.display="none";
        //mss[index].style.display="none";
        expReg[index]["valid"] = true;
        inputs[index].setAttribute('style', 'border-color: blueviolet');
    }
    else {
        expReg[index]["valid"] = false;
        
        mss[index].setAttribute('style', 'display:flex');
        inputs[index].setAttribute('style', 'border-color: red');
        //mss.style.display = "flex";
        if ( input_value < 1 ){
            mss[index].textContent = "Can't be blank"
        }else{
            mss[index].textContent = expReg[index]["message"]
        }
    }
}

//Enviar el formulario y activar el estado completado.
btnConfirm.addEventListener('click', (e)=>{
    e.preventDefault();
    enviar();
    console.log(validate, "validate click confirm")
    confirmar();
});

function enviar(){
    for( let validarr in expReg){

        if (!!expReg[validarr]["valid"]){
            mss[validarr].setAttribute('style', 'display:flex');
            mss[validarr].style.display="flex";
            //mss[validarr].style.display = "flex";

            if ( expReg[validarr]["last_value"] == 0 ){
                mss[validarr].textContent = "Can't be blank"
            }else{
                mss[validarr].textContent = expReg[validarr]["message"]
            }
            //mss.textContent = expReg[validarr]["last_value"] < 1 ? "Can't be blank": expReg[validarr]["message"];
        }
        else{
            mss[validarr].setAttribute('style', 'display:none');
            mss[validarr].style.display="none";
            //mss[validarr].textContent.style.display="none";
        }
    }
    //formulario.setAttribute('style', 'display:none');
    //success.setAttribute('style', 'display:flex');
}

function confirmar() {
    if (valid){
        formulario.setAttribute('style', 'display:none');
        success.setAttribute('style', 'display:flex');
    }
    else{
        enviar()
    }
}

//Restablecer el formulario cuando el usuario haga clic en "Continuar" en el estado completado
btnContinue.addEventListener("click", (p) => {
    p.preventDefault();
    formulario.reset();
    console.log("resetiado");
    formulario.setAttribute('style', 'display:flex');
    success.setAttribute('style', 'display:none');

})




/*
    if (allInputValid){
        formulario.setAttribute('style', 'display:none');
        success.setAttribute('style', 'display:flex');
    }
    else{
        validar()
    }



    e.preventDefault();
    for(const inputt of inputs) {
        if(!inputt.validity.valid) {
            inputt.setAttribute("class", "alert");
            inputt.parentElement.querySelector("p").style.display = "block";
        }
    }
    if(formulario.checkValidity()) {
        formulario.setAttribute('style', 'display:none');
        success.setAttribute('style', 'display:flex');
    }
}*/
