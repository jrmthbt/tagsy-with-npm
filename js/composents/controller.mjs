//MVC - controller
import {callSS, stopSS} from "./API/sessionStorage.mjs";
import {callLS, stopLS} from "./API/localStorage.mjs";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.countR = 1
        this.countG = 1
        this.countI = 1


        window.onload = () => {
            if (!that.model.tagsy.autoSave) {
                console.log("session")
                callSS()
                this.getStorage()
            } else {
                console.log("local")
                callLS()
                this.getStorage()
            }
        }

        document.querySelector("body").addEventListener("change", event => {
            if (event.target.id === this.view.exercice[0]) {
                this.model.bindChangeQcmAnswer(this.onChange)
                this.view.bindAddQcm(this.handleAddAnswer)
                this.view.binDelete(this.handleDeleteAnswer)
                this.view.binEditQcm(this.handleEditAnswer)
                this.onChange(this.model.qcmAnswers)
                this.clearTableShort()
                this.initCounter()
            }
            if (event.target.id === this.view.exercice[1]) {
                this.clearTableQcm();
                this.clearTableShort()
                this.initCounter()
            }
            if (event.target.id === this.view.exercice[2]) {
                this.model.bindChangeShortAnswer(this.onChangeShort)
                this.view.bindAddShort(this.handleAddShort)
                this.view.binDelete(this.handleDeleteShort)
                this.view.binEditShort(this.handleEditShort)
                this.onChangeShort(this.model.shortAnswers)
                this.clearTableQcm();
                this.initCounter()
            }

            if (event.target.id === "save-info") {
                if (event.target.checked) {
                    console.log("local actif")
                    const tagsy = JSON.parse(sessionStorage.getItem("tagsy")) || []
                    const question = JSON.parse(sessionStorage.getItem("questionCreated")) || []
                    const qcm = JSON.parse(sessionStorage.getItem("qcmAnswers")) || []
                    const short = JSON.parse(sessionStorage.getItem("shortAnswer")) || []
                    const editor = JSON.parse(sessionStorage.getItem("tagsyEditor")) || []
                    localStorage.setItem("tagsy", JSON.stringify(tagsy))
                    localStorage.setItem("qcmAnswers", JSON.stringify(qcm))
                    localStorage.setItem("shortAnswers", JSON.stringify(short))
                    localStorage.setItem("tagsyEditor", JSON.stringify(editor))
                    localStorage.setItem("questionCreated", JSON.stringify(question))
                    sessionStorage.clear()
                    this.model.qcmAnswers = JSON.parse(localStorage.getItem('qcmAnswers')) || [];
                    this.model.shortAnswers = JSON.parse(localStorage.getItem('shortAnswers')) || [];
                    this.model.tagsyEditor = JSON.parse(localStorage.getItem('tagsyEditor')) || [];
                    this.model.questionCreated = JSON.parse(localStorage.getItem("questionCreated")) || [];
                    this.model.tagsy = JSON.parse(localStorage.getItem('tagsy')) || [];
                    console.log(this.model.qcmAnswers, "qcm")
                    console.log(this.model.shortAnswers, "short")
                    console.log(this.model.tagsyEditor, "editor")
                    console.log(this.model.questionCreated, "question")
                    console.log(this.model.tagsy, "tagsy")
                    stopSS()
                    callLS()
                } else {
                    this.view._guizmoSpeak("Voulez-vous supprimer la sauvegarde automatique?")
                    document.getElementById("message").addEventListener("click", function confirmEditQuestion(el) {
                        if (el.target.classList.contains("btn-confirm")) {
                            that.view._removeguizmoSpeech()
                            const tagsy = JSON.parse(localStorage.getItem("tagsy")) || []
                            const question = JSON.parse(localStorage.getItem("questionCreated")) || []
                            const qcm = JSON.parse(localStorage.getItem("qcmAnswers")) || []
                            const short = JSON.parse(localStorage.getItem("shortAnswer")) || []
                            const editor = JSON.parse(localStorage.getItem("tagsyEditor")) || []
                            sessionStorage.setItem("tagsy", JSON.stringify(tagsy))
                            sessionStorage.setItem("questionCreated", JSON.stringify(question))
                            sessionStorage.setItem("qcmAnswers", JSON.stringify(qcm))
                            sessionStorage.setItem("shortAnswers", JSON.stringify(short))
                            sessionStorage.setItem("tagsyEditor", JSON.stringify(editor))
                            localStorage.clear()
                            that.model.qcmAnswers = JSON.parse(sessionStorage.getItem('qcmAnswers')) || [];
                            that.model.shortAnswers = JSON.parse(sessionStorage.getItem('shortAnswers')) || [];
                            that.model.tagsyEditor = JSON.parse(sessionStorage.getItem('tagsyEditor')) || [];
                            that.model.questionCreated = JSON.parse(sessionStorage.getItem("questionCreated")) || [];
                            that.model.tagsy = JSON.parse(sessionStorage.getItem('tagsy')) || [];
                            document.getElementById("save-info").checked

                            stopLS()
                            callSS()
                        }

                        if (el.target.classList.contains("btn-cancel")) {
                            that.view._removeguizmoSpeech()
                            that.view.getElement("#save-info").checked = "checked"
                        }
                    })

                }
            }


        })


        document.querySelector("body").addEventListener("mousedown", function (event) {

            if (event.target.id === "form-add") {
                that.initCounter()
                document.querySelectorAll("input[name=exercice]").forEach(radio => {
                    if (radio.checked) {
                        that.addQuestion()
                        document.querySelectorAll("input[type=text]").forEach(input => {
                        })

                    }
                })
            }

            if (event.target.classList.contains("delete-question")) {
                that.view.binDeleteQuestion(that.handleDeleteQuestion, event)
                that.view.getElement("#message").addEventListener("click", function confirmDel(el) {
                    if (el.target.classList.contains("btn-confirm")) {
                        that.displayQuestion()
                    }
                    that.view.getElement("#message").removeEventListener("click", confirmDel)
                })

            }

            if (event.target.classList.contains("edit-question")) {
                that.view.binEditQuestion(that.handleEditQuestion, event, that.model.questionCreated.slice(), that.displayQuestion)
                if (that.view._countClick > 2) {
                    that.displayQuestion()
                    that.view._countClick = 0
                }
                event.preventDefault()
            }


        })

        document.querySelector("#toolbars").addEventListener("click", function (event) {
            if (event.target.classList.contains("tools")) {
                if (event.target.id === "tool-undo") {
                    console.log("undo")
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")){
                        target = "question-name-edit"
                    }
                    that.view.undoAddTags(target)

                }
                if (event.target.id === "tool-redo") {
                    console.log("redo")
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")){
                        target = "question-name-edit"
                    }
                    that.view.redoAddTags(target)

                }
                if (event.target.id === "tool-tag-r") {
                    let RO = `[%R${that.countR}]`;
                    let RE = `[/%R${that.countR}]`;
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")){
                        target = "question-name-edit"
                    }
                    that.view.addTagsToText(target, RO, RE)
                    if (document.querySelector("#counter").checked){
                        that.countR++;
                    }
                }
                if (event.target.id === "tool-tag-g") {
                    console.log("tag-g")
                    let GO = `[%G${that.countG}]`;
                    let GE = `[/%G${that.countG}]`;
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")){
                        target = "question-name-edit"
                    }
                    that.view.addTagsToText(target, GO, GE)
                    if (document.querySelector("#counter").checked){
                        that.countG++;
                    }
                }
                if (event.target.id === "tool-tag-i") {
                    console.log("tag-i")
                    let IO = `[%I${that.countI}]`;
                    let IE = `[/%I${that.countI}]`;
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")){
                        target = "question-name-edit"
                    }
                    that.view.addTagsToText(target, IO, IE)
                    if (document.querySelector("#counter").checked){
                        that.countI++;
                    }
                }
                if (event.target.id === "tool-nothing") {
                    console.log("nothing")
                    if (document.getElementById("identification").checked) {
                        that.view.nothing("question-name")
                    }
                }
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

    displayQuestion = () => {
        this.model.bindChangeQuestion(this.onChangeQuestion)
        this.onChangeQuestion(this.model.questionCreated)
        this.onChangeQuestionTableQcm(this.model.questionCreated.slice())
        this.onChangeQuestionTableShort(this.model.questionCreated.slice())
    }
    // function pour afficher le tableau quand model est modifier
    onChange = (qcmAnswer) => {
        this.view.displayTableQcm(qcmAnswer);
    }
    onChangeShort = (shortAnswer) => {
        this.view.displayTableShort(shortAnswer);
    }

    onChangeQuestion = (getTagsy) => {
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
    handleEditShort = (id, answerText) => {
        this.model.editAnswerShort(id, answerText)
    }

    handleEditQuestion = (id, questionName, array, explanationCheck, explanation) => {
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
        this.view.getElement("#explication-text").value = "";
    }

    getStorage = () => {
        if (this.model.tagsyEditor !== [] && this.model.tagsy !== []) {
            let getSession = this.model.tagsyEditor
            let getTagsy = this.model.tagsy
            this.view.getElement("#qcm").checked = getSession.qcm ? "checked" : false
            this.view.getElement("#identification").checked = getSession.identification ? "checked" : false
            this.view.getElement("#short-answer").checked = getSession.shortAnswer ? "checked" : false
            this.view.getElement("#question-name").value = getSession.questionName ? getSession.questionName : ""
            this.view.getElement("#explication").checked = getSession.explanationCheck ? "checked" : false
            this.view.getElement("#explication-text").value = getSession.explanation

            this.view.getElement("#save-info").checked = getTagsy.autoSave ? "checked" : false
            this.view.getElement("#counter").checked = getTagsy.counterAuto ? "checked" : false
            this.view.getElement("#name-exercise").value = getTagsy.exerciseName ? getTagsy.exerciseName : ""


            if (this.view.getElement("#qcm").checked) {
                this.view.qcmTable(document.getElementById("root").id)
                this.view._lockExercice();
                this.view.displayTableQcm(this.model.qcmAnswers)
                this.model.bindChangeQcmAnswer(this.onChange)
                this.view.bindAddQcm(this.handleAddAnswer)
                this.view.binDelete(this.handleDeleteAnswer)
                this.view.binEditQcm(this.handleEditAnswer)
                this.onChange(this.model.qcmAnswers)

            }
            if (this.view.getElement("#identification").checked) {
                this.view._lockExercice();
            }
            if (this.view.getElement("#short-answer").checked) {
                this.view.answerTable(document.getElementById("root").id)
                this.view._lockExercice();
                this.view.displayTableShort(this.model.shortAnswers)
                this.model.bindChangeShortAnswer(this.onChangeShort)
                this.view.bindAddShort(this.handleAddShort)
                this.view.binDelete(this.handleDeleteShort)
                this.view.binEditShort(this.handleEditShort)
                this.onChangeShort(this.model.shortAnswers)
            }

            this.view.getElement("#explication").checked ?
                this.view._showDisplay(this.view.getElement("#explication-text")) :
                this.view._hideDisplay(this.view.getElement("#explication-text"))


        }
    }

    initCounter = () => {
        this.countR = 1
        this.countG = 1
        this.countI = 1
        if (document.getElementById("counter").checked){
            document.getElementById("counter").checked = false;
        }
        this.view._history = []
        this.view._redo = []
    }
}