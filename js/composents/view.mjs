// MVC - view

export class View {
    constructor() {

        if (document.getElementById('qcm')) {
            document.getElementById('qcm').addEventListener("change", function () {
                this.app = document.getElementById('app');
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
            })
        }
        if (document.getElementById('answer')) {
            document.getElementById('answer').addEventListener("change", function () {
                this.app = document.getElementById('app');
                this.app.innerHTML = `<thead>
                     <th scope="col" class="answer-thead bold_15">Choix</th>
                        <th scope="col" class="answer-thead bold_15">Options</th>
                        </thead>
                        <tbody></tbody>
                         <tfoot>
                                 <tr>
                                     <td>
                                         <label for="choice"></label>
                                         <input type="text" id="choice" class="regular_10 text-center" name="answer">
                                     </td>
                                      <td>
                                         <button class="btn-primary bold_10" id="answer-add">Ajouter</button>
                        </td>
                    </tr>
                    </tfoot>`
            })
        }
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

    _resetInput () {
        this.getElement('#choice').value = "";
    }

    displayTableQcm (qcmAnswers) {
        while (this.getElement('tbody').firstChild) {
            this.getElement('tbody').removeChild(this.getElement('tbody').firstChild)
        }
       qcmAnswers.forEach(answer => {
           const tr = this.createElement('tr');

           const tdinput = this.createElement('td');
           const input = this.createElement('input', 'regular_10');
           input.type = "text";
           input.value = answer.choix;

           const tdCheck = this.createElement('td');
           const check = this.createElement('input', 'toggle-checkbox-label')
           check.type = "checkbox";
           check.checked = answer.goodAnswer;

           const tdOption = this.createElement("td");
           const editButton = this.createElement("button", "btn-primary")
           editButton.id = "edit";
           editButton.innerHTML = "Modifier"

           const deleteButton = this.createElement("button", "btn-secondary")
           deleteButton.id = "delete"
           deleteButton.innerHTML = "Supprimer";

           tdinput.appendChild(input);
           tdCheck.appendChild(check);
           tdOption.append(editButton, deleteButton);

           tr.append(tdinput, tdCheck, tdOption)

           this.getElement('tbody').append (tr);
       })
    }
}