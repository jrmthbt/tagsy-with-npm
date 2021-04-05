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
        })


            this.model.bindChangeQuestion(this.onChangeQuestion)
            this.onChangeQuestion(this.model.questionCreated)
            this.onChangeQuestionTableQcm(this.model.questionCreated.slice())
            this.onChangeQuestionTableShort(this.model.questionCreated.slice())



    let that = this;
        if (document.getElementById("save-info").checked === true){
            callLS();

        }else{
            document.getElementById("save-info").addEventListener("change", function(){
                if (this.checked){
                    callLS();
                }else if(this.checked === false){
                    that.view._guizmoSpeak("Voulez-vous désactiver la sauvegarde auto et perdre les données sauvées?");
                    let these = that;
                    document.getElementById("message").addEventListener("click", function confirmDisable(event){
                        if (event.target.classList.contains("btn-confirm")){
                            stopLS();
                            localStorage.clear()
                            these.view._removeguizmoSpeech();
                        }
                        if (event.target.classList.contains("btn-cancel")){
                            these.view._removeguizmoSpeech();
                            document.getElementById("save-info").checked = "checked";
                            callLS();
                        }
                    })
                }
            })
        }


        if (localStorage !== null){
            document.body.onload = function (){
               that._getDataSaved();
               if (document.getElementById("save-info").checked){
                    callLS();
                }
                if (document.getElementById("qcm").checked){
                    that.view._lockExercice();
                    that.view.qcmTable(document.getElementById("root").id);
                    that.model.bindChangeQcmAnswer(that.onChange)
                    that.view.bindAddQcm(that.handleAddAnswer)
                    that.view.binDelete(that.handleDeleteAnswer)
                    that.view.binEditQcm(that.handleEditAnswer)
                    that.onChange(that.model.qcmAnswers)
                    that.clearTableShort()
                }
                if (document.getElementById("identification").checked){
                    that.clearTableQcm();
                    that.clearTableShort()
                }

                if (document.getElementById("short-answer").checked){
                    that.view._lockExercice();
                    that.view.answerTable(document.getElementById("root").id);
                    that.model.bindChangeShortAnswer(that.onChangeShort)
                    that.view.bindAddShort(that.handleAddShort)
                    that.view.binDelete(that.handleDeleteShort)
                    that.view.binEditShort(that.handleEditShort)
                    that.onChangeShort(that.model.shortAnswers)
                    that.clearTableQcm();
                }
            };


        }



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

    _render(){
        localStorage.removeItem("tagsyEditor");
    }






}