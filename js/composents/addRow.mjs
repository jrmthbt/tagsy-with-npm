import {qcmAnswer, shortAnswer} from "./response.mjs";
import {displayResponse} from "./displayTable.mjs";

export let addRow = () =>{
    const choix = document.getElementById("choice").value;
    if (document.getElementById("good-answer")) {
        var goodChoice = "";

        if (document.getElementById("good-answer").checked) {
            goodChoice = "checked";
        }
    }

    if (choix){

        if (! document.getElementById("good-answer")){
            var answer = {choix: choix}
        }else {
            var answerQcm = {choix: choix, checked: goodChoice}
        }

       if (document.getElementById("hidden").value.length >0){
           if (document.getElementById("good-answer")) {
               qcmAnswer.splice(document.getElementById("hidden").value, 1, answerQcm);
               document.getElementById("answer-add").innerHTML = "Ajouter";
               document.getElementById("answer-add").classList.remove("btn-secondary");
               document.getElementById("answer-add").classList.add("btn-primary");
           }else {
                shortAnswer.splice(document.getElementById("hidden").value, 1, answer);
               document.getElementById("answer-add").innerHTML = "Ajouter";
               document.getElementById("answer-add").classList.remove("btn-secondary");
               document.getElementById("answer-add").classList.add("btn-primary");
           }
       }else{
           if (document.getElementById("good-answer")) {
               qcmAnswer.push(answerQcm);
           }else{
               shortAnswer.push(answer);
           }
       }
        if (document.getElementById("good-answer")) {
            console.table(qcmAnswer)
            return displayResponse(qcmAnswer);
        }else{
            console.table(shortAnswer)
            return displayResponse(shortAnswer);
        }
    }
}

export let renderAnswereditor = () => {
    document.getElementById("choice").value ="";
    if (document.getElementById("good-answer")) {
        document.getElementById("good-answer").checked = false;
    }
    document.getElementById("hidden").value = "";
}