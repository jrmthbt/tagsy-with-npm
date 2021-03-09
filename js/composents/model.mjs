// MVC - model

export class Model {
    constructor() {
        this.qcmAnswers = [
            {
                "id" : 1,
                "choix" : "suis",
                "goodAnswer" : true,
            },
            {
                "id" : 2,
                "choix" : "es",
                "goodAnswer" : false,
            },
            {
                "id" : 3,
                "choix" : "est",
                "goodAnswer" : false,
            },
        ]
        this.shortAnswers = [
            {
                "id" : 1,
                "choix" : "sommes",
            },
            {
                "id" : 2,
                "choix" : "êtes",
            },
            {
                "id" : 3,
                "choix" : "sont",
            },
        ]
    }

    addAnswerQcm( inputAnswer, inputChecked) {
        const answer = {
            "id": this.qcmAnswers.length > 0 ? this.qcmAnswers[this.qcmAnswers.length - 1].id + 1 : 1,
            "choix": inputAnswer,
            "goodAnswer": inputChecked,
        }

        this.qcmAnswers.push(answer);
    }

    addAnswerShort (inputAnswer){
           const answer = {
               "id" : this.shortAnswers.length > 0 ? this.shortAnswers[this.shortAnswers.length - 1].id +1 : 1,
               "choix": inputAnswer
           }

           this.shortAnswers.push(answer)
       }


    editAnswerQcm ( id, updatedAnswer, updateChecked) {
            this.qcmAnswers = this.qcmAnswers.map((answer) =>
            answer.id === id ? {id: answer.id, choix: updatedAnswer, goodAnswer: updateChecked} : answer,
                )
    }

    editAnswerShort (id, updateAnswer){
            this.shortAnswers = this.shortAnswers.map((answer) =>
                answer.id === id ? {id: answer.id, choix: updatedAnswer} : answer,
            )
    }


    deleteAnswerQcm (id) {
            this.qcmAnswers = this.qcmAnswers.filter((answer) => answer.id !== id)
    }

    deleteAnswerShort (id){
            this.shortAnswers = this.shortAnswers.filter((answer) => answer.id !== id)
        }
    }
