
// MVC - model

export class Model {

    // get in sessionStorage
    constructor() {
        if (sessionStorage.length > 0 ) {
            console.log("get SS")
            this.qcmAnswers = JSON.parse(sessionStorage.getItem('qcmAnswers')) || [];
            this.shortAnswers = JSON.parse(sessionStorage.getItem('shortAnswers')) || [];
            this.tagsyEditor = JSON.parse(sessionStorage.getItem('tagsyEditor')) || [];
            this.questionCreated = JSON.parse(sessionStorage.getItem("questionCreated")) || [];
            this.tagsy = JSON.parse(sessionStorage.getItem('tagsy')) || [];
            // counter
            this.count = this.questionCreated.length;

        }
        if (localStorage.length > 0){
            console.log("get LS")
            this.qcmAnswers = JSON.parse(localStorage.getItem('qcmAnswers')) || [];
            this.shortAnswers = JSON.parse(localStorage.getItem('shortAnswers')) || [];
            this.tagsyEditor = JSON.parse(localStorage.getItem('tagsyEditor')) || [];
            this.questionCreated = JSON.parse(localStorage.getItem("questionCreated")) || [];
            this.tagsy = JSON.parse(localStorage.getItem('tagsy')) || [];
            // counter
            this.count = this.questionCreated.length;
        }

    }

    // crud fonction read

// array QCM
    bindChangeQcmAnswer(callback){
        this.onChangeQcm = callback;
    }
// array ShortAnswer
    bindChangeShortAnswer(callback){
        this.onChangeShort = callback;
    }
// questions
    bindChangeQuestion(callback){
        this.onChangeQuestion = callback;
    }

    // ajoute dans le sessionstorage
    // array QCM
    _commit(qcmAnswers) {
        this.onChangeQcm(qcmAnswers)
        sessionStorage.setItem('qcmAnswers', JSON.stringify(qcmAnswers))
    }
// array ShortAnswer
    _commitShort(shortAnswers){
        this.onChangeShort(shortAnswers)
        sessionStorage.setItem("shortAnswers", JSON.stringify(shortAnswers))
    }
// Questions
    _commitQuestion (questionCreated){
        this.onChangeQuestion(questionCreated)
        sessionStorage.setItem("questionCreated", JSON.stringify(questionCreated))
    }


    // crud function create
    // array QCM
    addAnswerQcm(inputAnswer, inputChecked) {

        const answer = {
            "id": this.qcmAnswers.length > 0 ? this.qcmAnswers[this.qcmAnswers.length - 1].id + 1 : 1,
            "choix": inputAnswer,
            "goodAnswer": inputChecked,
        }
        this.qcmAnswers.push(answer);

        this._commit(this.qcmAnswers)
    }
// array ShortAnswer
    addAnswerShort(inputAnswer){
        const answer = {
            "id": this.shortAnswers.length > 0 ? this.shortAnswers[this.shortAnswers.length -1].id +1 : 1,
            "answer" : inputAnswer
        }
        this.shortAnswers.push(answer);
        this._commitShort(this.shortAnswers);
    }
// Questions
    addQuestion(){
        let getEditor = JSON.parse(sessionStorage.getItem("tagsyEditor"))
        let that = this
        if (getEditor !== null) {
            that.count++
            const question = {
                "id": this.questionCreated.length > 0 ? `question-${this.count}` : 'question-1',
                "type": getEditor.qcm ? "QCM" : getEditor.identification ? "Identification" : "Réponse courte",
                "enonce": getEditor.questionName,
                "table": getEditor.qcm ? this.qcmAnswers : getEditor.shortAnswer ? this.shortAnswers : [],
                "check": getEditor.explanationCheck ? "checked" : false,
                "explication": getEditor.explanationCheck ? getEditor.explanation : "",
            }
            console.log(question)
            this.questionCreated.push(question)
            this._commitQuestion(this.questionCreated)
            sessionStorage.removeItem("qcmAnswers")
            sessionStorage.removeItem("shortAnswers")
            sessionStorage.removeItem("tagsyEditor")
        }
    }


    // crud fonction update
    // array QCM
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
// array ShortAnswer
    editAnswerShort(id, updateAnswer){
        this.shortAnswers.forEach(answer =>{
            if (answer.id === id){
                answer.id = id
                answer.answer = updateAnswer
            }
        })
        this._commitShort(this.shortAnswers)
    }
// Questions
    editQuestion(id, updateQuestion, updateArray, updateExplanationCheck, updateExplanation){
        this.questionCreated.forEach(question => {
            if (question.id === id){
                question.id = id
                question.enonce = updateQuestion;
                question.table = updateArray;
                question.check = updateExplanationCheck
                question.explication = updateExplanation
            }
        })

        this._commitQuestion(this.questionCreated);
        console.table(this.questionCreated)
    }

    // crud function delete
    // array QCM
    deleteAnswerQcm(id) {
        this.qcmAnswers = this.qcmAnswers.filter(( answer) => answer.id !== id)
        this._commit(this.qcmAnswers)
    }
// array ShortAnswer
    deleteAnswerShort(id) {
        this.shortAnswers = this.shortAnswers.filter((answer) => answer.id !== id)
        this._commitShort(this.shortAnswers)
    }
// Questions
    deleteQuestion(id){
        this.questionCreated = this.questionCreated.filter((question) => question.id !==id)
        this._commitQuestion(this.questionCreated)
    }



}
