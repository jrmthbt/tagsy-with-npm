/**************/
/* MCV - VIEW*/
/*************/

export class View {
    constructor() {

        // check the IF CHECKED
        document.querySelector("body").addEventListener("click", event => {
            //QCM
            if (event.target.id === this.exercice[0]) {
                this.qcmTable(document.getElementById("root").id);
                this._lockExercice();
                this.getElement("#tool-nothing").classList.add("disabled")


            }
            // IDENTIFICATION
            if (event.target.id === this.exercice[1]) {
                this._lockExercice();
            }
            // SHORT ANSWER
            if (event.target.id === this.exercice[2]) {
                this.answerTable(document.getElementById("root").id);
                this._lockExercice();
                this.getElement("#tool-nothing").classList.add("disabled")

            }

            // EXPLANATION
            if (event.target.id === "explication") {
                if (!event.target.checked) {
                    this._hideDisplay(document.getElementById("explication-text"));
                } else {
                    this._showDisplay(document.getElementById("explication-text"));
                }
            }

            // HELP
            if (event.target.classList.contains("help-link")){
                this.getElement(".tagsy").classList.toggle("display-none")
                this.getElement(".tutoriel").classList.toggle("display-none")
                this.getElement(".help-link").classList.toggle("current")
                this.getElement(".help-link").innerHTML = "Aide"
            }

            if (event.target.classList.contains("current")){
                this.getElement(".help-link").innerHTML = "Retour"

            }


        })


        // COUNTER CLICK FOR EDIT ARRAY IN EDITOR OR IN QUESTION CREATED
        this._countClick = 0
        this._countClickEdit = 0
        // IF EXECUTED
        this._executed = false
        // VARIABLE FOR ARRAY IN EDITOR
        this.app = document.getElementById('root');
        // DIFFERENT TYPES OF EXERCISES
        this.exercice = ["qcm", "identification", "short-answer"];
        // ARRAY FOR EDIT ARRAY IN QUESTION CREATED
        this._edited = [];
        // ARRAY OF HISTORY FOR UNDO (LIMIT = 10 ELEMENTS)
        this._history = [];
        // ARRAY FOR REDO (LIMIT = 10 ELEMENTS
        this._redo = [];
        this.editing = "";
        this.check = "";


    }

    // display table when qcm is check

    qcmTable = (id) => {
        //DISPLAY ARRAY QCM
        if (id === "root") {
            this.app.innerHTML = ` <thead id="thead-root">
               <tr id="tr-thead-root">
                  <th scope="col" class="qcm-thead bold_15">Choix</th>
                  <th scope="col" class="qcm-thead bold_15">Bonne réponse</th>
                  <th scope="col" class="qcm-thead bold_15">Options</th>
               </tr>
             </thead>
             <tbody id="tbody-root">
             </tbody>
                    <tfoot id="tfoot-root">
                    <tr id="tr-tfoot-root">
                        <td id="tdO-tfoot">
                            <label for="choice"></label>
                            <input type="text" id="choice" class="regular_10 text-center" name="answer">
                        </td>
                        <td id="tdT-tfoot">
                            <input type="checkbox" id="good-answer" class="toggle-checkbox" name="answer-check">
                            <label for="good-answer" class="toggle-checkbox-label good-answer"></label>
                        </td>
                        <td id="tdTh-tfoot">
                            <button class="btn-primary bold_10" id="answer-add">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
        }
        //DISPLAY ARRAY QCM AFTER EDIT IN A QUESTION CREATED
        if (id === "tableQCM") {
            document.querySelectorAll(".tableQCM").forEach(table => {
                table.innerHTML = ` <thead class="thead-app">
               <tr class="tr-thead-app">
                  <th scope="col" class="qcm-thead bold_15">Choix</th>
                  <th scope="col" class="qcm-thead bold_15">Bonne réponse</th>
                  <th scope="col" class="qcm-thead bold_15">Options</th>
               </tr>
             </thead>
             <tbody class="tbody-app">
             </tbody>
                    <tfoot class="tfoot-app">
                    <tr class="tr-tfoot-app">
                        <td class="tdO-tfoot">
                            <input type="text" class="regular_10 text-center choices choices-edited" name="answer" disabled>
                        </td>
                        <td class="tdT-tfoot">
                            <input type="checkbox"  class="toggle-checkbox good-answer good-answer-edited" name="answer-check">
                            <label class="toggle-checkbox-label good-answer"></label>
                        </td>
                        <td class="tdTh-tfoot">
                            <button class="btn-primary bold_10 answer-add disabled-edit">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
            })
        }
    }

    answerTable = (id) => {
    // DISPLAY ARRAY SHORT ANSWERS
        if (id === "root") {
            this.app.innerHTML = ` <thead id="thead-root">
               <tr id="tr-thead-root">
                  <th scope="col" class="answer-thead bold_15">Choix</th>
                  <th scope="col" class="answer-thead bold_15">Options</th>
               </tr>
             </thead>
             <tbody id="tbody-root">
             </tbody>
                    <tfoot id="tfoot-root">
                    <tr id="tr-tfoot-root">
                        <td id="tdO-tfoot">
                            <label for="choice"></label>
                            <input type="text" id="choice" class="regular_10 text-center" name="answer">
                        </td>
                        <td id="tdT-tfoot">
                            <button class="btn-primary bold_10" id="answer-add">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
        }
// DISPLAY SHORT ANSWER ARRAY AFTER EDIT IN A QUESTION CREATED
        if (id === "tableShort") {
            document.querySelectorAll(".tableShort").forEach(table => {
                table.innerHTML = ` <thead class="thead-app">
               <tr class="tr-thead-app">
                  <th scope="col" class="answer-thead bold_15">Choix</th>
                  <th scope="col" class="answer-thead bold_15">Options</th>
               </tr>
             </thead>
             <tbody class="tbody-app">
             </tbody>
                    <tfoot class="tfoot-app">
                    <tr class="tr-tfoot-app">
                        <td class="tdO-tfoot">
                          
                            <input type="text" class="regular_10 text-center choices choices-edited" name="answer" disabled>
                        </td>
                        <td class="tdT-tfoot">
                            <button class="btn-primary bold_10 answer-add disabled-edit">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
            })
        }
    }


    // create un elem HTML
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    // get un element html
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    // get une reponse qcm entrée par l'utilisateur
    get _answerText() {
        return this.getElement('#choice').value;

    }

    // get la valeur du check entreée par l'utilisateur
    get _checkValue() {
        if (this.getElement("#good-answer").checked) {
            return this.getElement('#good-answer').value = "checked"
        } else {
            return this.getElement('#good-answer').checked = false;

        }
    }

    // reset les champs d'ajout
    _resetInput() {
        this.getElement('#choice').value = "";
        if (this.getElement("#good-answer")) {
            this.getElement('#good-answer').checked = false;
        }
    }

    // get le tableau de la question en cours d'édition


    // affiche le tableau qcm
    displayTableQcm(qcmAnswers) {

        // IF CHILD REMOVE ALL BEFORE DISPLAY AGAIN
        if (this.getElement('#tableEditing')) {

            while (this.getElement('#tableEditing').firstChild) {
                this.getElement('#tableEditing').removeChild(this.getElement('#tableEditing').firstChild)
            }
        }

        if (this.getElement('#tbody-root')) {

            while (this.getElement('#tbody-root').firstChild) {
                this.getElement('#tbody-root').removeChild(this.getElement('#tbody-root').firstChild)
            }
        }

        qcmAnswers.forEach(answer => {
            const tr = this.createElement('tr')
            tr.id = answer.id;

            const tdinput = this.createElement('td');
            const input = this.createElement('input', 'regular_10');
            input.type = "text";
            input.className = "choices text-center";
            input.value = answer.choix;
            input.disabled = true;

            const tdCheck = this.createElement('td');
            const labelToggle = this.createElement('label');
            labelToggle.className = "good-answer-choice toggle-checkbox-label";
            const check = this.createElement('input', 'toggle-checkbox')
            check.type = "checkbox";
            if (answer.goodAnswer === "checked") {
                check.checked = answer.goodAnswer
            }

            const tdOption = this.createElement("td");
            const editButton = this.createElement("button")
            editButton.className = "btn-secondary edit";
            editButton.innerHTML = "Modifier"

            const deleteButton = this.createElement("button")
            deleteButton.className = "btn-tertiary delete";
            deleteButton.innerHTML = "Supprimer";

            tdinput.appendChild(input);
            tdCheck.append(check, labelToggle);

            tr.append(tdinput, tdCheck, tdOption)

            if(this.getElement('#tbody-root')){
                this.getElement("#tbody-root").append(tr);
                tdOption.append(editButton, deleteButton);
            }

            if(this.getElement('#tableEditing')){

                this.getElement("#tableEditing").append(tr);
                const editButtonEdit = this.createElement("button")
                editButtonEdit.className = "btn-secondary edit-edited";
                editButtonEdit.innerHTML = "Modifier"

                const deleteButtonEdit = this.createElement("button")
                deleteButtonEdit.className = "btn-tertiary delete-edited ";
                deleteButtonEdit.innerHTML = "Supprimer";
                tdOption.append(editButtonEdit, deleteButtonEdit);
                while (tdOption.childElementCount > 2) {
                    tdOption.removeChild(tdOption.firstChild)
                }
            }
        })
    }

    // DISPLAY IN QUESTION CREATED
    displayTableQcmCreated(qcmTable) {


        const table = qcmTable.filter(table => table.table)

        for (let i = 0; i < table.length; i++) {
            if (table[i].type === "QCM") {

                for (let j = 0; j < table[i].table.length; j++) {
                    const tr = this.createElement('tr')
                    tr.id = ((i + 1).toString()) + (j)
                    document.getElementById(`${table[i].id}`).children[4].children[1].appendChild(tr)

                    const tdinput = this.createElement('td');
                    const input = this.createElement('input', 'regular_10');
                    input.type = "text";
                    input.className = "choices text-center";
                    input.value = table[i].table[j].choix;
                    input.disabled = true

                    const tdCheck = this.createElement('td');
                    const labelToggle = this.createElement('label');
                    labelToggle.className = "good-answer-choice toggle-checkbox-label";
                    const check = this.createElement('input', 'toggle-checkbox')
                    check.type = "checkbox";
                    if (table[i].table[j].goodAnswer === "checked") {
                        check.checked = table[i].table[j].goodAnswer
                    }

                    const tdOption = this.createElement("td");
                    const editButton = this.createElement("button")
                    editButton.className = "btn-secondary edit-edited disabled-edit";
                    editButton.innerHTML = "Modifier"
                    editButton.disabled;

                    const deleteButton = this.createElement("button")
                    deleteButton.className = "btn-tertiary delete-edited disabled-edit";
                    deleteButton.innerHTML = "Supprimer";

                    tr.append(tdinput, tdCheck, tdOption);
                    tdinput.appendChild(input)
                    tdCheck.append(check, labelToggle)
                    tdOption.append(editButton, deleteButton)

                }


            }
        }
    }

    // DISPLAY SHORT IN EDITOR
    displayTableShort(shortAnswer) {

        // IF CHILD REMOVE ALL BEFORE DISPLAY AGAIN

        if (this.getElement('#tableEditing')) {

            while (this.getElement('#tableEditing').firstChild) {
                this.getElement('#tableEditing').removeChild(this.getElement('#tableEditing').firstChild)
            }
        }

        if (this.getElement('#tbody-root')) {

            while (this.getElement('#tbody-root').firstChild) {
                this.getElement('#tbody-root').removeChild(this.getElement('#tbody-root').firstChild)
            }
        }
        shortAnswer.forEach(answer => {
            const tr = this.createElement('tr')
            tr.id = answer.id;

            const tdinput = this.createElement('td');
            const input = this.createElement('input', 'regular_10');
            input.type = "text";
            input.className = "choices text-center";
            input.value = answer.answer;
            input.disabled = true;

            const tdOption = this.createElement("td");
            const editButton = this.createElement("button")
            editButton.className = "btn-secondary edit";
            editButton.innerHTML = "Modifier"

            const deleteButton = this.createElement("button")
            deleteButton.className = "btn-tertiary delete";
            deleteButton.innerHTML = "Supprimer";

            tdinput.appendChild(input);


            tr.append(tdinput, tdOption)

            if(this.getElement('#tbody-root')){
                this.getElement("#tbody-root").append(tr);
                tdOption.append(editButton, deleteButton);
            }


            if(this.getElement('#tableEditing')){
                this.getElement("#tableEditing").append(tr);
                const editButtonEdit = this.createElement("button")
                editButtonEdit.className = "btn-secondary edit-edited";
                editButtonEdit.innerHTML = "Modifier"

                const deleteButtonEdit = this.createElement("button")
                deleteButtonEdit.className = "btn-tertiary delete-edited ";
                deleteButtonEdit.innerHTML = "Supprimer";
                tdOption.append(editButtonEdit, deleteButtonEdit);
                while (tdOption.childElementCount > 2) {
                    tdOption.removeChild(tdOption.firstChild)
                }
            }

        })
    }

    // DISPLAY SHORT IN A QUESTION CREATED
    displayTableShortCreated(shortAnswer) {


        const table = shortAnswer.filter(table => table.table)

        for (let i = 0; i < table.length; i++) {
            if (table[i].type === "Réponse courte") {
                for (let j = 0; j < table[i].table.length; j++) {
                    const tr = this.createElement('tr')
                    tr.id = ((i + 1).toString()) + (j)
                    document.getElementById(`${table[i].id}`).children[4].children[1].appendChild(tr)

                    const tdinput = this.createElement('td');
                    const input = this.createElement('input', 'regular_10');
                    input.type = "text";
                    input.className = "choices text-center";
                    input.value = table[i].table[j].answer;
                    input.disabled = true

                    const tdOption = this.createElement("td");
                    const editButton = this.createElement("button")
                    editButton.className = "btn-secondary edit-edited disabled-edit";
                    editButton.innerHTML = "Modifier"
                    editButton.disabled;

                    const deleteButton = this.createElement("button")
                    deleteButton.className = "btn-tertiary delete-edited disabled-edit";
                    deleteButton.innerHTML = "Supprimer";

                    tr.append(tdinput, tdOption);
                    tdinput.appendChild(input)
                    tdOption.append(editButton, deleteButton)
                }

            }
        }
    }

    // DISPLAY NEW QUESTION CREATED
    _displayQuestions(questions) {
        if (this.getElement('#questions')) {

            while (this.getElement('#questions').firstChild) {
                this.getElement('#questions').removeChild(this.getElement('#questions').firstChild)
            }
        }

        questions.forEach(question => {

            const div = this.createElement("div", "opacity");
            div.id = `${question.id}`;

            const btnEdit = this.createElement("button");
            btnEdit.className = "btn btn-secondary edit-question"


            const btnDel = this.createElement("button");
            btnDel.className = "btn btn-tertiary delete-question";


            const name = this.createElement("p")
            name.className = `bold_15 ${question.type}`
            name.innerHTML = `Question : ${question.type}`

            const questionName = this.createElement("input", "question-name");
            questionName.type = "text";
            questionName.value = question.enonce;
            questionName.disabled = true;

            const table = this.createElement("table");
            if (name.classList.contains("QCM")) {
                table.className = 'tableQCM app-question'
            } else if (name.classList.contains("courte")) {
                table.className = "tableShort app-question"
            } else {
                table.className = "app-question"
            }

            const explicationName = this.createElement("p")
            explicationName.className = "explication-name bold_15"
            explicationName.innerHTML = "Texte explicatif : "


            const explanationCheck = this.createElement("label")
            explanationCheck.className = "toggle-checkbox-label explication-edited-label bold_10"

            const check = this.createElement("input")
            check.className = "toggle-checkbox explication-edited-check"
            check.type = "checkbox";
            if (!(question.check === "checked")) {
            } else {
                check.checked = question.check
            }

            const explication = this.createElement("input")
            explication.type = "text";
            explication.className = "explication-edited"
            explication.value = question.explication
            explication.disabled = true

            const explicationdisplaynone = this.createElement("input")
            explicationdisplaynone.type = "text";
            explicationdisplaynone.className = "explication-edited display-none"
            explicationdisplaynone.placeholder = "Entrez votre expliation ici"

            const hr = this.createElement("hr")


            document.getElementById("questions").appendChild(div);
            div.append(btnEdit, btnDel, name, questionName, table, explicationName, check, explanationCheck)
            if (question.check === "checked") {
                div.appendChild(explication)
            }else{
                div.appendChild(explicationdisplaynone);
            }
            div.appendChild(hr)


        })
        document.querySelectorAll(".tableQCM").forEach(table => {
            table.classList.remove("app-question");
            this.qcmTable(table.className);
            table.classList.add("app-question");
        })

        document.querySelectorAll(".tableShort").forEach(table => {
            table.classList.remove("app-question");
            this.answerTable(table.className);
            table.classList.add("app-question");
        })

        document.getElementById("nbr-question").innerHTML = `Nombre de questions : ${document.getElementById("questions").childElementCount}`
    }

    // GET INFOS FROM USER
    bindAddQcm(handler) {
        this.getElement("#answer-add").addEventListener('click', event => {
            event.preventDefault()
            if (this._answerText) {
                handler(this._answerText, this._checkValue);
                this._resetInput()
            }
        })
    }

    bindAddShort(handler) {
        this.getElement("#answer-add").addEventListener('click', event => {
            event.preventDefault()

            if (this._answerText) {
                handler(this._answerText)
                this._resetInput()
            }
        })
    }


// GET EDITED INPUT FROM USER
    binEditQcm = (handler) => {
        let answer = ""
        let checked = ""
        this.getElement('#tbody-root').addEventListener('click', event => {
            if (event.target.classList.contains('edit')) {
                    event.target.parentElement.parentElement.classList.add('focus');
                    event.target.parentElement.parentElement.children[0].firstChild.id = "input-edit";
                    event.target.parentElement.parentElement.children[1].children[0].nextSibling.id = "check-edit";


                    document.querySelectorAll('.edit').forEach(edit => {
                        edit.classList.add("disabled");
                    })
                    document.querySelectorAll('.delete').forEach(del => {
                        del.classList.add("disabled");
                    })

                    if (event.target.parentElement.parentElement.classList.contains("focus")) {
                        event.target.classList.remove("disabled")
                        event.target.parentElement.children[1].classList.remove("delete")
                        event.target.parentElement.children[1].classList.remove("disabled")

                        event.target.parentElement.children[1].classList.add("cancel")
                        event.target.parentElement.children[1].innerHTML = "Annuler"
                        event.target.innerHTML = "Confirmer"
                        event.target.classList.remove("edit")
                        event.target.classList.add("confirm-edit")
                    }
                    document.getElementById("input-edit").disabled = false
                    document.getElementById("check-edit").disabled = false
                    document.getElementById("choice").disabled = true
                    document.getElementById("good-answer").disabled = true
                    document.getElementById("answer-add").classList.add("disabled");
                    document.getElementById("form-add").classList.add("disabled");
                document.querySelector(".init").classList.add("disabled");
                    document.querySelector("a button.generate").classList.add("disabled");
                    this._toggleSwitch(this._executed);
                    this._executed = true
                    answer =  event.target.parentElement.parentElement.children[0].firstChild.value
                    checked = event.target.parentElement.parentElement.children[1].firstChild.checked


            }

            if (event.target.classList.contains("cancel")){

                document.querySelectorAll('.edit').forEach(edit => {
                    edit.classList.remove("disabled");
                })
                document.querySelectorAll('.delete').forEach(del => {
                    del.classList.remove("disabled");
                })

                if (event.target.parentElement.parentElement.classList.contains("focus")) {
                    event.target.classList.add("disabled")
                    event.target.parentElement.children[1].classList.add("delete")
                    event.target.parentElement.children[1].classList.add("disabled")

                    event.target.parentElement.children[1].classList.remove("cancel")
                    event.target.parentElement.children[0].innerHTML = "Modifier"
                    event.target.parentElement.children[0].classList.remove("confirm-edit")
                    event.target.parentElement.children[0].classList.add("edit")
                    event.target.innerHTML = "Supprimer"
                    event.target.classList.remove("disabled")
                }
                event.target.parentElement.parentElement.classList.remove("focus")
                document.getElementById("input-edit").disabled = true
                document.getElementById("check-edit").disabled = true
                document.getElementById("choice").disabled = false
                document.getElementById("good-answer").disabled = false
                document.getElementById("answer-add").classList.remove("disabled");
                document.getElementById("form-add").classList.remove("disabled");
                document.querySelector("a button.generate").classList.remove("disabled");
                event.target.parentElement.parentElement.children[0].firstChild.value = answer
                event.target.parentElement.parentElement.children[1].firstChild.checked = checked ? "checked" : false
                event.target.parentElement.parentElement.children[0].firstChild.id = "";
                event.target.parentElement.parentElement.children[1].children[0].nextSibling.id = "";


            }


        })

        this.getElement('#tbody-root').addEventListener('mousedown', event => {
            if (event.target.classList.contains("confirm-edit")){
                let id = parseInt(event.target.parentElement.parentElement.id)
                let temporaryAnswerText = document.getElementById("input-edit").value
                if (document.getElementById("check-edit").parentElement.firstChild.checked)
                    var temporaryInputCheck = "checked"
                else {
                    var temporaryInputCheck = false
                }
                handler(id, temporaryAnswerText, temporaryInputCheck);
                document.querySelectorAll('.edit').forEach(edit => {
                    edit.classList.remove("disabled");
                })
                document.querySelectorAll('.delete').forEach(del => {
                    del.classList.remove("disabled");
                })

                if (event.target.parentElement.parentElement.classList.contains("focus")) {
                    event.target.classList.add("disabled")
                    event.target.parentElement.children[1].classList.add("delete")
                    event.target.parentElement.children[1].classList.add("disabled")

                    event.target.parentElement.children[1].classList.remove("cancel")
                    event.target.parentElement.children[0].innerHTML = "Supprimer"
                    event.target.parentElement.children[0].classList.remove("confirm-edit")
                    event.target.parentElement.children[0].classList.add("edit")
                    event.target.innerHTML = "Modifier"
                    event.target.classList.remove("disabled")
                }
                event.target.parentElement.parentElement.classList.remove("focus")
                document.getElementById("choice").disabled = false
                document.getElementById("good-answer").disabled = false
                document.getElementById("answer-add").classList.remove("disabled");
                document.getElementById("form-add").classList.remove("disabled");
                document.querySelector(".init").classList.remove("disabled");
                document.querySelector("a button.generate").classList.remove("disabled");
                event.target.parentElement.parentElement.children[0].firstChild.id = "";
                event.target.parentElement.parentElement.children[1].children[0].nextSibling.id = "";
            }
        })



    }

    binEditShort = handler => {
        let answer = ""
        this.getElement('#tbody-root').addEventListener('click', event => {
            if (event.target.classList.contains('edit')) {
                        event.target.parentElement.parentElement.classList.add('focus');
                        event.target.parentElement.parentElement.children[0].firstChild.id = "input-edit";

                        document.querySelectorAll('.edit').forEach(edit => {
                            edit.classList.add("disabled");
                        })
                        document.querySelectorAll('.delete').forEach(del => {
                            del.classList.add("disabled");
                        })

                        if (event.target.parentElement.parentElement.classList.contains("focus")) {
                            event.target.classList.remove("disabled")
                            event.target.parentElement.children[1].classList.remove("delete")
                            event.target.parentElement.children[1].classList.remove("disabled")

                            event.target.parentElement.children[1].classList.add("cancel")
                            event.target.parentElement.children[1].innerHTML = "Annuler"
                            event.target.innerHTML = "Confirmer"
                            event.target.classList.remove("edit")
                            event.target.classList.add("confirm-edit")
                        }
                        document.getElementById("input-edit").disabled = false
                        document.getElementById("choice").disabled = true
                        document.getElementById("answer-add").classList.add("disabled");
                        document.getElementById("form-add").classList.add("disabled");
                document.querySelector(".init").classList.add("disabled");
                        document.querySelector("a button.generate").classList.add("disabled");
                        answer = event.target.parentElement.parentElement.firstChild.firstChild.value


                    }

                    if (event.target.classList.contains("cancel")) {

                        document.querySelectorAll('.edit').forEach(edit => {
                            edit.classList.remove("disabled");
                        })
                        document.querySelectorAll('.delete').forEach(del => {
                            del.classList.remove("disabled");
                        })

                        if (event.target.parentElement.parentElement.classList.contains("focus")) {
                            event.target.classList.add("disabled")
                            event.target.parentElement.children[1].classList.add("delete")
                            event.target.parentElement.children[1].classList.add("disabled")

                            event.target.parentElement.children[1].classList.remove("cancel")
                            event.target.parentElement.children[0].innerHTML = "Modifier"
                            event.target.parentElement.children[0].classList.remove("confirm-edit")
                            event.target.parentElement.children[0].classList.add("edit")
                            event.target.innerHTML = "Supprimer"
                            event.target.classList.remove("disabled")
                        }
                        event.target.parentElement.parentElement.classList.remove("focus")
                        document.getElementById("input-edit").disabled = true
                        document.getElementById("choice").disabled = false
                        document.getElementById("answer-add").classList.remove("disabled");
                        document.getElementById("form-add").classList.remove("disabled");
                        document.querySelector(".init").classList.remove("disabled");
                        document.querySelector("a button.generate").classList.remove("disabled");
                        event.target.parentElement.parentElement.children[0].firstChild.value = answer
                        event.target.parentElement.parentElement.children[0].firstChild.id = "";


                    }


                })

                this.getElement('#tbody-root').addEventListener('mousedown', event => {
                    if (event.target.classList.contains("confirm-edit")) {
                        let id = parseInt(event.target.parentElement.parentElement.id)
                        let temporaryAnswerText = document.getElementById("input-edit").value
                        handler(id, temporaryAnswerText);
                        document.querySelectorAll('.edit').forEach(edit => {
                            edit.classList.remove("disabled");
                        })
                        document.querySelectorAll('.delete').forEach(del => {
                            del.classList.remove("disabled");
                        })

                        if (event.target.parentElement.parentElement.classList.contains("focus")) {
                            event.target.classList.add("disabled")
                            event.target.parentElement.children[1].classList.add("delete")
                            event.target.parentElement.children[1].classList.add("disabled")

                            event.target.parentElement.children[1].classList.remove("cancel")
                            event.target.parentElement.children[0].innerHTML = "Supprimer"
                            event.target.parentElement.children[0].classList.remove("confirm-edit")
                            event.target.parentElement.children[0].classList.add("edit")
                            event.target.innerHTML = "Modifier"
                            event.target.classList.remove("disabled")
                        }
                        event.target.parentElement.parentElement.classList.remove("focus")
                        document.getElementById("choice").disabled = false
                        document.getElementById("answer-add").classList.remove("disabled");
                        document.getElementById("form-add").classList.remove("disabled");
                        document.querySelector("a button.generate").classList.remove("disabled");
                        event.target.parentElement.parentElement.children[0].firstChild.id = "";
                        event.target.parentElement.parentElement.children[1].children[0].nextSibling.id = "";
                    }
                })



            }


    binEditQuestion = (handler, event, getArray) => {
        let that = this
        let edit = {}
            if (event.target.classList.contains("edit-question")){
                if (that._countClick === 0) {
                    that._guizmoSpeak("Voulez-vous modifier cette question?");
                    document.getElementById("message").addEventListener("click", function confirmEditQuestion(el) {

                        if (el.target.classList.contains("btn-confirm")){
                            that._removeguizmoSpeech()
                            that._countClick++;


                            if (that._countClick === 1){
                                that._lockEditor();
                                that._lockButton("button.edit-question");
                                that._lockButton("button.delete-question");
                                event.target.parentElement.classList.add("focus-question")
                                event.target.parentElement.children[1].classList.remove("delete-question")
                                event.target.parentElement.children[1].classList.add("cancel-edit-question")
                                event.target.parentElement.children[1].classList.remove("disabled")
                                event.target.id = "edit-question-confirmed"
                                event.target.parentElement.classList.remove("opacity");
                                if (event.target.parentElement.classList.contains("focus-question")){
                                    event.target.classList.remove("disabled")
                                }


                                that._unlockQuestionEditing(event);
                                that._toggleSwitch(that._executed);
                                getArray.forEach(question => {
                                    if (question.id === event.target.parentElement.id) {
                                        edit.array = question.table.slice()
                                    }
                                })
                                that._getArray(getArray, event, that._executed)
                                that._countClick++;
                                that._executed = true
                                edit.id = event.target.parentElement.id
                                edit.name = that.getElement("#question-name-edit").value
                                edit.check = that.getElement("#question-check-explanation").checked ? "checked" : false
                                edit.explanation = that.getElement("#question-explanation-text-edit").value


                                that.getElement(".cancel-edit-question").addEventListener("click", function cancelEdit(e){
                                    e.target.parentElement.id = edit.id
                                    that.getElement("#question-name-edit").value = edit.name
                                    that.getElement("#question-check-explanation").checked = edit.check
                                    that.getElement("#question-explanation-text-edit").value = edit.explanation

                                    if (e.target.parentElement.children[2].classList.contains("QCM")){
                                        that.displayTableQcm(edit.array)
                                    }

                                    else if (e.target.parentElement.children[2].classList.contains("courte")){
                                        that.displayTableShort(edit.array)
                                    }



                                    that._countClick = 0
                                    that._history = []
                                    that._redo = []
                                    that._unlockEditor();
                                    that._lockQuestionEditing(e)
                                    that._unlockButton("button.edit-question");
                                    that._unlockButton("button.delete-question");
                                    that.getElement(".cancel-edit-question").removeEventListener("click", cancelEdit)
                                    e.target.parentElement.classList.remove("focus-question")
                                    e.target.classList.remove("cancel-edit-question")
                                    e.target.classList.add("delete-question")
                                    e.target.parentElement.classList.add("opacity");
                                    e.target.parentElement.children[0].id = ""




                                })

                            }


                            this.removeEventListener("click", confirmEditQuestion)

                        }

                        if (el.target.classList.contains("btn-cancel")) {
                            that._removeguizmoSpeech()
                            that._countClick = 0;
                            this.removeEventListener("click", confirmEditQuestion)
                        }

                    })
                }

                if (that._countClick > 1) {
                    let id = event.target.parentElement.id;
                    let questionName = document.getElementById("question-name-edit").value
                    let array = that._edited

                    if (document.getElementById("question-check-explanation").checked){
                        var explanationCheck = "checked"
                    }
                    else{
                        var explanationCheck = false
                    }
                    let explanation = document.getElementById("question-explanation-text-edit").value

                    handler(id, questionName, array, explanationCheck, explanation)

                    this._countClick++
                    that._history = []
                    that._redo = []
                    that._unlockEditor();
                    that._lockQuestionEditing(event)
                    that._unlockButton("button.edit-question");
                    that._unlockButton("button.delete-question");
                    event.target.parentElement.classList.remove("focus-question")
                    event.target.id = ""
                    event.target.parentElement.classList.add("opacity");


                }
            }



    }

// GET INFOS TO DEL FROM USER
    binDelete = handler => {
        this.getElement('#tbody-root').addEventListener('click', event => {
            if (event.target.classList.contains("delete")) {
                this._guizmoSpeak("Voulez-vous supprimer la ligne?")
                let that = this
                document.getElementById("message").addEventListener("click", function confirmDel(el) {
                    if (el.target.classList.contains("btn-confirm")) {
                        var id = parseInt(event.target.parentElement.parentElement.id)

                        handler(id);

                        that._removeguizmoSpeech()
                        this.removeEventListener("click", confirmDel)
                    }
                    if (el.target.classList.contains("btn-cancel")) {
                        that._removeguizmoSpeech()
                        this.removeEventListener("click", confirmDel)
                    }
                })
            }
        })
    }

    binDeleteQuestion = (handler, event) => {
        if (event.target.classList.contains("delete-question")) {
            this._guizmoSpeak("Voulez-vous supprimer cette question?")
            let that = this
            document.getElementById("message").addEventListener("click", function confirmDel(el) {
                if (el.target.classList.contains("btn-confirm")) {
                    var id = (event.target.parentElement.id)

                    handler(id)

                    that._removeguizmoSpeech()
                    this.removeEventListener("click", confirmDel)
                }

                if (el.target.classList.contains("btn-cancel")) {
                    that._removeguizmoSpeech()
                    this.removeEventListener("click", confirmDel)
                }
            })
        }
    }

    // FUNCTION TO SWITCH THE TOGGLE
    _toggleSwitch = (executed) => {
        let that = this
        this.getElement('form').addEventListener("click", (event) => {
            if (event.target.id === "check-edit") {
                if (executed === false) {

                    if (event.target.parentElement.firstChild.checked) {
                        event.target.parentElement.firstChild.checked = false
                    } else {
                        event.target.parentElement.firstChild.checked = "checked";
                    }
                }
            }

            if (event.target.id === "question-explanation-edit"){
                if (executed === false){
                    if (event.target.parentElement.children[6].checked) {
                        event.target.parentElement.children[6].checked = false
                        that._hideDisplay(document.getElementById("question-explanation-text-edit"))
                    } else {
                        event.target.parentElement.children[6].checked = "checked";
                        that._showDisplay(document.getElementById("question-explanation-text-edit"))
                    }

                }
            }

            if (event.target.id === "checkAnswer-edited-question"){
                if (executed === false){
                    if (event.target.parentElement.firstElementChild.checked) {

                        event.target.parentElement.firstElementChild.checked = false
                    } else {
                        event.target.parentElement.firstElementChild.checked = "checked";

                    }

                }
            }

        })
    }

    // FUNCTION TO CONFIRM A DELETE, A EDIT OR A CHANGEMENT OF EXERCISE
    _guizmoSpeak = (message) => {

        document.body.style.overflow = "hidden";
        this.getElement("form").style.opacity = "50%";
        document.getElementById("message").classList.remove("display-none")
        document.getElementById("caution").innerHTML = message
        document.querySelectorAll("input").forEach(input => {
            input.classList.add("disabled")
        })
        document.querySelectorAll("button").forEach(btn => {
            btn.classList.add("disabled")
        })
        document.querySelector("#save-info").disabled = true;
        document.querySelector("#counter").disabled = true;
        document.querySelector("#explication").disabled = true;

        document.getElementsByClassName("btn-confirm")[0].classList.remove("disabled")
        document.getElementsByClassName("btn-cancel")[0].classList.remove("disabled")
        document.getElementsByClassName("btn-confirm")[0].classList.remove("display-none")
        document.getElementsByClassName("btn-cancel")[0].classList.remove("display-none")

    }

    guizmoAlert = message => {
        document.getElementById("message").classList.remove("display-none")
        document.getElementById("caution").innerHTML = message
        document.getElementsByClassName("btn-confirm")[0].classList.add("display-none")
        document.getElementsByClassName("btn-cancel")[0].classList.add("display-none")

        setTimeout(this.removeGuizmoAlert , 5000)
    }

    removeGuizmoAlert = () =>{
        document.getElementById("message").classList.add("display-none")
        document.getElementById("caution").innerHTML = ""
        document.getElementsByClassName("btn-confirm")[0].classList.remove("display-none")
        document.getElementsByClassName("btn-cancel")[0].classList.remove("display-none")
    }

// REMOVE THE DIALOG TO CONFRIM AND UNLOCK
    _removeguizmoSpeech = () => {
        document.getElementById("caution").innerHTML = "";
        document.getElementById("message").classList.add("display-none");
        document.body.style.overflow = "initial"
        document.querySelector("form").style.opacity = "initial"
        document.querySelectorAll("input").forEach(input => {
            input.classList.remove("disabled")
        })
        document.querySelectorAll("button").forEach(btn => {
            btn.classList.remove("disabled")
        })

        document.querySelector("#save-info").disabled = false;
        document.querySelector("#counter").disabled = false;
        document.querySelector("#explication").disabled = false;
    }

    // LOCK THE EXERCISE

    _lockExercice = () => {
        document.querySelectorAll("input[type=radio]").forEach(radio => {
            radio.disabled = true;
        })
        document.getElementById("change").classList.remove("display-none");
        let that = this;

        this.getElement("body").addEventListener("mousedown", function confirm(event) {
            if (event.target.id === "change") {
                that._guizmoSpeak("Voulez-vous changer d'exercice?")
                let these = that;
                document.getElementById("message").addEventListener("click", function confirmChange(el) {

                    if (el.target.classList.contains("btn-confirm")) {
                        these._unlockExercice();
                        these._removeguizmoSpeech();
                        this.removeEventListener("click", confirmChange)
                    }

                    if (el.target.classList.contains("btn-cancel")) {
                        that._removeguizmoSpeech()
                        this.removeEventListener("click", confirmChange)
                    }

                })
            }

        })

    }

    // UNLOCK TH EXERCISE
    _unlockExercice = () => {

        document.querySelectorAll("input[type=radio]").forEach(radio => {
            radio.disabled = false;
            radio.checked = false;
        });
        document.querySelector("#change").classList.add("display-none");

        while (document.querySelector("#root").firstChild) {
            document.querySelector("#root").removeChild(document.querySelector("#root").firstChild)
        }
    this.getElement("#tool-nothing").classList.remove("disabled")
        document.getElementById("question-name").value = "";
        document.getElementById("explication").checked = false;
        document.getElementById("explication-text").value = "";
        this._hideDisplay(document.getElementById("explication-text"))
    }

    // HIDE IS UNCHECKED
    _hideDisplay(el) {
        el.classList.add("display-none");
        el.value = "";
        el.placeholder = "Entrez votre explication ici"
    }

    // SHOW IF CHECKED
    _showDisplay(el) {
        el.classList.remove("display-none");
    }

    // LOCK EDITOR WHEN EDIT QUESTION
    _lockEditor(){
        document.querySelectorAll("input[type=radio]").forEach(radio => {
            radio.classList.add("disabled");
        })
        this.getElement("#question-name").disabled = true;
        this.getElement("#explication-text").disabled = true;
        this.getElement("#explication").disabled = true;
        this.getElement("#form-add").classList.add("disabled");
        this.getElement("#name-exercise").classList.add("disabled")
        this.getElement(".saveInfo").classList.add("disabled")
        this.getElement("#counter-auto").classList.add("disabled")
        this.getElement("button.generate").classList.add("disabled")
        this.getElement("#generate").style.pointerEvents="none"


    }
    // UNLOCK WHEN IS FINISH
    _unlockEditor(){
        document.querySelectorAll("input[type=radio]").forEach(radio => {
            radio.classList.remove("disabled");
        })
        this.getElement("#question-name").disabled = false;
        this.getElement("#explication-text").disabled = false;
        this.getElement("#explication").disabled = false;
        this.getElement("#form-add").classList.remove("disabled");
        this.getElement("#name-exercise").classList.remove("disabled")
        this.getElement(".saveInfo").classList.remove("disabled")
        this.getElement("#counter-auto").classList.remove("disabled")
        this.getElement("button.generate").classList.remove("disabled")
        this.getElement("#generate").style.pointerEvents="auto"


    }

    // LOCK ALL BUTTONS
    _lockButton(el){
        document.querySelectorAll(el).forEach( button =>{
            button.classList.add("disabled")
        })
    }

    //UNLOCK ALL BUTTONS
    _unlockButton(el){
        document.querySelectorAll(el).forEach( button =>{
            button.classList.remove("disabled")
        })
    }

// UNLOCK THE QUESTION IN EDTITION
    _unlockQuestionEditing(event){

        event.target.parentElement.children[3].id = "question-name-edit"
        event.target.parentElement.children[3].disabled = false;
        event.target.parentElement.children[6].id= "question-check-explanation"
        event.target.parentElement.children[7].id = "question-explanation-edit";
        event.target.parentElement.children[8].id = "question-explanation-text-edit";
        event.target.parentElement.children[8].disabled = false;
        if (event.target.parentElement.children[4].childElementCount > 0){
            if (event.target.parentElement.classList.contains("focus-question")){
                document.querySelectorAll(".focus-question button.disabled-edit").forEach(btn =>{
                    btn.classList.remove("disabled-edit")
                })
                event.target.parentElement.children[4].children[1].id = "tableEditing"
            }
            if ( event.target.parentElement.children[4].children[2].children[0].childElementCount === 3) {
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.disabled = false;
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.id = "choice-edited-question";
                event.target.parentElement.children[4].children[2].children[0].children[1].children[1].id = "checkAnswer-edited-question";
                event.target.parentElement.children[4].children[2].children[0].children[2].firstElementChild.classList.id = "add-edited-answer-question"
            }
        else{
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.disabled = false;
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.id = "choice-edited-question";
                event.target.parentElement.children[4].children[2].children[0].children[1].firstElementChild.classList.id = "add-edited-answer-question"

            }

        }


    }
// LOCK THE QUESTION IN EDITION
    _lockQuestionEditing(event){
        event.target.parentElement.children[3].id = ""
        event.target.parentElement.children[3].disabled = true;
        event.target.parentElement.children[6].id= ""
        event.target.parentElement.children[7].id = "";
        event.target.parentElement.children[8].id = "";
        event.target.parentElement.children[8].disabled = true;
        if (event.target.parentElement.children[4].childElementCount > 0) {
            if (event.target.parentElement.classList.contains("focus-question")) {
                document.querySelectorAll(".focus-question button.disabled-edit").forEach(btn => {
                    btn.classList.add("disabled-edit")
                })
            }
            if (event.target.parentElement.children[4].children[2].children[0].childElementCount === 3) {
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.disabled = true;
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.id = "";
                event.target.parentElement.children[4].children[2].children[0].children[1].children[1].id = "";
                event.target.parentElement.children[4].children[2].children[0].children[2].firstElementChild.classList.id = ""
            } else {
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.disabled = true;
                event.target.parentElement.children[4].children[2].children[0].firstElementChild.firstElementChild.id = "";
                event.target.parentElement.children[4].children[2].children[0].children[1].firstElementChild.classList.id = ""

            }
        }

    }

    // GET ARRAY TO ADD - DEL - EDIT IN A QUESTION CREATED
    _getArray (getArray, event, executed){
        let that = this
        getArray.forEach(question => {
            if (question.id === event.target.parentElement.id){
                that._edited = question.table
                document.querySelector("#questions").addEventListener("click",  function editQuestion (el){
                    if (executed === false) {
                        // ADD IN A ARRAY FROM A QUESTION CREATED
                        if (el.target.classList.contains("answer-add")) {
                            if (that.getElement("#choice-edited-question").value !== "") {
                                that.addInCreated(that._edited, el)
                            }
                        }
//DEL IN A ARRAY FROM A QUESTION CREATED
                        if (el.target.classList.contains("delete-edited")) {
                            that._guizmoSpeak("Voulez-vous supprimer la ligne?")
                            document.getElementById("message").addEventListener("click", function confirmDel(ele) {
                                if (ele.target.classList.contains("btn-confirm")) {
                                    that._removeguizmoSpeech()

                                    document.querySelectorAll("button.edit-question").forEach(btn => {
                                        btn.classList.add("disabled")
                                    })
                                    document.querySelectorAll("button.delete-question").forEach(btn => {
                                        btn.classList.add("disabled")
                                    })
                                    document.querySelector("#edit-question-confirmed").classList.remove("disabled")
                                    that.delInCreated(that._edited, el)
                                    this.removeEventListener("click", confirmDel)
                                }

                                if (ele.target.classList.contains("btn-cancel")) {
                                    that._removeguizmoSpeech()
                                    this.removeEventListener("click", confirmDel)

                                    document.querySelectorAll("button.edit-question").forEach(btn => {
                                        btn.classList.add("disabled")
                                    })
                                    document.querySelectorAll("button.delete-question").forEach(btn => {
                                        btn.classList.add("disabled")
                                    })
                                    document.querySelector("#edit-question-confirmed").classList.remove("disabled")

                                }
                            })


                        }
// EDIT IN A ARRAY FROM A QUESTION CREATED
                        if (el.target.classList.contains("edit-edited")) {
                            if (that._countClickEdit === 0) {

                                that.editInCreated(that._edited, el)
                            }

                        } else if (el.target.classList.contains("confirmed")) {
                            if (that._countClickEdit === 1) {
                                that.confirmEditArrayCreated(el)
                                el.stopPropagation()
                                that._countClickEdit = 0
                            }


                        }

                        if (el.target.classList.contains("cancel")) {
                            that.cancelEditArrayCreated(el)
                            el.stopPropagation()
                        }


// CONFIRM ALL MODIFICATION WHEN WE EDIT A QUESTION
                        if (el.target.id === "edit-question-confirmed") {
                            that._countClickEdit = 0
                            document.querySelector("#questions").removeEventListener("click", editQuestion)

                        }
                    }

                })


            }
        })


    }

    // FUNCTION TO ADD IN CREATED
    addInCreated = (edited, event) => {
        let that = this
        if(event.target.parentElement.parentElement.parentElement.parentElement.classList.contains("tableQCM"))
        {
            const answerEdit = {
                "id": edited.length > 0 ? edited[edited.length - 1].id + 1 : 1,
                "choix": document.querySelector("#choice-edited-question").value,
                "goodAnswer": document.querySelector("#checkAnswer-edited-question").parentElement.firstElementChild.checked ? "checked" : false
            }



            edited.push(answerEdit)
            that.displayTableQcm(edited)
        }
        if(event.target.parentElement.parentElement.parentElement.parentElement.classList.contains("tableShort"))
        {
            const answerEdit = {
                "id": edited.length > 0 ? edited[edited.length - 1].id + 1 : 1,
                "answer": document.querySelector("#choice-edited-question").value,
            }




            edited.push(answerEdit)
            that.displayTableShort(edited)

        }


        document.querySelector("#choice-edited-question").value = "";
        if (document.querySelector("#checkAnswer-edited-question")){
            document.querySelector("#checkAnswer-edited-question").parentElement.firstElementChild.checked = false}

    }
// FUNCTION TO EDIT IN CREATED
    editInCreated = (edited, event) => {
        let that = this;

            event.target.parentElement.parentElement.classList.add("focus");
        event.target.classList.add("confirmed");
        event.target.innerHTML = "Confirmer";
        event.target.classList.remove("edit-edited")
       event.target.classList.remove("disabled")
            event.target.parentElement.children[1].classList.remove("delete-edited")
            event.target.parentElement.children[1].classList.remove("disabled")
            event.target.parentElement.children[1].classList.add("cancel")
            event.target.parentElement.children[1].innerHTML = "Annuler"
            document.querySelectorAll("button.edit-edited").forEach(btn => btn.classList.add("disabled"));
            document.querySelectorAll("button.delete-edited").forEach(btn => btn.classList.add("disabled"));
            document.querySelectorAll("button.answer-add").forEach(btn => btn.classList.add("disabled"));
            document.querySelector("button.generate").classList.add("disabled");
            document.querySelector("button#form-add").classList.add("disabled");
            that.getElement("#choice-edited-question").classList.add("disabled");
            event.target.parentElement.parentElement.firstElementChild.firstElementChild.disabled = false
            that.editing = event.target.parentElement.parentElement.firstElementChild.firstElementChild.value
            if (event.target.parentElement.parentElement.childElementCount > 2) {
                that.getElement("#checkAnswer-edited-question").classList.add("disabled");
                event.target.parentElement.parentElement.children[1].children[1].id = "check-edit"
                that.check = event.target.parentElement.parentElement.children[1].children[0].checked
                that._toggleSwitch(that._executed)
                that._executed = true;

            }
        that._countClickEdit++


    }

    cancelEditArrayCreated = (el) => {
        let that = this

            el.target.parentElement.parentElement.classList.remove("focus");
            el.target.classList.remove("cancel")
            el.target.classList.add("delete-edit")
            el.target.innerHTML = "Supprimer";
            el.target.parentElement.children[0].classList.remove("confirmed")
            el.target.parentElement.children[0].classList.add("edit-edited")
            el.target.parentElement.children[0].classList.remove("disabled")
            el.target.parentElement.children[0].innerHTML = "Modifier"

            document.querySelectorAll("button.edit-edited").forEach(btn => btn.classList.remove("disabled"));
            document.querySelectorAll("button.delete-edited").forEach(btn => btn.classList.remove("disabled"));
            document.querySelectorAll("button.answer-add").forEach(btn => btn.classList.remove("disabled"));
            document.querySelector("button.generate").classList.remove("disabled");
            document.querySelector("button#form-add").classList.remove("disabled");
            that.getElement("#choice-edited-question").classList.remove("disabled");
            el.target.parentElement.parentElement.firstElementChild.firstElementChild.disabled = true
            el.target.parentElement.parentElement.firstElementChild.firstElementChild.value = that.editing
            if (el.target.parentElement.parentElement.childElementCount > 2) {
                that.getElement("#checkAnswer-edited-question").classList.remove("disabled");
                el.target.parentElement.parentElement.children[1].children[1].classList.remove("confirmed")
                el.target.parentElement.parentElement.children[1].children[0].checked = that.check ? "checked" : false
            }

    }

    confirmEditArrayCreated = (e) => {
let that = this


            if (e.target.classList.contains("confirmed")) {
                if (e.target.parentElement.parentElement.parentElement.parentElement.classList.contains("tableQCM")) {
                    that._edited[e.target.parentElement.parentElement.rowIndex - 1].choix = e.target.parentElement.parentElement.firstElementChild.firstElementChild.value
                    that._edited[e.target.parentElement.parentElement.rowIndex - 1].goodAnswer = e.target.parentElement.parentElement.children[1].firstElementChild.checked ? "checked" : false;


                } else if (e.target.parentElement.parentElement.parentElement.parentElement.classList.contains("tableShort")) {
                    that._edited[e.target.parentElement.parentElement.rowIndex - 1].answer = e.target.parentElement.parentElement.firstElementChild.firstElementChild.value

                }

                e.target.parentElement.parentElement.classList.remove("focus");
                e.target.parentElement.children[1].classList.add("delete-edited")
                e.target.parentElement.children[1].classList.remove("cancel")
                e.target.parentElement.children[1].innerHTML = "Supprimer"
                e.target.innerHTML = "Modifier";
                e.target.classList.add("edit-edited")
                e.target.classList.remove("confirmed")
                document.querySelectorAll("button.edit-edited").forEach(btn => btn.classList.remove("disabled"));
                document.querySelectorAll("button.delete-edited").forEach(btn => btn.classList.remove("disabled"));
                document.querySelectorAll("button.answer-add").forEach(btn => btn.classList.remove("disabled"));
                document.querySelector("button.generate").classList.remove("disabled");
                document.querySelector("button#form-add").classList.remove("disabled");
                that.getElement("#choice-edited-question").classList.remove("disabled");
                e.target.parentElement.parentElement.firstElementChild.firstElementChild.disabled = true
                if (e.target.parentElement.parentElement.childElementCount > 2) {
                    that.getElement("#checkAnswer-edited-question").classList.remove("disabled");
                    e.target.parentElement.parentElement.children[1].children[1].id = ""
                }

            }
    }


// FUNCTION TO DEL IN CREATED
    delInCreated = (edited, event) => {
        let that = this

        edited.splice(event.target.parentElement.parentElement.rowIndex - 1, 1)

        if (event.target.parentElement.parentElement.parentElement.parentElement.classList.contains("tableQCM")) {
            that.displayTableQcm(edited)
        }
        else if (event.target.parentElement.parentElement.parentElement.parentElement.classList.contains("tableShort")) {
            that.displayTableShort(edited)

        }

    }

    /*********************/
    /* TOOLSBAR AND TAG */
    /*********************/

    // CHECK WHERE A WORD START AND STOP
     _checkCharacterIsBoundary = (position, text, previous) => {
         let testedCharacterPosition = previous ? position - 1 : position

         if ( -1 === testedCharacterPosition){
             return true;
         }

         if (text.length === testedCharacterPosition){
             return true
         }

         let delimiter = /[â€“â€”â€²â€™â€œâ€â€³â€ž\"()Â«Â»,;:.â€¦Â¡Â¿!?\s]/;
         if (delimiter.test(text[testedCharacterPosition])){
             return true;
         }

         return false;
    }

    // GET THE SELECTION FRO A INPUT
    _getTextAeraSelection = (text) => {
         let textContainer = document.querySelector("#" + text)
        let selectStart = textContainer.selectionStart
        let selectEnd = textContainer.selectionEnd
        let length = textContainer.value.length
        return {
             "selectStart" : selectStart,
             "selectEnd" : selectEnd,
            "lenght" : length
         }
    }

    // ADD TAG ARROUND THE SELECTION
    addTagsToText (text, openingTag, closingTag){
        let textContainer = document .querySelector("#"+text)
        let string = textContainer.value.trim()
        let boundaries = this._getTextAeraSelection (text)

        if (boundaries.selectEnd === 0 || boundaries.selectStart === boundaries.lenght){
            let text = textContainer.value
              textContainer.value  = text + openingTag + closingTag
            return ;
        }

        if (boundaries.selectEnd < boundaries.lenght){
            while (!this._checkCharacterIsBoundary(boundaries.selectStart, string, true)){
                boundaries.selectStart--
            }
        }

        let selection = string.slice(boundaries.selectStart, boundaries.selectEnd)

        let pieces = selection.split(/\s+/);


        let output = pieces.map(function (piece){
            let punctuation = /[;:!?]/
            if (punctuation.test(piece)){
                return piece
            }


            if (piece.length >0){
                let delimiter = /[â€“â€”â€²â€™â€œâ€â€³â€ž\"()Â«Â»,;:.â€¦Â¡Â¿!?\s]/;
                if (delimiter.test(piece[piece.length -1 ])){
                    return openingTag + piece.slice(0, piece.length-1) + closingTag + piece[piece.length - 1]
                }

                piece = piece.replace( 'â€™', closingTag +  'â€™' + openingTag);
                return openingTag + piece + closingTag;
            }


        })




        textContainer.value = string.slice(0, boundaries.selectStart) + output.join(" ") + string.slice(boundaries.selectEnd)

        textContainer.selectionStart = boundaries.selectStart
        textContainer.selectionEnd = boundaries.selectStart + output.join(" ").length
    }
// UNDO FUNCTION MAX 10 ELEMENTS
    undoAddTags (text) {

             let textContainer = document.querySelector("#" + text)

        if (this._history.length !== 0 ) {
            this._redo.push(textContainer.value)

            if (this._redo.lenght > 10){
                this._redo.shift()
            }

            textContainer.value = this._history.pop()
        }




    }
// REDO FUNCTION MAX 10 ELEMENTS
    redoAddTags (text){
        let textContainer = document.querySelector("#" + text)
        if (this._redo.length !== 0 ) {
            this._history.push(textContainer.value)
            if (this._history.length > 10){
                this._history.shift()
            }
            textContainer.value = this._redo.pop()
        }
      
    }
// ADD TAG SPAN IN IDENTIFICATION IF THERE AREN'T A GOOD CHOICE
    nothing (text){
         let textContainer = document.querySelector("#" + text)
        let nothing = "<span class=\"button-choice-1\">Aucun</span>"
        this._history.push(textContainer.value)

        textContainer.value =  textContainer.value + nothing;

    }


}
