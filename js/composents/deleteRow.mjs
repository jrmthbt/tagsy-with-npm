import {qcmAnswer} from "./response.mjs";
import {displayResponse} from "./displayTable.mjs";

export let deleteRow = index => {
    console.log(index)
    qcmAnswer.splice(index,1);
    displayResponse(qcmAnswer);
}