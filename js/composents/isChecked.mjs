// is checked function

import {displayResponse, displayTableAnswer} from "./displayTableAnswer.mjs";
import {qcmAnswer, shortAnswer} from "./response.mjs";
import {hideTable} from "./hideTable.mjs";
import {renderTable} from "./render.mjs";
import {disableRadio} from "./noDropCursor.mjs";
import {toggleDisplay} from "./toogleDisplay.mjs";

export let isChecked = (e) =>{
    if (e.target.id === "qcm"){
        displayTableAnswer(e.target);
        displayResponse(qcmAnswer);
        disableRadio(document.getElementById("qcm"),document.getElementById("identification"),document.getElementById("answer"), document.getElementsByClassName("label-name")[1],document.getElementsByClassName("label-name")[2]);
        toggleDisplay(document.getElementById("change"));

    }
    if (e.target.id === "identification"){
        console.log("identification exercice");
        hideTable();
        disableRadio(document.getElementById("identification"),document.getElementById("qcm"),document.getElementById("answer"),document.getElementsByClassName("label-name")[0],document.getElementsByClassName("label-name")[2]);
        toggleDisplay(document.getElementById("change"));

    }
    if (e.target.id === "answer"){
        displayTableAnswer(e.target);
        displayResponse(shortAnswer);
        renderTable(qcmAnswer);
        disableRadio(document.getElementById("answer"),document.getElementById("identification"),document.getElementById("qcm"),document.getElementsByClassName("label-name")[0],document.getElementsByClassName("label-name")[1]);
        toggleDisplay(document.getElementById("change"));
    }
}