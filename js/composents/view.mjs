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

    get _answerText(){
      return this.getElement('#choice').value;
    }

    get _checkValue(){
        return this.getElement('#good-answer').checked;
    }

    _resetInput () {
        this.getElement('#choice').value = "";
        this.getElement('#good-answer').checked = false;
    }

    displayTableQcm(qcmAnswers) {


            while (this.getElement('tbody').firstChild) {
                this.getElement('tbody').removeChild(this.getElement('tbody').firstChild)
            }


       qcmAnswers.forEach(answer => {
           const tr = this.createElement('tr');

           const tdinput = this.createElement('td');
           const input = this.createElement('input', 'regular_10');
           input.type = "text";
           input.className ="choices text-center";
           input.value = answer.choix;

           const tdCheck = this.createElement('td');
           const labelToggle = this.createElement('label');
           labelToggle.className = "good-answer-choice toggle-checkbox-label";
           const check = this.createElement('input', 'toggle-checkbox')
           check.type = "checkbox";
           if (answer.goodAnswer === "checked") {
               check.setAttribute("checked", answer.goodAnswer);
           }
           console.log(answer.goodAnswer);

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
        this.getElement("#answer-add").addEventListener('submit', event => {
            event.preventDefault()

            if (this._answerText){
                handler(this._answerText && this._checkValue);
                this._resetInput()
            }
        })
    }

    binEditAnswer (handler){

    }

    binDeleteAnswer (handler) {
        this.getElement('tbody').addEventListener('click', event =>{
            if (event.target.className ==='delete'){
                const id = parseInt(event.target.parentElement.id)

                handler(id);
            }
        })
    }
}