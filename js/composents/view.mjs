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

        this._temporaryAnswerText
        this._temporaryInputCheck
        this._initLocalListeners()
        this._focusRow()
        this._toggleSwitch()
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
            return this.getElement('#good-answer').value = checked
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
            //input.disabled = true;

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

    binEditAnswer(handler) {
        this.getElement('tbody').addEventListener('"click"', event => {
            if (this._temporaryAnswerText && this._temporaryInputCheck) {
                const id = parseInt(event.target.parentElement.parentElement.id)
                console.log(id);
                handler(id, this._temporaryAnswerText, this._temporaryInputCheck)
                this._temporaryAnswerText = ''
                this._temporaryInputCheck = false
            }
        })
    }

    binDeleteAnswer(handler) {
        this.getElement('tbody').addEventListener('click', event => {
            if (event.target.classList.contains("delete")) {
                console.log("delete");
                const id = parseInt(event.target.parentElement.parentElement.id)
                console.log(`view : ${id}`)

                handler(id);
            }
        })
    }

    _initLocalListeners() {
       /* this.getElement('tbody').addEventListener("click", event => {
            if (event.target.classList.contains("edit")) {
                this._temporaryAnswerText = event.target.parentElement.parentElement.firstChild.firstChild.value;
                if (event.target.parentElement.parentElement.children[1].firstChild.checked){
                    this._temporaryInputCheck = "checked"
                }else{this._temporaryInputCheck = false}


                console.log(this._temporaryAnswerText);
                console.log(this._temporaryInputCheck);

            }
        })*/
    }

    _selectRow = event => {
        if (event.target.classList.contains("edit")) {

            console.log("click modif 1")

            event.target.parentElement.parentElement.classList.add("focus");
            event.target.parentElement.parentElement.children[0].firstChild.id="input-edit";
            event.target.parentElement.parentElement.children[1].firstChild.nextSibling.id="check-edit";

            document.querySelectorAll('.edit').forEach (edit => {
                edit.classList.add("disabled")
            })

            if ( event.target.parentElement.parentElement.classList.contains("focus")){
                event.target.classList.remove("disabled");

                console.log(event.target.parentElement.parentElement.children[1].children[0].nextSibling)
                console.log(event.target.parentElement.parentElement.children[1].children[0])
            }

            document.querySelectorAll('.delete').forEach (del => {
                del.classList.add("disabled")
            })

            this.getElement('tbody').removeEventListener("click", this._selectRow)
            console.log("remove Event");

        }
    }

    _focusRow(){
        this.getElement('tbody').addEventListener("click", this._selectRow)

    }

    _toggleSwitch(){
        this.getElement('tbody').addEventListener("click", el => {
            if (el.target.id === "check-edit"){
                console.log("toggle edit");
                if (el.target.parentElement.firstChild.checked === false){
                    el.target.parentElement.firstChild.checked = "checked"
                }else {
                    el.target.parentElement.firstChild.checked = false;
                }
            }
        })
    }

}