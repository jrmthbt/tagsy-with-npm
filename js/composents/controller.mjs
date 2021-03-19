//MVC - controller


export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

    //if (document.getElementById("qcm").checked){
        console.log("je suis qcm controller");
        this.model.bindChangeAnswer(this.onChange)
       this.onChange(this.model.qcmAnswers, [])
        /*this.view.bindAddAnswer(this.handleAddAnswer)
        this.view.binDeleteAnswer(this.handleDeleteAnswer)
        this.view.binEditAnswer(this.handleEditAnswer)*/
    //}
     //   if (document.getElementById("short-answer").checked){
         //   console.log("je suis answer controller");
           /* this.model.bindChangeAnswer(this.onChange)
            this.onChange([], this.model.shortAnswers)
            this.view.bindAddAnswer(this.handleAddAnswer)
            this.view.binDeleteAnswer(this.handleDeleteAnswer)
            this.view.binEditAnswer(this.handleEditAnswer)*/
        //}

    }
    // function pour afficher le tableau quand model est modifier
     onChange = (qcmAnswer, shortAnswer) => {
        // if (document.getElementById("qcm").checked) {
             console.log(qcmAnswer)
             this.view.displayTable(qcmAnswer,[]);
        // }
        // if(document.getElementById("short-answer").checked){
             console.log(shortAnswer)
        //     this.view.displayTable([], shortAnswer)
        // }
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