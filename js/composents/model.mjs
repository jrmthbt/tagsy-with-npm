
// MVC - model

export class Model {
    constructor() {
        this.qcmAnswers = JSON.parse(localStorage.getItem('QcmAnswer')) || []
    }

    bindChangeQcmAnswer(callback){
        this.onChangeQcm = callback;
    }

    _commit(qcmAnswers) {
        this.onChangeQcm(qcmAnswers)
        localStorage.setItem('QcmAnswer', JSON.stringify(qcmAnswers))
    }


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


    deleteAnswerQcm(id) {
        this.qcmAnswers = this.qcmAnswers.filter(( answer) => answer.id !== id)
        this._commit(this.qcmAnswers)
    }


}
