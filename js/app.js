
import {Model} from "./composents/model.mjs";
import {View} from "./composents/view.mjs";
import {Controller} from "./composents/controller.mjs";
import {callLS, getTagsy, stopLS} from "./composents/API/LocalStorage.mjs";


let app = new Controller(new Model(), new View());

console.table(app.model.qcmAnswers);
console.table(app.model.shortAnswers);


if (document.getElementById("save-info").checked === true){
    callLS();

}else{
   document.getElementById("save-info").addEventListener("change", function(){
       if (this.checked){
           callLS();
       }else if(this.checked === false){
           app.view._guizmoSpeak("Voulez-vous désactiver la sauvegarde auto et perdre les données sauvées?");
           document.getElementById("message").addEventListener("click", function confirmDisable(event){
               if (event.target.classList.contains("btn-confirm")){
                   stopLS();
                   const tagsy = [];
                   localStorage.setItem("saveTagsy", JSON.stringify(tagsy));
                   app.view._removeguizmoSpeech();
               }
               if (event.target.classList.contains("btn-cancel")){
                   app.view._removeguizmoSpeech();
                   document.getElementById("save-info").checked = "checked";
                   callLS();
               }
           })
       }
   })
}


if (localStorage !== null){
    document.body.onload = getTagsy;

}

