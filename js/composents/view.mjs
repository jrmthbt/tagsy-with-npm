// MVC - view

export class View {
    constructor() {


        this.app = document.getElementById('root');
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
                            <input type="text" id="choice" class="regular_10 text-center" name="answer">
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

        this._countClick = 0
        this._executed = false

    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    get _answerText() {
        return this.getElement('#choice').value;

    }

    get _checkValue() {
        if (this.getElement("#good-answer").checked) {
            console.log(this.getElement("#good-answer").checked)
            return this.getElement('#good-answer').value = "checked"
        } else {
            console.log(this.getElement("#good-answer").checked)
            return this.getElement('#good-answer').checked = false;

        }
    }

    _resetInput() {
        this.getElement('#choice').value = "";
        this.getElement('#good-answer').checked = false;
    }

    displayTableQcm(qcmAnswers) {


        while (this.getElement('tbody').firstChild) {
            this.getElement('tbody').removeChild(this.getElement('tbody').firstChild)
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

            this.getElement('tbody').append(tr);
        })
    }

    bindAddAnswer(handler) {
        this.getElement("#answer-add").addEventListener('click', event => {
            event.preventDefault()

            if (this._answerText) {
                handler(this._answerText, this._checkValue);
                this._resetInput()
            }
        })
    }


    binEditAnswer = (handler) => {
        this.getElement('tbody').addEventListener('click',event=> {
            if (event.target.classList.contains('edit')){
                let that = this
                if (this._countClick === 0){
                    this._guizmoSpeak("Voulez-vous modifier la ligne?", this._executed, "edit")
                    document.getElementById("message").addEventListener("click", function confirmEdit(el) {

                        if (el.target.classList.contains("btn-confirm")){
                            console.log("je modif");
                            that._countClick++;
                            console.log(that._countClick)
                            if (that._countClick === 1){
                                console.log("select row to edit")
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
                                console.log("toggle");
                                that._countClick++
                                console.log(that._countClick);
                                that._toggleSwitch(that._executed);
                                that._executed = true
                                this.removeEventListener("click", confirmEdit)

                            }

                            document.getElementById("caution").innerHTML="";
                            document.getElementById("message").classList.add("display-none");
                            this.removeEventListener("click", confirmEdit)
                        }
                        if (el.target.classList.contains("btn-cancel")){
                            console.log(`annule`)
                            document.getElementById("caution").innerHTML="";
                            document.getElementById("message").classList.add("display-none");
                            that._countClick = 0;
                            this.removeEventListener("click", confirmEdit)
                        }


                    })
                }

                if (this._countClick > 1){
                    console.log("j'ai édit")
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


    binDeleteAnswer = handler => {
        this.getElement('tbody').addEventListener('click', event => {
            if (event.target.classList.contains("delete")) {
                this._guizmoSpeak("Voulez-vous supprimer la ligne?")
                document.getElementById("message").addEventListener("click", function confirmDel (el) {
                    if (el.target.classList.contains("btn-confirm")){
                        console.log("delete");
                        var id = parseInt(event.target.parentElement.parentElement.id)
                        console.log(`view : ${id}`)

                        handler(id);

                        document.getElementById("caution").innerHTML="";
                        document.getElementById("message").classList.add("display-none");
                        this.removeEventListener("click", confirmDel)
                    }
                    if (el.target.classList.contains("btn-cancel")){
                        console.log(`annule`)
                        document.getElementById("caution").innerHTML="";
                        document.getElementById("message").classList.add("display-none");
                        this.removeEventListener("click", confirmDel)
                    }
                })


            }
        })
    }

    _toggleSwitch = (executed) =>{
        this.getElement('tbody').addEventListener("click", (event) => {
            if (event.target.id === "check-edit"){
                if (executed === false) {


                    console.log("click-toggle")
                    if (event.target.parentElement.firstChild.checked) {
                        event.target.parentElement.firstChild.checked = false
                    } else {
                        event.target.parentElement.firstChild.checked = "checked";
                    }
                }
            }

        })
    }

    _guizmoSpeak =(message) => {


                   document.getElementById("message").classList.remove("display-none")
                   document.getElementById("caution").innerHTML=message
}

}