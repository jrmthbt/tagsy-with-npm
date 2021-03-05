/*import './composents/main.mjs';
import './composents/function';
import './composents/magasin.mjs';
import './composents/validate.mjs';
import './composents/api/localstorage.mjs';*/

/*import {questions} from "./composents/magasin.mjs";

console.table(questions);
console.table(questions[0].choix);

let fetchAllQuestions = (questions) => {
    const elApp = document.getElementsByTagName("tbody")[0];
    elApp.innerHTML = "";

    let data = "";

    questions.forEach((q , index) => {
        data +=
            `<tr>
      <td>${index+1}</td>
      <td>${q.type}</td>
      <td>${q.enonce}</td>
      <td>${q.choix}</td>
      <td>${q.BonneReponse}</td>
      <td>${q.explication}</td>
      <td>
      <button class="edit btn btn-sm btn-outline-success" value="${index}">Modifier</button>
      <button class="delete btn btn-sm btn-outline-danger" value="${index}">Supprimer</button>
      </td>
    </tr>`;
    });

    elApp.innerHTML += data;
    document.querySelectorAll("button.edit").forEach(b => {
        b.addEventListener("click", function() {
            return editQuestion(this.value);
        });
    });

    document.querySelectorAll("button.delete").forEach(b => {
        b.addEventListener("click", function() {
            return deleteMovie(this.value);
        });
    });
}

//fetchAllQuestions(questions);

const elForm = document.getElementById("form");
elForm.style.display = "none";
const elContent = document.getElementById("content");

document.getElementById("form-add").addEventListener("click", function() {
    displayForm();
});

function displayForm() {
    elForm.style.display = "block";
    elContent.style.opacity = "40%";
}

document.getElementById("form-save").addEventListener("click", function() {
    // Récupération des champs
    const type = document.getElementById("type").value;
    const enoncer = document.getElementById("enoncer").value;
    const choix = document.getElementById("choix").value;
    const bonneReponse = document.getElementById("bonne-Reponse").value;
    const explication = document.getElementById("explication").value;

    if (type && enoncer &&choix && bonneReponse && explication) {
        // Nouvelle ligne
        const question = {
            type : type,
            enonce : enoncer,
            choix : choix,
            BonneReponse : bonneReponse,
            explication : explication };

        // Ajout de la nouvelle ligne
        if (document.getElementById("hidden").value.length > 0) {
            questions.splice(document.getElementById("hidden").value, 1, question);
        } else {
            questions.push(question);
        }

        hideForm();
        // Affichage du nouveau tableau
        return fetchAllQuestions(questions);
    }
});

function hideForm() {
    elForm.style.display = "none";
    elContent.style.opacity= "100%";

    document.getElementById("type").value = "";
    document.getElementById("enoncer").value = "";
    document.getElementById("choix").value = "";
    document.getElementById("bonne-Reponse").value = "";
    document.getElementById("explication").value = "";
    document.getElementById("hidden").value = "";
}

document.getElementById("form-cancel").addEventListener("click", function() {
    hideForm();
});

function editQuestion(index) {
    // Récupération de la ligne via son index
    const question = questions.find((q, i) => {
        return i == index;
    });

    // Alimentation des champs
    document.getElementById("type").value = question.type;
    document.getElementById("enoncer").value = question.enonce;
    document.getElementById("choix").value = question.choix;
    document.getElementById("bonne-Reponse").value = question.BonneReponse;
    document.getElementById("explication").value = question.explication;
    document.getElementById("hidden").value = index;

    displayForm();
}

function deleteMovie(index) {
    if (confirm("Confirmez-vous la suppression de cette question ?")) {
        questions.splice(index, 1);
        //fetchAllQuestions(questions);
    }
}*/
