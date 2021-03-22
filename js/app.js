
import {Model} from "./composents/model.mjs";
import {View} from "./composents/view.mjs";
import {Controller} from "./composents/controller.mjs";
import {getTagsy, callLS, stopLS} from "./composents/API/LocalStorage.mjs";


let app = new Controller(new Model(), new View());

console.table(app.model.qcmAnswers);
console.table(app.model.shortAnswers);

if (document.getElementById("save-info").checked === true){
    callLS();

}else{
   document.getElementById("save-info").addEventListener("change", function(){
       if (this.checked){
           callLS();
       }else{
           stopLS();
       }
   })
}

document.body.onload = getTagsy;
