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
    // function pour afficher le tableau quand model est modifier
     onChangeQcm = (qcmAnswer) => {
        this.view.displayTableQcm(qcmAnswer)
    }
   // controller qui ajoute au model
    handleAddAnswer = (answerText, answerCheck) => {
        this.model.addAnswerQcm(answerText, answerCheck)
    }
    // controller qui edit le model
    handleEditAnswer = (id, answerText, answerCheck) => {
        this.model.editAnswerQcm(id, answerText, answerCheck)

    }
    // controller qui supprime dans le model
    handleDeleteAnswer = (id) => {
        this.model.deleteAnswerQcm(id)
    }


}