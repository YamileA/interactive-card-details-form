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

var allObject = [
    {"id" : "name", "param": nameCard, "span" : "Jane Appleseed", "expresion": /^[a-zA-Z\s]+$/,  "last_value" : "", "message" : "Wrong format, letters only", "valid" : false },
    {"id" : "number", "param": numberCard, "span" : "0000 0000 0000 0000","expresion": /^(([0-9]{4}\s){3}[0-9]{4})$/, "last_value" : "", "message" : "Wrong format, numbers only", "valid" : false},
    {"id" : "mm", "param": mmCard, "span": "00","expresion": /^(0?[1-9]|1[0-2])$/, "last_value" : "", "message" : "Wrong format, numbers only MM=1-12 YY=0-99", "valid" : false},
    {"id" : "yy", "param": yyCard, "span": "00", "expresion": /^(0?[1-9]|[1-9][0-9])$/, "last_value" : "", "message" : "Wrong format, numbers only MM=1-12 YY=0-99", "valid" : false},
    {"id" : "cvc", "param": cvcCard, "span": "000", "expresion": /^\d{3}$/, "last_value" : "", "message" : "Wrong format, only three numbers", "valid" : false}
]

inputs.forEach(function(elem) {
    elem.addEventListener("keyup", function() {
        const object = allObject.find(objeto => objeto["id"] == elem.id );
        let index = allObject.findIndex(objeto => objeto["id"] == elem.id );
        var input_value = elem.value; 
        if (input_value != object["last_value"] ){
            let reg_value = object["expresion"];
            object["last_value"] = input_value;

            //reemplaza el texto de la tarjeta con el del input 
            object["param"].textContent = input_value;  

            let valido = reg_value.test(input_value);
            if(valido){
                elem.setAttribute('style', 'border-color: blueviolet'); 
                mss[index].setAttribute('style', 'display:none');
                object["valid"] = true;
            }
            else {
                object["valid"] = false;
                mss[index].setAttribute('style', 'display:flex');
                elem.setAttribute('style', 'border-color: red');

                if ( input_value.length < 1 ){
                    mss[index].textContent = "Can't be blank"
                }else{
                    mss[index].textContent = object["message"]
                }
            };
        }
        else if (object["param"].textContent == "") {
            object["param"].textContent = object["span"]
        }
        })
})

//Para añadir un espacio entre cada 4 caracteres
inputs[1].addEventListener('keyup', ()=>{
    let inputNumber = document.getElementById("number").value;
    if((inputNumber.length==4 || inputNumber.length==9 || inputNumber.length==14)){
        inputNumber = inputNumber + " ";

    //Actualizar el input con el texto formateado
    document.getElementById("number").value=inputNumber;
}})

function enviar(){
    let allValid = 0;
    for( let validar in allObject){

        if (!allObject[validar]["valid"]){
            mss[validar].setAttribute('style', 'display:flex');
            inputs[validar].setAttribute('style', 'border-color: red');

            if (inputs[validar].value == ""){
                mss[validar].textContent = "Can't be blank";
            }else{
                mss[validar].textContent = allObject[validar]["message"];
            }
        }
        else{
            allValid += 1;
            mss[validar].setAttribute('style', 'display:none');
            mss[validar].style.display="none";
            //mss[validar].textContent.style.display="none";
        }
    }
    if (allValid == 5){
        formulario.setAttribute('style', 'display:none');
        success.setAttribute('style', 'display:flex');
}}

//Enviar el formulario y activar el estado completado.
btnConfirm.addEventListener('click', (e)=>{
    e.preventDefault();
    enviar();
});

//Restablecer pagina cuando el usuario haga clic en "Continuar" en el estado completado
function continuar(){
    location.reload()
}
