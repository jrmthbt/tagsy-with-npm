import {qcmAnswer, shortAnswer} from "./response.mjs";


export let editRow = (index) => {
    if (document.getElementById("good-answer")) {
        var qcmAnswerEdit = qcmAnswer.find((qcmChoices, i) => {
            return i == index;

        });

    }else {
        var answerEdit = shortAnswer.find((qcmChoices, i) => {
            return i == index;
        });
    }

    console.log(index);

    document.getElementsByTagName("tr")[parseInt(index)+1].style.backgroundColor = "rgba(100,100,100, 0.5)";

    if (document.getElementById("good-answer")) {
        document.getElementById("choice").value = qcmAnswerEdit.choix;
        document.getElementById("good-answer").checked = qcmAnswerEdit.checked;
        document.getElementById("hidden").value = index;
    }else{
        document.getElementById("choice").value = answerEdit.choix;
        document.getElementById("hidden").value = index;
    }

}

export let changeBtn = () => {
    document.getElementById("answer-add").innerHTML = "Confirmer modifications";
    document.getElementById("answer-add").classList.remove("btn-primary");
    document.getElementById("answer-add").classList.add("btn-secondary");

}
