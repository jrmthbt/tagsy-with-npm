import {qcmAnswer} from "./response.mjs";
import {displayResponse} from "./displayTable.mjs";

export let addRow = () =>{
    const choix = document.getElementById("choice").value;
    let goodChoice = "";
    if(document.getElementById("good-answer").checked){
      goodChoice = "checked";
    }

    if (choix){
        const answer = {choix: choix, checked:goodChoice}

       if (document.getElementById("hidden").value.length >0){
           qcmAnswer.splice(document.getElementById("hidden").value, 1, answer);
       }else{
           qcmAnswer.push(answer);
       }

        console.table(qcmAnswer);

        return displayResponse(qcmAnswer);
    }
}

export let renderAnswereditor = () => {
    document.getElementById("choice").value ="";
    document.getElementById("good-answer").checked = false;
    document.getElementById("hidden").value = "";
}