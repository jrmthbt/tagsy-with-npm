
// MVC - model

export class Model {

    // get in LocalStorage
    constructor() {
        this.qcmAnswers = JSON.parse(localStorage.getItem('qcmAnswers')) || [];
        this.shortAnswers = JSON.parse(localStorage.getItem('shortAnswers')) || [];
        this.tagsyEditor = JSON.parse(localStorage.getItem('tagsyEditor')) || [];
        this.questionCreated = JSON.parse(localStorage.getItem("questionCreated")) || [];
        this.tagsy = JSON.parse(localStorage.getItem('tagsy')) || [];
    }

    // crud fonction read


    bindChangeQcmAnswer(callback){
        this.onChangeQcm = callback;
    }

    bindChangeShortAnswer(callback){
        this.onChangeShort = callback;
    }

    bindChangeQuestion(callback){
        this.onChangeQuestion = callback;
    }

    // ajoute dans le localstorage
    _commit(qcmAnswers) {
        this.onChangeQcm(qcmAnswers)
        localStorage.setItem('qcmAnswers', JSON.stringify(qcmAnswers))
    }

    _commitShort(shortAnswers){
        this.onChangeShort(shortAnswers)
        localStorage.setItem("shortAnswers", JSON.stringify(shortAnswers))
    }

    _commitQuestion (questionCreated){
        this.onChangeQuestion(questionCreated)
        localStorage.setItem("questionCreated", JSON.stringify(questionCreated))
    }


    // crud function create
    addAnswerQcm(inputAnswer, inputChecked) {
        const answer = {
            "id": this.qcmAnswers.length > 0 ? this.qcmAnswers[this.qcmAnswers.length - 1].id + 1 : 1,
            "choix": inputAnswer,
            "goodAnswer": inputChecked,
        }
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
    }

    addQuestion(){
        let getEditor = JSON.parse(localStorage.getItem("tagsyEditor"))
        console.table(getEditor)
        const question = {
            "id": this.questionCreated.length > 0 ? `question-${this.questionCreated.length + 2}` : 'question-1',
            "type" : getEditor.qcm ? "QCM" : getEditor.identification ? "Identification" : "Réponse courte",
            "enonce" : getEditor.questionName,
            "table" : getEditor.qcm ? this.qcmAnswers : getEditor.shortAnswer ?  this.shortAnswers : [],
            "check" : getEditor.explanationCheck ? "checked" : false,
            "explication" : getEditor.explanationCheck ? getEditor.explanation : "",
        }
        console.log (question)
        this.questionCreated.push(question)
        this._commitQuestion(this.questionCreated)
        localStorage.removeItem("qcmAnswers")
        localStorage.removeItem("shortAnswers")
        localStorage.removeItem("tagsyEditor")
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
    }



}
