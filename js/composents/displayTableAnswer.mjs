import {editRow} from "./editRow.mjs";
import {qcmAnswer, shortAnswer} from "./response.mjs";


export let displayTableAnswer = (target) => {

    if (target.id === "qcm") {

        document.getElementsByTagName("table")[1].innerHTML = `
        <thead>
               <tr>
                  <th scope="col" class="qcm-thead bold_15">Choix</th>
                  <th scope="col" class="qcm-thead bold_15">Bonne réponse</th>
                  <th scope="col" class="qcm-thead bold_15">Options</th>
               </tr>
             </thead>
             <tbody>
             </tbody>
                    <tfoot>
                    <tr>
                        <td>
                            <label for="choice"></label>
                            <input type="text" id="choice" class="regular_10 text-center">
                        </td>
                        <td>
                            <input type="checkbox" id="good-answer" class="toggle-checkbox">
                            <label for="good-answer" class="toggle-checkbox-label good-answer"></label>
                        </td>
                        <td>
                            <button class="btn-primary bold_10" id="answer-add">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>
        `
    }

    if (target.id === "answer"){
        console.log("answer table");
        document.getElementsByTagName("table")[1].innerHTML = `
        <thead>
        <th scope="col" class="answer-thead bold_15">Choix</th>
        <th scope="col" class="answer-thead bold_15">Options</th>
        </thead>
        <tbody></tbody>
         <tfoot>
                    <tr>
                        <td>
                            <label for="choice"></label>
                            <input type="text" id="choice" class="regular_10 text-center">
                        </td>
                        <td>
                            <button class="btn-primary bold_10" id="answer-add">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
    }
}


export let displayResponse = (response) => {

    //recupération de l'élément
    const elApp = document.getElementsByTagName("tbody")[1];
    elApp.innerHTML = "";

    let data ="";
    let row= 0;

    //récupération des données

    if (document.getElementById("qcm").checked) {

        response.forEach((choix, index) => {
            row++
            data += `
        <tr>
            <td>
            <label for="choices-${row}"></label>
            <input type="text"  class="regular_10 choices text-center choices" value="${choix.choix}" disabled>
            </td>
            <td>
            <input type="checkbox"  class="toggle-checkbox good-answer" ${choix.checked} disabled >
            <label for="good-answer-${row}" class="toggle-checkbox-label good-answer-choice"></label>
            </td>
            <td>
                <button class="btn-secondary bold_10 edit" value="${index}" id="answer-edit">Modifier</button>
                <button class="btn-tertiary bold_10 delete" value="${index}" id="answer-delete">Supprimer</button>
            </td>
        </tr>`
        });

        elApp.innerHTML += data;

        //chaque btn edit
        document.querySelectorAll(".edit").forEach(edit => {
            edit.addEventListener("click", function () {
                return editRow(this.value);
            });
        });

        document.querySelectorAll(".delete").forEach(del => {
            del.addEventListener("click", function () {
                console.log(this.value);
                return deleteRow(this.value);
            });
        });
    }

    if (document.getElementById("answer").checked){
        response.forEach((choix, index) => {
            row++
            data += `
        <tr>
            <td>
            <label for="choices-${row}"></label>
            <input type="text"  class="regular_10 choices text-center choices" value="${choix.choix}" disabled>
            </td>
            <td>
                <button class="btn-secondary bold_10 edit" value="${index}" id="answer-edit">Modifier</button>
                <button class="btn-tertiary bold_10 delete" value="${index}" id="answer-delete">Supprimer</button>
            </td>
        </tr>`
        });

        elApp.innerHTML += data;

        //chaque btn edit
        document.querySelectorAll(".edit").forEach(edit => {
            edit.addEventListener("click", function () {
                return editRow(this.value);
            });
        });

        document.querySelectorAll(".delete").forEach(del => {
            del.addEventListener("click", function () {
                console.log(this.value);
                return deleteRow(this.value);
            });
        });
    }
}

// delete from table

export let deleteRow = index => {
    if (document.getElementById("good-answer")){
        console.log(index)
        qcmAnswer.splice(index,1);
        displayResponse(qcmAnswer);
    }else {
        console.log(index)
        shortAnswer.splice(index, 1);
        displayResponse(shortAnswer);
    }
}
