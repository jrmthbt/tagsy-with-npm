// is clicked function

import {addRow, renderAnswereditor} from "./addRow.mjs";
import {noDropCursor} from "./noDropCursor.mjs";
import {changeBtn} from "./editRow.mjs";

export let isClicked = (e) => {
    if (e.target.id === "answer-add"){
        console.log("add response");
        addRow();
        renderAnswereditor();
    }

    if (e.target.classList.contains("edit")){
        noDropCursor();
        //changeBtn();
    }
}
