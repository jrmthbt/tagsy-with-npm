
// MVC - model

export class Model {

    // recupere dans le local storage
    constructor() {
        this.qcmAnswers = JSON.parse(localStorage.getItem('QcmAnswer')) || [];
        this.shortAnswer = [
            {id : 1, "answer" : "suis"},
            {id : 2, "answer" : "es"},
            {id : 3, "answer" : "est"},
            {id : 4, "answer" : "sont"},

        ]
    }

    // crud fonction read
    bindChangeQcmAnswer(callback){
        this.onChangeQcm = callback;
    }

    // ajoute dans le localstorage
    _commit(qcmAnswers) {
        this.onChangeQcm(qcmAnswers)
        localStorage.setItem('QcmAnswer', JSON.stringify(qcmAnswers))
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
