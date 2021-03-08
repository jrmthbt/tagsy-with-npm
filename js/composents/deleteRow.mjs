import {qcmAnswer, shortAnswer} from "./response.mjs";
import {displayResponse} from "./displayTable.mjs";

export let deleteRow = index => {
    if (document.getElementById("good-answer")){
        console.log(index)
        qcmAnswer.splice(index,1);
        displayResponse(qcmAnswer);
    }else {
        console.log(index)
        shortAnswer.splice(index, 1);
        displayResponse(shortAnswer);
    }
}