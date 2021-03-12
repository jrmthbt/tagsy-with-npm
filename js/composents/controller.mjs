//MVC - controller


export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.bindChangeQcmAnswer(this.onChangeQcm)

        this.view.bindAddAnswer(this.handleAddAnswer)
        this.view.binDeleteAnswer(this.handleDeleteAnswer)
        this.view.binEditAnswer(this.handleEditAnswer)

        this.onChangeQcm(this.model.qcmAnswers)


    }

     onChangeQcm = (qcmAnswer) => {
        this.view.displayTableQcm(qcmAnswer)
    }

    handleAddAnswer = (answerText, answerCheck) => {
        this.model.addAnswerQcm(answerText, answerCheck)
    }

    handleEditAnswer = (id, answerText, answerCheck) => {
        this.model.editAnswerQcm(id, answerText, answerCheck)
    }

    handleDeleteAnswer = (id) => {
        this.model.deleteAnswerQcm(id)
        console.log(`controller : ${id}`)
    }


}