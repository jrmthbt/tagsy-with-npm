 export const tagsy = {
    "autoSave" : document.getElementById("save-info"),
    "counterAuto" : document.getElementById("counter"),
     "exerciceName" : document.getElementById("name-exercise"),
};


export const tagsyEditor = {
    "qcmCheck" : document.getElementById("qcm"),
    "identifyCheck" : document.getElementById("identification"),
    "shortCheck" : document.getElementById("short-answer"),
    "questionName" : document.getElementById("question-name"),
    "explanationCheck" : document.getElementById("explication"),
    "explanation" : document.getElementById("explication-text"),
    "table" : JSON.parse(sessionStorage.getItem("qcmAnswers"))|| JSON.parse(sessionStorage.getItem("shotAnswers ")),

}

 export let saveTagsy = (tagsy, tagsyEditor)=> {
    if (typeof localStorage === "undefined" && JSON) {
        document.querySelector('#time-save').innerHTML = "Sauvegarde automatique indisponible";
    }
    let tagsyData = {
        'autoSave' : tagsy.autoSave.checked,
        'counterAuto' : tagsy.counterAuto.checked,
        'exerciseName' : tagsy.exerciceName.value,
    }

    let tagsyEditorData = {
        'qcm' : tagsyEditor.qcmCheck.checked,
        'identification' : tagsyEditor.identifyCheck.checked,
        'shortAnswer' : tagsyEditor.shortCheck.checked,
        "questionName": tagsyEditor.questionName.value,
        "explanationCheck" : tagsyEditor.explanationCheck.checked,
        "explanation" : tagsyEditor.explanation.value,

    }
    let store = JSON.stringify(tagsyData);
    sessionStorage.setItem("tagsy", store);

    let editor = JSON.stringify(tagsyEditorData)
     sessionStorage.setItem("tagsyEditor", editor)


}


export let callLS =() => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focusout", save)
    })

    document.querySelectorAll("input[type=checkbox]").forEach(check => {
        check.addEventListener("change", save)
    })
    document.querySelectorAll("button").forEach(btn=>{
        btn.addEventListener("click", save)
    })
}

export let stopLS = ()=>{
    document.querySelectorAll("input").forEach(input => {
        input.removeEventListener("focusout", save);

    })
    document.querySelectorAll("input[type=checkbox]").forEach(check => {
        check.removeEventListener("change", save)
    })

    document.querySelectorAll("button").forEach(btn=>{
        btn.removeEventListener("click", save)
    })
}

let save = () => {
     saveTagsy(tagsy, tagsyEditor);

}

