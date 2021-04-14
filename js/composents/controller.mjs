//MVC - controller
import {callSS, stopSS} from "./API/sessionStorage.mjs";
import {callLS, stopLS} from "./API/localStorage.mjs";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        window.onload =()=> {
            if (!that.view.getElement("#save-info").checked){
                callSS()
                console.log("session")

            }
            else{
                console.log("local")
                callLS()

                document.getElementById("save-info").checked = this.model.tagsy.autoSave
            }

        }
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

            if (event.target.id === "save-info"){
                if (event.target.checked){
                    console.log("local actif")
                    const tagsy = JSON.parse(sessionStorage.getItem("tagsy")) || []
                    const question = JSON.parse(sessionStorage.getItem("questionCreated")) || []
                    const qcm = JSON.parse(sessionStorage.getItem("qcmAnswers")) || []
                    const short = JSON.parse(sessionStorage.getItem("shortAnswer")) || []
                    const editor = JSON.parse(sessionStorage.getItem("tagsyEditor")) || []
                    localStorage.setItem("tagsy", JSON.stringify( tagsy))
                    localStorage.setItem("qcmAnswers", JSON.stringify(qcm))
                    localStorage.setItem("shortAnswers", JSON.stringify(short))
                    localStorage.setItem("tagsyEditor", JSON.stringify(editor))
                    localStorage.setItem("questionCreated", JSON.stringify(question))
                    sessionStorage.clear()
                    this.model.qcmAnswers = JSON.parse(localStorage.getItem('qcmAnswers')) || [];
                    this.model.shortAnswers = JSON.parse(localStorage.getItem('shortAnswers')) || [];
                    this.model.tagsyEditor = JSON.parse(localStorage.getItem('tagsyEditor')) || [];
                    this.model.questionCreated = JSON.parse(localStorage.getItem("questionCreated")) || [];
                    console.log(this.model.questionCreated)
                    this.model.tagsy = localStorage.getItem('tagsy') || [];
                    stopSS()
                    callLS()
                }
                else{
                    /*const tagsy = localStorage.getItem("tagsy") || []
                    const question = localStorage.getItem("questionCreated") || []
                    const qcm = localStorage.getItem("qcmAnswers") || []
                    const short = localStorage.getItem("shortAnswer") || []
                    const editor = localStorage.getItem("tagsyEditor") || []
                    sessionStorage.setItem("tagsy", tagsy)
                    sessionStorage.setItem("questionCreated", question)
                    sessionStorage.setItem("qcmAnswers", qcm)
                    sessionStorage.setItem("shortAnswers", short)
                    sessionStorage.setItem("tagsyEditor", editor)
                    localStorage.clear()
                    this.model.qcmAnswers = sessionStorage.getItem('qcmAnswers') || [];
                    this.model.shortAnswers = sessionStorage.getItem('shortAnswers') || [];
                    this.model.tagsyEditor = sessionStorage.getItem('tagsyEditor') || [];
                    this.model.questionCreated = sessionStorage.getItem("questionCreated") || [];
                    this.model.tagsy =sessionStorage.getItem('tagsy') || [];
                     */
                    stopLS()
                    callSS()
                }
            }


        })



        document.querySelector("body").addEventListener("mousedown", function (event) {

            if (event.target.id === "form-add") {
                document.querySelectorAll("input[name=exercice]").forEach(radio =>{
                    if(radio.checked){
                        that.addQuestion()
                        document.querySelectorAll("input[type=text]").forEach(input =>{
                        })

                    }
                })
            }

            if (event.target.classList.contains("delete-question")) {
                that.view.binDeleteQuestion(that.handleDeleteQuestion, event)
                that.view.getElement("#message").addEventListener("click", function confirmDel (el) {
                    if (el.target.classList.contains("btn-confirm")){
                       that.displayQuestion()
                    }
                    that.view.getElement("#message").removeEventListener("click",confirmDel)
                })

            }

            if (event.target.classList.contains("edit-question")){
                that.view.binEditQuestion(that.handleEditQuestion, event, that.model.questionCreated.slice(), that.displayQuestion)
                if(that.view._countClick >2){
                    that.displayQuestion()
                    that.view._countClick = 0
                }
            event.preventDefault()
            }


        })


        this.displayQuestion()





    let that = this;

    }

    addQuestion = () => {
        this.handleAddQuestion()
        this.clearEditor()
        this.clearTableShort()
        this.clearTableQcm()
        this.model.bindChangeQuestion(this.onChangeQuestion)
        this.onChangeQuestion(this.model.questionCreated)
        this.onChangeQuestionTableQcm(this.model.questionCreated.slice())
        this.onChangeQuestionTableShort(this.model.questionCreated.slice())
    }

    displayQuestion =() => {
        this.model.bindChangeQuestion(this.onChangeQuestion)
        console.log(this.model.questionCreated)
        this.onChangeQuestion(this.model.questionCreated)
        this.onChangeQuestionTableQcm(this.model.questionCreated.slice())
        this.onChangeQuestionTableShort(this.model.questionCreated.slice())
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
    }
    // controller qui edit le model
    handleEditAnswer = (id, answerText, answerCheck) => {
        this.model.editAnswerQcm(id, answerText, answerCheck)

    }
    handleEditShort = (id, answerText) =>{
        this.model.editAnswerShort(id, answerText)
    }

    handleEditQuestion = (id, questionName, array, explanationCheck, explanation) =>{
        this.model.editQuestion(id, questionName, array, explanationCheck, explanation)
    }
    // controller qui supprime dans le model
    handleDeleteAnswer = (id) => {
        this.model.deleteAnswerQcm(id)
    }

    handleDeleteShort = (id) => {
        this.model.deleteAnswerShort(id)
    }

    handleDeleteQuestion = (id) => {
        this.model.deleteQuestion(id)
    }


    clearTableQcm = () => {
        this.model.qcmAnswers = [];
        localStorage.removeItem("qcmAnswers")

    }
    clearTableShort = () => {
        this.model.shortAnswers = [];
       localStorage.removeItem("shortAnswers")
    }

    clearEditor = () => {
        this.view._unlockExercice()
        this.view.getElement("#explication").checked = false;
        this.view.getElement("#explication-text").value= "";
    }
}