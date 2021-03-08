import {qcmAnswer} from "./response.mjs";


export let editRow = (index) => {
    const answer = qcmAnswer.find((qcmChoices,i) => {
        return i == index;

    });

    console.log(index);

    document.getElementsByTagName("tr")[parseInt(index)+1].style.backgroundColor = "rgba(100,100,100, 0.5)";

    document.getElementById("choice").value = answer.choix;
    document.getElementById("good-answer").checked = answer.checked;
    document.getElementById("hidden").value = index;

}

export let changeBtn = () => {
    document.getElementById("answer-add").innerHTML = "Confirmer modifications";
    document.getElementById("answer-add").classList.remove("btn-primary");
    document.getElementById("answer-add").classList.add("btn-secondary");

}
