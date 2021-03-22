
// MVC - model

export class Model {

    // recupere dans le local storage
    constructor() {
        this.qcmAnswers = JSON.parse(localStorage.getItem('QcmAnswers')) || [];
        this.shortAnswers = JSON.parse(localStorage.getItem('ShortAnswers')) || [];
    }

    // crud fonction read
    bindChangeQcmAnswer(callback){
        this.onChangeQcm = callback;
    }

    bindChangeShortAnswer(callback){
        this.onChangeShort = callback;
    }

    // ajoute dans le localstorage
    _commit(qcmAnswers) {
        this.onChangeQcm(qcmAnswers)
        localStorage.setItem('QcmAnswers', JSON.stringify(qcmAnswers))
    }

    _commitShort(shortAnswers){
        this.onChangeShort(shortAnswers)
        localStorage.setItem("ShortAnswers", JSON.stringify(shortAnswers))
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

    addAnswerShort(inputAnswer){
        const answer = {
            "id": this.shortAnswers.length > 0 ? this.shortAnswers[this.shortAnswers.length -1].id +1 : 1,
            "answer" : inputAnswer
        }
        this.shortAnswers.push(answer);
        this._commitShort(this.shortAnswers);
        console.table(this.shortAnswers);
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

    editAnswerShort(id, updateAnswer){
        this.shortAnswers.forEach(answer =>{
            if (answer.id === id){
                answer.id = id
                answer.answer = updateAnswer
            }
        })
        this._commitShort(this.shortAnswers)
    }


    // crud function delete
    deleteAnswerQcm(id) {
        this.qcmAnswers = this.qcmAnswers.filter(( answer) => answer.id !== id)
        this._commit(this.qcmAnswers)
    }

    deleteAnswerShort(id) {
        this.shortAnswers = this.shortAnswers.filter((answer) => answer.id !== id)
        this._commitShort(this.shortAnswers)
        console.table(this.shortAnswers)
    }


}
