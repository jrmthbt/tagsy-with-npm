// is clicked function

import {addRow, renderAnswereditor} from "./addRow.mjs";
import {noDropCursor} from "./noDropCursor.mjs";
import {changeBtn} from "./editRow.mjs";
import {qcmAnswer, shortAnswer} from "./response.mjs";

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
}
