
// MVC - model

export class Model {
    constructor() {
        this.qcmAnswers = [
            {
                "id": 1,
                "choix": "suis",
                "goodAnswer": false,
            },
            {
                "id": 2,
                "choix": "es",
                "goodAnswer": false,
            },
            {
                "id": 3,
                "choix": "est",
                "goodAnswer": "checked",
            },
        ]


    }

    bindChangeQcmAnswer(callback){
        this.onChangeQcm = callback;
    }


    addAnswerQcm(inputAnswer, inputChecked) {
        const answer = {
            "id": this.qcmAnswers.length > 0 ? this.qcmAnswers[this.qcmAnswers.length - 1].id + 1 : 1,
            "choix": inputAnswer,
            "goodAnswer": inputChecked,
        }

        this.qcmAnswers.push(answer);
        this.onChangeQcm(this.qcmAnswers)
    }


    editAnswerQcm(id, updatedAnswer, updateChecked) {
        this.qcmAnswers = this.qcmAnswers.map((answer) =>
            answer.id === id ? {id: answer.id, choix: updatedAnswer, goodAnswer: updateChecked} : answer,
        )
        this.onChangeQcm(this.qcmAnswers)
    }


    deleteAnswerQcm(id) {
        this.qcmAnswers = this.qcmAnswers.filter((answer) => answer.id !== id)

        this.onChangeQcm(this.qcmAnswers)
    }


}
