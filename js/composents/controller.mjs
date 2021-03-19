//MVC - controller


export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;


        document.querySelector("body").addEventListener("change", event =>{
            switch (event.target.id){
                case (event.target.id = "qcm") :
                    console.log("je suis qcm controller");
                    this.model.bindChangeQcmAnswer(this.onChange)
                    this.onChange(this.model.qcmAnswers)
                    this.view.bindAddAnswer(this.handleAddAnswer)
                    this.view.binDeleteAnswer(this.handleDeleteAnswer)
                    this.view.binEditAnswer(this.handleEditAnswer)
                    break;
               case (event.target.id = "identification") :
                    console.log("je suis identification controller");
                    break;
                case (event.target.id = "answer") :
                    console.log("je suis answer controller");
                    break;
                default :
                    console.log(event.target)
            }
        })



    }
    // function pour afficher le tableau quand model est modifier
     onChange = (qcmAnswer, shortAnswer) => {
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