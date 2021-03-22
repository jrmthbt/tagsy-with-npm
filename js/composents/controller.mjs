//MVC - controller


export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        document.querySelector("body").addEventListener("change", event =>{
            if (event.target.id === this.view.exercice[0]){
                console.log("je suis qcm - controller")
                this.model.bindChangeQcmAnswer(this.onChange)
                this.view.bindAddAnswer(this.handleAddAnswer)
                this.view.binDeleteAnswer(this.handleDeleteAnswer)
                this.view.binEditAnswer(this.handleEditAnswer)
                this.onChange(this.model.qcmAnswers)
            }
            if (event.target.id === this.view.exercice[1]){
                console.log("je suis identification - controller ")
            }
            if (event.target.id === this.view.exercice[2]){
                console.log("je suis short-answer - controller ")
            }
        })






    }
    // function pour afficher le tableau quand model est modifier
     onChange = (qcmAnswer) => {
                this.view.displayTableQcm(qcmAnswer);
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