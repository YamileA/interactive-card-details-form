const btn = document.getElementById("confirm");
const formulario = document.getElementById("form");
const success = document.querySelector(".success")
const btnContinue = document.getElementById("continue")

const inputs = document.querySelectorAll("input");
const nameCard = document.querySelector(".name");
const numberCard = document.querySelector(".number");
const mmCard = document.querySelector(".mm");
const yyCard = document.querySelector(".yy");
const cvcCard = document.querySelector(".cvc");
const mss = document.querySelectorAll("p");


const area_form = document.getElementById("form");
var expReg = [
    {"param": nameCard, "expresion": /^[a-zA-Z]+$/, "message" : "Wrong format, letters only", "last_value":""},
    {"param": numberCard, "expresion": /^(([0-9]{4}\s){3}[0-9]{4})$/, "message" : "Wrong format, numbers only", "last_value":""},
    {"param": mmCard, "expresion": /^(1[0-2]|[1-9])$/, "message" : "Wrong format, only two numbers from 1-12", "last_value":""},
    {"param": yyCard, "expresion": /^(0?[1-9]|[1-9][0-9])$/, "message" : "Wrong format, only two numbers from 1-99", "last_value":""},
    {"param": cvcCard, "expresion": /^\d{3}$/,  "message" : "Wrong format, only three numbers", "last_value":""},
]


area_form.addEventListener('input', ()=>{
    for(let index in inputs){
        let input_value = inputs[index].value; 
        if (input_value && input_value != expReg[index]["last_value"] ){
            expReg[index]["last_value"] = input_value;
            let reg_value = expReg[index]['expresion'];
            //reemplaza el texto de la tarjeta con el del input 
            expReg[index]['param'].textContent = input_value;  
            
            console.log(reg_value, "reggg ");
            console.log(input_value, "inpuut ");
            validar(reg_value, input_value);
           
        
        }
    }
})


function validar(reg_value, input_value){
    let vali =reg_value.test(input_value)
    console.log(vali,"valii")
    if (!vali){
        mss.style.display = "flex"
        mss.textContent = expReg[index][message]
    }
}


