// is checked function

import {displayResponse, displayTable} from "./displayTable.mjs";
import {qcmAnswer} from "./response.mjs";

export let isChecked = (e) =>{
    if (e.target.id === "qcm"){
        console.log("qcm exercice");
        displayTable();
        displayResponse(qcmAnswer);

    }
    if (e.target.id === "identification"){
        console.log("identification exercice");
    }
    if (e.target.id === "answer"){
        console.log("reonse courte exercice");
    }
}