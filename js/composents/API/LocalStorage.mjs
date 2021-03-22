 export const tagsy = {
    "autoSave" : document.getElementById("save-info"),
    "counterAuto" : document.getElementById("counter"),
    "exerciceName" : document.getElementById("name-exercise"),
};

 export let saveTagsy = (tagsy)=> {
    if (typeof localStorage === "undefined" && JSON) {
        document.querySelector('#time-save').innerHTML = "Sauvegarde automatique indisponible";
    }

    let tagsyData = {
        'autoSave' : tagsy.autoSave.checked,
        'counterAuto' : tagsy.counterAuto.checked,
        'exerciseName' : tagsy.exerciceName.value
    }

    console.log(tagsyData);

    let store = JSON.stringify(tagsyData);
    localStorage.setItem("saveTagsy", store);


}

 export let getTagsy = () => {
     const getData = JSON.parse(localStorage.getItem('saveTagsy'));
     console.log(getData);

         document.getElementById("save-info").checked = getData.autoSave;
         document.getElementById("counter").checked = getData.counterAuto;
         if (getData.exerciseName) {
             document.getElementById("name-exercise").value = getData.exerciseName;
         }

 }

export let callLS =() => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("focusout", save)
    })
}

export let stopLS = ()=>{
    document.querySelectorAll("input").forEach(input => {
        input.removeEventListener("focusout", save);

    })
}

let save = () => {
     saveTagsy(tagsy);
}
