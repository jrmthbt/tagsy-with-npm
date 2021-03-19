
// MVC - model

export class Model {

    // recupere dans le local storage
    constructor() {
        this.qcmAnswers = JSON.parse(localStorage.getItem('QcmAnswer')) || []
        this.shortAnswers = [
            {"id": 1, "answer":"suis"},
            {"id": 2, "answer":"es"},
            {"id": 3, "answer":"sommes"},
            {"id": 4, "answer":"êtes"},
        ]
    }

    // crud fonction read
    bindChangeAnswer(callback){
        this.onChange = callback;
    }


    // ajoute dans le localstorage
    _commit(qcmAnswers, shortAnswers) {
        if (this.qcmAnswers) {
            this.onChange(qcmAnswers)
            localStorage.setItem('QcmAnswer', JSON.stringify(qcmAnswers))
        }
        if (this.shortAnswers){
            this.onChange(shortAnswers)

        }
    }


    // crud function create
    addAnswerQcm(inputAnswer, inputChecked) {
        const answer = {
            "id": this.qcmAnswers.length > 0 ? this.qcmAnswers[this.qcmAnswers.length - 1].id + 1 : 1,
            "choix": inputAnswer,
            "goodAnswer": inputChecked,
        }
    console.log(answer);
        this.qcmAnswers.push(answer);

        this._commit(this.qcmAnswers)
    }

    addshortAnswer(inputAnswer){
        const answer = {
            "id" : this.shortAnswers.length > 0 ? this.shortAnswers[this.shortAnswers.length - 1].id + 1 : 1,
            "answer" : inputAnswer,
        }
        this.shortAnswers.push(answer);
    }

    // crud fonction update
    editAnswerQcm(id, updatedAnswer, updateChecked) {
        this.qcmAnswers.forEach(answer =>{
            if (answer.id === id){
                answer.id = id
                answer.choix = updatedAnswer
                answer.goodAnswer = updateChecked
            }

        })

        this._commit(this.qcmAnswers)
    }


    // crud function delete
    deleteAnswerQcm(id) {
        this.qcmAnswers = this.qcmAnswers.filter(( answer) => answer.id !== id)
        this._commit(this.qcmAnswers)
    }


}
