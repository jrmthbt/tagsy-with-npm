//MVC - controller


export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        document.querySelector("body").addEventListener("change", event =>{
            if (event.target.id === this.view.exercice[0]){
                console.log("je suis qcm - controller")
                this.model.bindChangeQcmAnswer(this.onChangeQcm)
                this.view.bindAddQcm(this.handleAddQcm)
                this.view.binDelete(this.handleDeleteQcm)
                this.view.binEditQcm(this.handleEditQcm)
                this.onChangeQcm(this.model.qcmAnswers)
            }
            if (event.target.id === this.view.exercice[1]){
                console.log("je suis identification - controller ")
            }
            if (event.target.id === this.view.exercice[2]){
                console.log("je suis short-answer - controller ")
                this.model.bindChangeShortAnswer(this.onChangeShort);
                this.view.bindAddShort(this.handleAddShort)
                this.view.binDelete(this.handleDeleteShort)
                this.onChangeShort(this.model.shortAnswers)
            }
        })






    }
    // function pour afficher le tableau quand model est modifier
     onChangeQcm = (qcmAnswer) => {
        this.view.displayTableQcm(qcmAnswer);
    }

    onChangeShort = (shortAnswer) => {
        this.view.displayTableShort(shortAnswer);
    }
   // controller qui ajoute au model
    handleAddQcm = (answerText, answerCheck) => {
        this.model.addAnswerQcm(answerText, answerCheck)
    }

    handleAddShort = (answerText) => {
        this.model.addAnswerShort(answerText);
    }
    // controller qui edit le model
    handleEditQcm = (id, answerText, answerCheck) => {
        this.model.editAnswerQcm(id, answerText, answerCheck)

    }
    // controller qui supprime dans le model
    handleDeleteQcm = (id) => {
        this.model.deleteAnswerQcm(id)
    }

    handleDeleteShort = id =>{
        this.model.deleteAnswerShort(id)
    }




}