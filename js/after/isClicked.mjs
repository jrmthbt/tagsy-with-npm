// is clicked function

import {addRow, renderAnswereditor} from "./addRow.mjs";
import {blockContainer, deblockContainer, noDropCursor} from "./noDropCursor.mjs";
import {changeBtn} from "./editRow.mjs";
import {qcmAnswer, shortAnswer} from "./response.mjs";
import {confirmChangement} from "./ConfirmBox.mjs";
import {toggleDisplay} from "./toogleDisplay.mjs";
import {renderTable} from "./render.mjs";

export let isClicked = (e) => {
    if (e.target.id === "answer-add"){
        if (document.getElementById("answer").checked) {
            addRow(shortAnswer);
            renderAnswereditor();
        }
        if (document.getElementById("qcm").checked){
            addRow(qcmAnswer);
            renderAnswereditor();
        }
    }

    if (e.target.classList.contains("edit")){
        noDropCursor();
        changeBtn();
    }

    if (e.target.id === "change"){
        blockContainer();
        confirmChangement("Voulez-vous changer le type d'exercice?");
        toggleDisplay(document.getElementById("confirmBox"));

    }


    if (e.target.classList.contains("btn-cancel")){
        toggleDisplay(document.getElementById("confirmBox"));
        deblockContainer();

    }
}
