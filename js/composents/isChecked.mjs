// is checked function

import {displayResponse, displayTable} from "./displayTable.mjs";
import {qcmAnswer, shortAnswer} from "./response.mjs";
import {hideTable} from "./hideTable.mjs";
import {renderTable} from "./render.mjs";

export let isChecked = (e) =>{
    if (e.target.id === "qcm"){
        displayTable(e.target);
        displayResponse(qcmAnswer);

    }
    if (e.target.id === "identification"){
        console.log("identification exercice");
        hideTable();
        renderTable(qcmAnswer);
        renderTable(shortAnswer);

    }
    if (e.target.id === "answer"){
        displayTable(e.target);
        displayResponse(shortAnswer);
        renderTable(qcmAnswer);
    }
}