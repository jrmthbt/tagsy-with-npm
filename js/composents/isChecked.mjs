// is checked function

import {displayResponse, displayTable} from "./displayTable.mjs";
import {qcmAnswer, shortAnswer} from "./response.mjs";

export let isChecked = (e) =>{
    if (e.target.id === "qcm"){
        displayTable(e.target);
        displayResponse(qcmAnswer);

    }
    if (e.target.id === "identification"){
        console.log("identification exercice");
    }
    if (e.target.id === "answer"){
        displayTable(e.target);
        displayResponse(shortAnswer);
    }
}