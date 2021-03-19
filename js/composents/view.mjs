// MVC - view

export class View {
    constructor() {

        // check exercice
        document.querySelector("body").addEventListener("change", event =>{
            switch (event.target.id){
                case (event.target.id = "qcm") :
                    this.qcmTable()
                    this._lockExercice();
                    break;
                case (event.target.id = "identification") :
                    this._lockExercice();
                    break;
                case (event.target.id = "short-answer") :
                    this.answerTable();
                    this._lockExercice();
                    break;
                default :
            }
        })




        // counter de click
        this._countClick = 0
        // si executed
        this._executed = false
        this.app = document.getElementById('root');

    }

    // display table when qcm is check

    qcmTable=() => {
        // affiche le tableau Qcm
        this.app.innerHTML = ` <thead>
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
                            <input type="checkbox" id="good-answer" class="toggle-checkbox" name="answer-check">
                            <label for="good-answer" class="toggle-checkbox-label good-answer"></label>
                        </td>
                        <td>
                            <button class="btn-primary bold_10" id="answer-add">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
    }

    answerTable = () => {
        this.app.innerHTML = ` <thead>
               <tr>
                  <th scope="col" class="qcm-thead bold_15">Choix</th>
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
                            <button class="btn-primary bold_10" id="answer-add">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
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
        this.getElement('#good-answer').checked = false;
    }

    // affiche le tableau qcm
    displayTable(qcmAnswers) {
        console.log(this.getElement('tbody'));
           //while (this.getElement('tbody').firstChild) {
              // this.getElement('tbody').removeChild(this.getElement('tbody').firstChild)
           //}


        if (this.getElement('#qcm').checked) {
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

                 this.getElement('tbody').append(tr);
             })
        }
        /*if (this.getElement('#short-answer').checked) {
            console.log(shortAnswers)
            shortAnswers.forEach(answer => {
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

                this.getElement('tbody').append(tr);
            })
        }*/
    }

    // recupere les infos qcm ajouté par l'utilisateur pour diffuser au controller
    bindAddAnswer(handler) {
        this.getElement("#answer-add").addEventListener('click', event => {
            event.preventDefault()

            if (this._answerText) {
                handler(this._answerText, this._checkValue);
                this._resetInput()
            }
        })
    }

// recuper les infos qcm éditées par l'utilisateur pour diffuser au controller
    binEditAnswer = (handler) => {
        this.getElement('tbody').addEventListener('click',event=> {
            if (event.target.classList.contains('edit')){
                let that = this
                if (this._countClick === 0){
                    this._guizmoSpeak("Voulez-vous modifier la ligne?")
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
                                that._countClick++
                                that._toggleSwitch(that._executed);
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
                    this._countClick = 0;
                }
            }
        })

    }

// recupere les infos supprimer par l'utilisateur pour diffuser au controller
    binDeleteAnswer = handler => {
        this.getElement('tbody').addEventListener('click', event => {
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
        this.getElement('tbody').addEventListener("click", (event) => {
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
}

_lockExercice = () => {
        document.querySelectorAll('input[type=radio]').forEach(radio => {
            radio.classList.add("disabled");
        })
        document.querySelector('#change').classList.remove("display-none");
        let that = this;
        this.getElement('body').addEventListener("click", function confirmChange(el){
            if (el.target.id === "change"){
                that._guizmoSpeak("Voulez-vous Changer l'exercice?");
                let these = that;
                that.getElement('#message').addEventListener("click", event =>{
                    if (event.target.classList.contains("btn-confirm")){
                        these._unlockExercice();
                        these._removeguizmoSpeech();
                        this.removeEventListener("click", confirmChange);
                    }
                    if (event.target.classList.contains("btn-cancel")){
                        these._removeguizmoSpeech();
                        document.querySelectorAll('input[type=radio]').forEach(radio => {
                            radio.classList.add("disabled")})
                    }
                })
            }
        })
}

_unlockExercice = () => {
            document.querySelectorAll("input[type=radio]").forEach(radio => {
                radio.classList.remove("disabled");
                radio.checked = false;
            });
            document.getElementById("change").classList.add("display-none");

        while (this.getElement('table').firstChild){
            this.getElement('table').removeChild(this.getElement('table').firstChild);

        }
}

}