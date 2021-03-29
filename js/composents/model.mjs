
// MVC - model

export class Model {

    // recupere dans le local storage
    constructor() {
        this.qcmAnswers = JSON.parse(localStorage.getItem('qcmAnswers')) || [];
        this.shortAnswers = JSON.parse(localStorage.getItem('shortAnswers')) || [];

        this.getTagsy = [
            {
                "id" : 1,
                "type" : "QCM",
                "enonce" : "Je suis le nom de la question",
                "table" : [{"id": 1,"choix" : "es", "goodAnswer" : false},
                    {"id": 2,"choix" : "est", "goodAnswer" : false},
                    {"id": 3,"choix" : "suis", "goodAnswer" : "checked"},],
                "check" : "checked",
                "explication" : "je suis l'explication",
            },
            {
                "id" : 2,
                "type" : "QCM",
                "enonce" : "Je suis le nom de la question 2",
                "table" : [{"id": 1,"choix" : "es", "goodAnswer" : false},
                    {"id": 2,"choix" : "est", "goodAnswer" : false},
                    {"id": 3,"choix" : "suis", "goodAnswer" : "checked"},],
                "check" : "checked",
                "explication" : "je suis l'explication de la question 2",
            },
            {
                "id" : 3,
                "type" : "Identification",
                "enonce" : "Je suis le nom de la question",
                "table" : [],
                "check" : false,
                "explication" : "",
            },
            {
                "id" : 4,
                "type" : "Réponse courte",
                "enonce" : "Je suis le nom de la question",
                "table" : [
                    {"id": 1,"answer" : "es"},
                    {"id": 2,"answer" : "est"},
                    {"id": 3,"answer" : "suis"},
                    ],
                "check" : "checked",
                "explication" : "je suis l'explication",
            },
        ]

        console.table(this.getTagsy)
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
        localStorage.setItem('qcmAnswers', JSON.stringify(qcmAnswers))
    }

    _commitShort(shortAnswers){
        this.onChangeShort(shortAnswers)
        localStorage.setItem("shortAnswers", JSON.stringify(shortAnswers))
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
