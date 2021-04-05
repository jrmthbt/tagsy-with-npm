//MVC - controller
import {callLS, stopLS, tagsyEditor} from "./API/LocalStorage.mjs";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        document.querySelector("body").addEventListener("change", event =>{
            if (event.target.id === this.view.exercice[0]){
                this.model.bindChangeQcmAnswer(this.onChange)
                this.view.bindAddQcm(this.handleAddAnswer)
                this.view.binDelete(this.handleDeleteAnswer)
                this.view.binEditQcm(this.handleEditAnswer)
                this.onChange(this.model.qcmAnswers)
                this.clearTableShort()
            }
            if (event.target.id === this.view.exercice[1]){
                this.clearTableQcm();
                this.clearTableShort()
            }
            if (event.target.id === this.view.exercice[2]){
                this.model.bindChangeShortAnswer(this.onChangeShort)
                this.view.bindAddShort(this.handleAddShort)
                this.view.binDelete(this.handleDeleteShort)
                this.view.binEditShort(this.handleEditShort)
                this.onChangeShort(this.model.shortAnswers)
                this.clearTableQcm();
            }

            callLS()

        })

        document.querySelector("#form-add").addEventListener("click", function (){
              that.handleAddQuestion()
            that.clearEditor()
            that.clearTableShort()
            that.clearTableQcm()
            that.model.bindChangeQuestion(that.onChangeQuestion)
            that.onChangeQuestion(that.model.questionCreated)
            that.onChangeQuestionTableQcm(that.model.questionCreated.slice())
            that.onChangeQuestionTableShort(that.model.questionCreated.slice())
        })


            this.model.bindChangeQuestion(this.onChangeQuestion)
            this.onChangeQuestion(this.model.questionCreated)
            this.onChangeQuestionTableQcm(this.model.questionCreated.slice())
            this.onChangeQuestionTableShort(this.model.questionCreated.slice())



    let that = this;

    }
    // function pour afficher le tableau quand model est modifier
     onChange = (qcmAnswer) => {
                this.view.displayTableQcm(qcmAnswer);
    }
    onChangeShort = (shortAnswer) =>{
        this.view.displayTableShort(shortAnswer);
    }

    onChangeQuestion = (getTagsy) =>{
        this.view._displayQuestions(getTagsy);
    }
    onChangeQuestionTableQcm = questionTable => {
        this.view.displayTableQcmCreated(questionTable)
    }
    onChangeQuestionTableShort = questionTableShort => {
        this.view.displayTableShortCreated(questionTableShort)
    }
   // controller qui ajoute au model
    handleAddAnswer = (answerText, answerCheck) => {
        this.model.addAnswerQcm(answerText, answerCheck)
    }
    handleAddShort = (answerText) => {
        this.model.addAnswerShort(answerText)
    }

    handleAddQuestion = () => {
        this.model.addQuestion()
        console.table(this.model.questionCreated)
    }
    // controller qui edit le model
    handleEditAnswer = (id, answerText, answerCheck) => {
        this.model.editAnswerQcm(id, answerText, answerCheck)

    }
    handleEditShort = (id, answerText) =>{
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
        localStorage.removeItem("qcmAnswers")
        console.table(this.model.qcmAnswers)

    }
    clearTableShort = () => {
        this.model.shortAnswers = [];
       localStorage.removeItem("shortAnswers")
        console.table(this.model.shortAnswers);
    }

    clearEditor = () => {
        this.view._unlockExercice()
        this.view.getElement("#explication").checked = false;
        this.view.getElement("#explication-text").value= "";
    }

    _getDataSaved = () => {
        document.getElementById("save-info").checked = this.model.tagsy.autoSave;
        document.getElementById("qcm").checked = this.model.tagsyEditor.qcm;
        document.getElementById("identification").checked = this.model.tagsyEditor.identification;
        document.getElementById("short-answer").checked = this.model.tagsyEditor.shortAnswer;
        document.getElementById("explication").checked = this.model.tagsyEditor.explanationCheck;
        if (document.getElementById("explication").checked){
            document.getElementById("explication-text").classList.remove("display-none")
        }
        if (this.model.tagsyEditor.questionName){
            document.getElementById("question-name").value = this.model.tagsyEditor.questionName;
        }
        if (this.model.tagsyEditor.explanation){
            document.getElementById("explication-text").value = this.model.tagsyEditor.explanation;
        }


    }







}