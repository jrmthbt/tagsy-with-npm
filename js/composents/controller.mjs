//MVC - controller


export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        document.querySelector("body").addEventListener("change", event =>{
            if (event.target.id === this.view.exercice[0]){
                console.log("je suis qcm - controller")
                this.model.bindChangeQcmAnswer(this.onChange)
                this.view.bindAddQcm(this.handleAddAnswer)
                this.view.binDelete(this.handleDeleteAnswer)
                this.view.binEditQcm(this.handleEditAnswer)
                this.onChange(this.model.qcmAnswers)
                this.clearTableShort()
            }
            if (event.target.id === this.view.exercice[1]){
                console.log("je suis identification - controller ")
                this.clearTableQcm();
                this.clearTableShort()
            }
            if (event.target.id === this.view.exercice[2]){
                console.log("je suis short-answer - controller ")
                this.model.bindChangeShortAnswer(this.onChangeShort)
                this.view.bindAddShort(this.handleAddShort)
                this.view.binDelete(this.handleDeleteShort)
                //this.view.binEditShort(this.handleEditShort)
                this.onChangeShort(this.model.shortAnswers)
                this.clearTableQcm();
            }
        })






    }
    // function pour afficher le tableau quand model est modifier
     onChange = (qcmAnswer) => {
                this.view.displayTableQcm(qcmAnswer);
    }
    onChangeShort = (shortAnswer) =>{
        this.view.displayTableShort(shortAnswer);
    }
   // controller qui ajoute au model
    handleAddAnswer = (answerText, answerCheck) => {
        this.model.addAnswerQcm(answerText, answerCheck)
    }
    handleAddShort = (answerText) => {
        this.model.addAnswerShort(answerText)
    }
    // controller qui edit le model
    handleEditAnswer = (id, answerText, answerCheck) => {
        this.model.editAnswerQcm(id, answerText, answerCheck)

    }
    handleEdit = (id, answerText) =>{
        this.model.editAnswerShort(id, answerText)
    }
    // controller qui supprime dans le model
    handleDeleteAnswer = (id) => {
        this.model.deleteAnswerQcm(id)
    }

    handleDeleteShort = (id) => {
        this.model.deleteAnswerShort(id)
    }


    clearTableQcm = () => {
        this.model.qcmAnswers = [];
        localStorage.setItem('QcmAnswers', JSON.stringify(this.model.qcmAnswers))
        console.table(this.model.qcmAnswers)

    }
    clearTableShort = () => {
        this.model.shortAnswers = [];
        localStorage.setItem("ShortAnswers", JSON.stringify(this.model.shortAnswers))
        console.table(this.model.shortAnswers);
    }




}