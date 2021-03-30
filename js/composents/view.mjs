// MVC - view

export class View {
    constructor() {

        // check exercice
        document.querySelector("body").addEventListener("click", event =>{
           if (event.target.id === this.exercice[0]){
               this.qcmTable(document.getElementById("root").id);
               this._lockExercice();
           }
            if (event.target.id === this.exercice[1]){
                this._lockExercice();
            }
            if (event.target.id === this.exercice[2]){
                this.answerTable(document.getElementById("root").id);
                this._lockExercice();
            }
            if (event.target.id === "explication"){
                if (!event.target.checked) {
                    this._hideDisplay(document.getElementById("explication-text"));
                }
                else{
                    this._showDisplay(document.getElementById("explication-text"));
                }
            }

        })






        // counter de click
        this._countClick = 0
        // si executed
        this._executed = false
        this.app = document.getElementById('root');
        this.appQuestion = document.querySelectorAll(".app-question")
        this.exercice = ["qcm", "identification", "short-answer"];

    }

    // display table when qcm is check

    qcmTable=(id) => {
        // affiche le tableau Qcm
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
        if (id === "tableQCM"){
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
                            <label for="choice"></label>
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

    // affiche le tableau qcm
    displayTableQcm(qcmAnswers) {

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
            tdOption.append(editButton, deleteButton);

            tr.append(tdinput, tdCheck, tdOption)

            this.getElement('#tbody-root').append(tr);
        })
    }

    displayTableQcmCreated (qcmTable){

    const table = qcmTable.filter(table => table.table)

        for (let i = 0; i<table.length; i++){
            if (table[i].type === "QCM"){

                    for (let j = 0; j<table[i].table.length; j++) {
                        const tr = this.createElement('tr')
                        tr.id = ((i+1).toString()) + (j)
                        document.getElementById(`question-${table[i].id}`).children[4].children[1].appendChild(tr)

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


    displayTableShort (shortAnswer){

        while (this.getElement('#tbody-root').firstChild) {
            this.getElement('#tbody-root').removeChild(this.getElement('#tbody-root').firstChild)
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
            tdOption.append(editButton, deleteButton);

            tr.append(tdinput, tdOption)

            this.getElement('#tbody-root').append(tr);
        })
    }

    displayTableShortCreated (shortAnswer) {
        const table = shortAnswer.filter(table => table.table)

        for (let i = 0; i < table.length; i++) {
            if (table[i].type === "Réponse courte") {
                for (let j = 0; j<table[i].table.length; j++) {
                    const tr = this.createElement('tr')
                    tr.id = ((i + 1).toString()) + (j)
                    document.getElementById(`question-${table[i].id}`).children[4].children[1].appendChild(tr)

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

    // recupere les infos qcm ajouté par l'utilisateur pour diffuser au controller
    bindAddQcm(handler) {
        this.getElement("#answer-add").addEventListener('click', event => {
            event.preventDefault()

            if (this._answerText) {
                handler(this._answerText, this._checkValue);
                this._resetInput()
            }
        })
    }

    bindAddShort(handler){
        this.getElement("#answer-add").addEventListener('click', event =>{
            event.preventDefault()

            if (this._answerText){
                handler(this._answerText)
                this._resetInput()
            }
        })
    }

// recuper les infos qcm éditées par l'utilisateur pour diffuser au controller
    binEditQcm = (handler) => {
        this.getElement('#tbody-root').addEventListener('click',event=> {
            if (event.target.classList.contains('edit')){
                let that = this
                if (this._countClick === 0){
                    this._guizmoSpeak("Voulez-vous modifier la ligne?",  "input", "button")
                    document.getElementById("message").addEventListener("click", function confirmEdit(el) {

                        if (el.target.classList.contains("btn-confirm")){
                            that._countClick++;
                            if (that._countClick === 1){
                                event.target.parentElement.parentElement.classList.add('focus');
                                event.target.parentElement.parentElement.children[0].firstChild.id="input-edit";
                                event.target.parentElement.parentElement.children[1].children[0].nextSibling.id="check-edit";


                                document.querySelectorAll('.edit').forEach(edit => {
                                    edit.classList.add("disabled");
                                })
                                document.querySelectorAll('.delete').forEach(del => {
                                    del.classList.add("disabled");
                                })

                                if (event.target.parentElement.parentElement.classList.contains("focus")){
                                    event.target.classList.remove("disabled")
                                }
                                document.getElementById("input-edit").disabled = false
                                document.getElementById("check-edit").disabled = false
                                document.getElementById("choice").disabled = true
                                document.getElementById("good-answer").disabled = true
                                document.getElementById("answer-add").classList.add("disabled");
                                that._toggleSwitch(that._executed);
                                that._countClick++
                                that._executed = true

                            }

                            document.getElementById("caution").innerHTML="";
                            document.getElementById("message").classList.add("display-none");
                            document.body.style.overflow = "initial"
                            document.querySelector("form").style.opacity = "initial"
                            document.querySelectorAll("input").forEach(input => {
                                input.classList.remove("disabled")
                            })
                            if (event.target.parentElement.parentElement.classList.contains("focus")){
                                event.target.classList.remove("disabled")
                            }
                            this.removeEventListener("click", confirmEdit)
                        }
                        if (el.target.classList.contains("btn-cancel")){
                            that._removeguizmoSpeech()
                            that._countClick = 0;
                            this.removeEventListener("click", confirmEdit)
                        }

                    })
                }

                if (this._countClick > 1){
                    let  id =parseInt( event.target.parentElement.parentElement.id)
                    let temporaryAnswerText = document.getElementById("input-edit").value
                    if (document.getElementById("check-edit").parentElement.firstChild.checked)
                        var temporaryInputCheck = "checked"
                    else{
                        var  temporaryInputCheck = false
                    }
                     handler(id, temporaryAnswerText, temporaryInputCheck);
                    document.getElementById("choice").disabled = false
                    document.getElementById("good-answer").disabled = false
                    document.getElementById("answer-add").classList.remove("disabled");
                    document.getElementById("form-add").classList.remove("disabled");
                    document.getElementById("change").classList.remove("disabled");
                    this._countClick = 0;
                }
            }
        })

    }

    binEditShort = handler => {
        this.getElement('#tbody-root').addEventListener('click',event=> {
            if (event.target.classList.contains('edit')){
                let that = this
                if (this._countClick === 0){
                    this._guizmoSpeak("Voulez-vous modifier la ligne?",  "input", "button")
                    document.getElementById("message").addEventListener("click", function confirmEdit(el) {

                        if (el.target.classList.contains("btn-confirm")){
                            that._countClick++;
                            if (that._countClick === 1){
                                event.target.parentElement.parentElement.classList.add('focus');
                                event.target.parentElement.parentElement.children[0].firstChild.id="input-edit";


                                document.querySelectorAll('.edit').forEach(edit => {
                                    edit.classList.add("disabled");
                                })
                                document.querySelectorAll('.delete').forEach(del => {
                                    del.classList.add("disabled");
                                })


                                if (event.target.parentElement.parentElement.classList.contains("focus")){
                                    event.target.classList.remove("disabled")
                                }
                                document.getElementById("input-edit").disabled = false
                                document.getElementById("choice").disabled = true
                                document.getElementById("answer-add").classList.add("disabled");
                                that._countClick++
                                that._toggleSwitch(that._executed)
                                that._executed = false

                            }

                            document.getElementById("caution").innerHTML="";
                            document.getElementById("message").classList.add("display-none");
                            document.body.style.overflow = "initial"
                            document.querySelector("form").style.opacity = "initial"
                            document.querySelectorAll("input").forEach(input => {
                                input.classList.remove("disabled")
                            })
                            if (event.target.parentElement.parentElement.classList.contains("focus")){
                                event.target.classList.remove("disabled")
                            }

                            this.removeEventListener("click", confirmEdit)
                        }
                        if (el.target.classList.contains("btn-cancel")){
                            that._removeguizmoSpeech()
                            that._countClick = 0;
                            this.removeEventListener("click", confirmEdit)
                        }

                    })
                }

                if (this._countClick > 1){
                    let  id =parseInt( event.target.parentElement.parentElement.id)
                    let temporaryAnswerText = document.getElementById("input-edit").value
                    handler(id, temporaryAnswerText);
                    document.getElementById("choice").disabled = false
                    document.getElementById("answer-add").classList.remove("disabled");
                    document.getElementById("form-add").classList.remove("disabled");
                    document.getElementById("change").classList.remove("disabled");
                    this._countClick = 0;
                }

            }
        })
    }

// recupere les infos supprimer par l'utilisateur pour diffuser au controller
    binDelete = handler => {
        this.getElement('#tbody-root').addEventListener('click', event => {
            if (event.target.classList.contains("delete")) {
                this._guizmoSpeak("Voulez-vous supprimer la ligne?")
                let that = this
                document.getElementById("message").addEventListener("click", function confirmDel (el) {
                    if (el.target.classList.contains("btn-confirm")){
                        var id = parseInt(event.target.parentElement.parentElement.id)

                        handler(id);

                        that._removeguizmoSpeech()
                        this.removeEventListener("click", confirmDel)
                    }
                    if (el.target.classList.contains("btn-cancel")){
                        that._removeguizmoSpeech()
                        this.removeEventListener("click", confirmDel)
                    }
                })
            }
        })
    }


    // fonction qui permet l'edition du checkbox en mode modification
    _toggleSwitch = (executed) =>{
        this.getElement('#tbody-root').addEventListener("click", (event) => {
            if (event.target.id === "check-edit"){
                if (executed === false) {

                    if (event.target.parentElement.firstChild.checked) {
                        event.target.parentElement.firstChild.checked = false
                    } else {
                        event.target.parentElement.firstChild.checked = "checked";
                    }
                }
            }

        })
    }

    // function pour faire apparaitre la validation pour l'édition ou suppression
    _guizmoSpeak =(message) => {

                    document.body.style.overflow = "hidden";
                    this.getElement("form").style.opacity = "50%";
                   document.getElementById("message").classList.remove("display-none")
                   document.getElementById("caution").innerHTML=message
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

}



_removeguizmoSpeech = () => {
    document.getElementById("caution").innerHTML="";
    document.getElementById("message").classList.add("display-none");
    document.body.style.overflow= "initial"
    document.querySelector("form").style.opacity= "initial"
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

_lockExercice = () => {
        document.querySelectorAll("input[type=radio]").forEach(radio => {
            radio.disabled = true;
        })
        document.getElementById("change").classList.remove("display-none");
        let that = this;

        this.getElement("body").addEventListener("mousedown", function confirm(event){
            if (event.target.id ==="change") {
                that._guizmoSpeak("Voulez-vous changer d'exercice?")
                let these = that;
                document.getElementById("message").addEventListener("click", function confirmChange (el) {

                    if (el.target.classList.contains("btn-confirm")){
                        these._unlockExercice();
                        these._removeguizmoSpeech();
                        this.removeEventListener("click", confirmChange)
                    }

                    if (el.target.classList.contains("btn-cancel")){
                        that._removeguizmoSpeech()
                        this.removeEventListener("click", confirmChange)
                    }

                })
            }

        })

}

_unlockExercice = () => {

            document.querySelectorAll("input[type=radio]").forEach(radio => {
                radio.disabled = false;
                radio.checked = false;
            });
            document.querySelector("#change").classList.add("display-none");

            while (document.querySelector("#root").firstChild){
                document.querySelector("#root").removeChild(document.querySelector("#root").firstChild)
            }

            document.getElementById("question-name").value = "";
            document.getElementById("explication").checked = false;
            document.getElementById("explication-text").value = "";
            this._hideDisplay(document.getElementById("explication-text"))
        }

        _hideDisplay(el){
            el.classList.add("display-none");
        }

        _showDisplay(el){
            el.classList.remove("display-none");
        }

        _displayQuestions(questions){
            if (this.getElement('#questions')) {

                while (this.getElement('#questions').firstChild) {
                    this.getElement('#questions').removeChild(this.getElement('#questions').firstChild)
                }
            }

            questions.forEach(question => {


                const div = this.createElement("div", "opacity");
                div.id = `question-${question.id}`;

                const btnEdit = this.createElement("button");
                btnEdit.className = "btn btn-secondary edit-question"

                const imgBtnEdit = this.createElement('i');
                imgBtnEdit.className = "fa fa-edit edit-question"

                const btnDel = this.createElement("button");
                btnDel.className = "btn btn-tertiary delete-question";

                const imgBtnDel = this.createElement("i");
                imgBtnDel.className = "fa fa-trash-alt delete-question";

                const name = this.createElement("p", "qcm")
                name.className = `bold_15 ${question.type}`
                name.innerHTML = `Question : ${question.type}`

                const questionName = this.createElement("input", "question-name");
                questionName.type = "text";
                questionName.value = question.enonce;
                questionName.disabled = true;

                const table = this.createElement("table");
                if (name.classList.contains("QCM")){
                    table.className = 'tableQCM app-question'
                }
                else if(name.classList.contains("courte")){
                    table.className= "tableShort app-question"
                }
                else{table.className = "app-question"}

                const explicationName = this.createElement("p")
                explicationName.className = "explication-name bold_15"
                explicationName.innerHTML = "Texte explicatif : "


                const explanationCheck = this.createElement("label")
                explanationCheck.className = "toggle-checkbox-label explication-edited-label bold_10"

                const check = this.createElement("input")
                check.className = "toggle-checkbox explication-edited-check"
                check.type = "checkbox";
                if (!(question.check === "checked")) {
                }else{check.checked = question.check}

                const explication = this.createElement("input")
                explication.type = "text";
                explication.className = "explication-edited"
                explication.value = question.explication
                explication.disabled = true

                const hr = this.createElement("hr")


                document.getElementById("questions").appendChild(div);
                div.append(btnEdit, btnDel, name, questionName, table,explicationName,check, explanationCheck,)
                if (question.check === "checked"){
                    div.appendChild(explication)
                }
                div.appendChild(hr)
                btnEdit.appendChild(imgBtnEdit);
                btnDel.appendChild(imgBtnDel);


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
}
