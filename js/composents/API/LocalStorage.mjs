 export const tagsy = {
    "autoSave" : document.getElementById("save-info"),
    "counterAuto" : document.getElementById("counter"),
    "exerciceName" : document.getElementById("name-exercise"),
     "qcmCheck" : document.getElementById("qcm"),
     "identifyCheck" : document.getElementById("identification"),
     "shortCheck" : document.getElementById("short-answer"),
     "questionName" : document.getElementById("question-name"),
     "explanationCheck" : document.getElementById("explication"),
     "explanation" : document.getElementById("explication-text"),
};

 export let saveTagsy = (tagsy)=> {
    if (typeof localStorage === "undefined" && JSON) {
        document.querySelector('#time-save').innerHTML = "Sauvegarde automatique indisponible";
    }
    let tagsyData = {
        'autoSave' : tagsy.autoSave.checked,
        'counterAuto' : tagsy.counterAuto.checked,
        'exerciseName' : tagsy.exerciceName.value,
        'qcm' : tagsy.qcmCheck.checked,
        'identification' : tagsy.identifyCheck.checked,
        'shortAnswer' : tagsy.shortCheck.checked,
        "questionName": tagsy.questionName.value,
        "explanationCheck" : tagsy.explanationCheck.checked,
        "explanation" : tagsy.explanation.value,
    }


    let store = JSON.stringify(tagsyData);
    localStorage.setItem("saveTagsy", store);


}


export let callLS =() => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focusout", save)
    })
    document.querySelectorAll("button").forEach(btn=>{
        btn.addEventListener("click", save)
    })
}

export let stopLS = ()=>{
    document.querySelectorAll("input").forEach(input => {
        input.removeEventListener("focusout", save);

    })
    document.querySelectorAll("button").forEach(btn=>{
        btn.removeEventListener("click", save)
    })
}

let save = () => {
     saveTagsy(tagsy);
}

