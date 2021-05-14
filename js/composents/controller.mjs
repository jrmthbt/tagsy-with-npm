/********************/
/* MVC - CONTROLLER*/
/*******************/

// IMPORT FUNCTION TO SAVE IN SESSION OR LOCAL STORAGE
import {callSS, stopSS} from "./API/sessionStorage.mjs";
import {callLS, stopLS} from "./API/localStorage.mjs";

export class Controller {
    constructor(model, view) {

        // CALL MODEL
        this.model = model;
        //CALL VIEW
        this.view = view;
        //COUNTER FOR TAG R
        this.countR = 1
        //COUNTER FOR TAG G
        this.countG = 1
        //COUNTER FOR TAG I
        this.countI = 1

        this.clickR = 1
        this.clickG = 2
        this.clickI = 3
        this.historyClick = []
        this.redoClick = []


        // WHEN WINDOW RELOAD
        window.onload = () => {
            // CHECK IF AUTO SAVE IS ON OR NOT
            if (!that.model.tagsy.autoSave) {
                // IF NOT CALL SESSION STORAGE
                console.log("session")
                callSS()
                this.getStorage()
            } else {
                //ELSE CALL LOCAL STORAGE
                console.log("local")
                callLS()
                this.getStorage()
            }

        }
// EVENT LISTENER CHANGE
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

            if (event.target.id === "counter") {
                if (!event.target.checked) {
                    this.countR = 1
                    this.countG = 1
                    this.countI = 1
                    document.getElementById("r").innerHTML = `Ajout [%R${that.countR}][/%R${that.countR}]`
                    document.getElementById("g").innerHTML = `Ajout [%G${that.countG}][/%G${that.countG}]`
                    document.getElementById("i").innerHTML = `Ajout [%I${that.countI}][/%I${that.countI}]`
                }
            }

            if (event.target.id === "save-info") {
                //CHANGE FROM SESSION TO LOCAL STORAGE
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
                    //   CHANGE FROM LOCAL TO SESSION STORAGE WITH A CONFIRMATION
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
// ADD A QUESTION
            if (event.target.id === "form-add") {
                that.initCounter()

                if (document.getElementById("identification").checked && document.getElementById("question-name").value !== "" || undefined) {

                    that.addQuestion()

                } else if (document.getElementById("qcm").checked && document.getElementById("question-name").value !== "" && document.getElementById("tbody-root").childElementCount > 0) {
                    that.addQuestion()
                } else if (document.getElementById("short-answer").checked && document.getElementById("question-name").value !== "" && document.getElementById("tbody-root").childElementCount > 0) {
                    that.addQuestion()
                } else {
                    that.view.guizmoAlert("Remplissez tous les champs pour créer la question, (si QCM ou réponse courte, remplir le tableau aussi)!")
                }

            }
// DELETE A QUESTION
            if (event.target.classList.contains("delete-question")) {
                that.view.binDeleteQuestion(that.handleDeleteQuestion, event)
                that.view.getElement("#message").addEventListener("click", function confirmDel(el) {
                    if (el.target.classList.contains("btn-confirm")) {
                        that.displayQuestion()
                        if (that.view.getElement("#questions").childElementCount === 0) {
                            that.view._showDisplay(document.getElementById("change"))

                        }
                    }
                    that.view.getElement("#message").removeEventListener("click", confirmDel)
                })

            }
// EDIT A QUESTION
            if (event.target.classList.contains("edit-question")) {
                that.view.binEditQuestion(that.handleEditQuestion, event, that.model.questionCreated.slice(), that.displayQuestion)
                if (that.view._countClick > 2) {
                    that.displayQuestion()
                    that.view._countClick = 0
                }
                event.preventDefault()
            }


            // initialize TAGSY

            if (event.target.classList.contains("init")) {
                that.view._guizmoSpeak("Voulez-vous réinitialiser TAGSY? Vous perdrez TOUTES vos données")
                document.getElementById("message").addEventListener("click", function confirmInit(el) {

                    if (el.target.classList.contains("btn-confirm")) {
                        that.initAll()
                        that.view._removeguizmoSpeech()
                        this.removeEventListener("click", confirmInit)
                    }
                    if (el.target.classList.contains("btn-cancel")) {
                        that.view._removeguizmoSpeech()
                        this.removeEventListener("click", confirmInit)
                    }

                })
            }


        })
        document.querySelector("#toolbars").addEventListener("click", function (event) {
            if (event.target.classList.contains("tools")) {
                if (event.target.id === "tool-undo") {
                    //CALL TO UNDO
                    console.log("undo")
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")) {
                        target = "question-name-edit"
                    }
                    that.view.undoAddTags(target)
                    that.undoTags()
                    console.log(that.view._history)
                    //console.log(that.historyClick)

                }
                if (event.target.id === "tool-redo") {
                    console.log("redo")
                    // CALL TO REDO
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")) {
                        target = "question-name-edit"
                    }

                    that.view.redoAddTags(target)
                    that.redoTags()
                    if (that.view.getElement("#counter").checked) {
                        if (that.view._redo.length > 0) {
                            document.getElementById("r").innerHTML = `Ajout [%R${that.countR}][/%R${that.countR}]`
                        }
                    }
                    console.log(that.view._history)
                    console.log(that.historyClick)
                }
                if (event.target.id === "tool-tag-r") {
                    that.historyClick.push(that.clickR)
                    if (that.historyClick.length > 10) {
                        that.historyClick.shift()
                    }

                    // CALL TO TAG R
                    let RO = `[%R${that.countR}]`;
                    let RE = `[/%R${that.countR}]`;
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")) {
                        target = "question-name-edit"
                    }
                    let elem = document.querySelector("#question-name");
                    if (elem.value.length === 0) {
                        that.view._history.push(elem.value.length === 0 ? "" : elem.value)
                        if (that.view._history.length > 10) {
                            that.view._history.shift()
                        }
                        that.view.addTagsToText(target, RO, RE)
                        elem.selectionStart = RO.length + 1
                        elem.selectionEnd = RE.length - 1
                        elem.focus()
                    } else {
                        that.view._history.push(elem.value.length === 0 ? "" : elem.value)
                        if (that.view._history.length > 10) {
                            that.view._history.shift()
                        }
                        that.view.addTagsToText(target, RO, RE)
                        elem.selectionStart = elem.value.length + RE.length
                        elem.selectionEnd = elem.value.length - RE.length
                        elem.focus()
                    }

                    if (document.querySelector("#counter").checked) {
                        that.countR++;
                        document.getElementById("r").innerHTML = `Ajout [%R${that.countR}][/%R${that.countR}]`
                    } else {
                        that.countR = 1;
                        document.getElementById("r").innerHTML = `Ajout [%R${that.countR}][/%R${that.countR}]`
                    }
                    console.log(that.historyClick)
                    console.log(that.view._history)
                }
                if (event.target.id === "tool-tag-g") {
                    that.historyClick.push(that.clickG)
                    if (that.historyClick.length > 10) {
                        that.historyClick.shift()
                    }

                    // CALL TO TAG G
                    console.log("tag-g")
                    let GO = `[%G${that.countG}]`;
                    let GE = `[/%G${that.countG}]`;
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")) {
                        target = "question-name-edit"
                    }
                    let elem = document.querySelector("#question-name");
                    if (elem.value.length === 0) {
                        that.view._history.push(elem.value.length === 0 ? "" : elem.value)
                        if (that.view._history.length > 10) {
                            that.view._history.shift()
                        }
                        that.view.addTagsToText(target, GO, GE)
                        elem.selectionStart = GO.length + 1
                        elem.selectionEnd = GE.length - 1
                        elem.focus()
                    } else {

                        that.view._history.push(elem.value.length === 0 ? "" : elem.value)
                        if (that.view._history.length > 10) {
                            that.view._history.shift()
                        }
                        that.view.addTagsToText(target, GO, GE)
                        elem.selectionStart = elem.value.length + GE.length
                        elem.selectionEnd = elem.value.length - GE.length
                        elem.focus()
                    }
                    if (document.querySelector("#counter").checked) {
                        that.countG++;
                        document.getElementById("g").innerHTML = `Ajout [%G${that.countG}][/%G${that.countG}]`
                    } else {
                        that.countG = 1
                        document.getElementById("g").innerHTML = `Ajout [%G${that.countG}][/%G${that.countG}]`
                    }
                    console.log(that.historyClick)
                    console.log(that.view._history)
                }
                if (event.target.id === "tool-tag-i") {
                    that.historyClick.push(that.clickI)
                    console.log(that.view._history)
                    if (that.historyClick.length > 10) {
                        that.historyClick.shift()
                    }
                    console.log(that.historyClick)
                    console.log("tag-i")
                    // CALL TO TAG I
                    let IO = `[%I${that.countI}]`;
                    let IE = `[/%I${that.countI}]`;
                    let target = "question-name"
                    if (document.getElementById("question-name-edit")) {
                        target = "question-name-edit"
                    }
                    let elem = document.querySelector("#question-name");
                    if (elem.value.length === 0) {
                        that.view._history.push(elem.value.length === 0 ? "" : elem.value)
                        if (that.view._history.length > 10) {
                            that.view._history.shift()
                        }
                        that.view.addTagsToText(target, IO, IE)
                        elem.selectionStart = elem.value.length + IE.length
                        elem.selectionEnd = elem.value.length - IE.length
                        elem.focus()
                    } else {

                        that.view._history.push(elem.value.length === 0 ? "" : elem.value)
                        if (that.view._history.length > 10) {
                            that.view._history.shift()
                        }

                        that.view.addTagsToText(target, IO, IE)
                        elem.selectionStart = elem.value.length
                        elem.selectionEnd = elem.value.length
                        elem.focus()
                    }
                    if (document.querySelector("#counter").checked) {
                        that.countI++;
                        document.getElementById("i").innerHTML = `Ajout [%I${that.countI}][/%I${that.countI}]`
                    } else {
                        that.countI = 1
                        document.getElementById("i").innerHTML = `Ajout [%I${that.countI}][/%I${that.countI}]`
                    }
                    console.log(that.historyClick)
                    console.log(that.view._history)
                }
                if (event.target.id === "tool-nothing") {
                    // CALL FOR SPAN AUCUN
                    console.log("nothing")
                    if (document.getElementById("identification").checked) {
                        that.view.nothing("question-name")
                    }
                }

            }
        })
// GENERATE A JSON FILE
        document.body.addEventListener("click", event => {
            if (event.target.classList.contains("generate")) {
                if (this.view.getElement("#name-exercise").value !== "" && document.getElementById("questions").childElementCount > 0) {
                    this.view._guizmoSpeak("Voulez-vous générer votre exercice ?")
                    let that = this
                    document.getElementById("message").addEventListener("click", function confirmEdit(el) {

                        if (el.target.classList.contains("btn-confirm")) {
                            that.download()
                            that.view._removeguizmoSpeech()
                            this.removeEventListener("click", confirmEdit)
                        }
                        if (el.target.classList.contains("btn-cancel")) {
                            that.view._removeguizmoSpeech()
                            this.removeEventListener("click", confirmEdit)
                        }

                    })
                } else {
                    that.view.guizmoAlert("Veuillez entrez le nom de l'exercice et créer des questions pour générer un exercice!");
                }
            }
        })

        // DISPLAY THE QUESTION CREATED
        this.displayQuestion()


        let that = this;

    }

// DISPLAY WHEN ADD QUESTION
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
    // function DISPLAY WHEN MODEL HAS BEEN CHANGE
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
    // ADD IN MODEL
    handleAddAnswer = (answerText, answerCheck) => {
        this.model.addAnswerQcm(answerText, answerCheck)
    }
    handleAddShort = (answerText) => {
        this.model.addAnswerShort(answerText)
    }

    handleAddQuestion = () => {
        this.model.addQuestion()
    }
    // EDIT IN MODEL
    handleEditAnswer = (id, answerText, answerCheck) => {
        this.model.editAnswerQcm(id, answerText, answerCheck)

    }
    handleEditShort = (id, answerText) => {
        this.model.editAnswerShort(id, answerText)
    }

    handleEditQuestion = (id, questionName, array, explanationCheck, explanation) => {
        this.model.editQuestion(id, questionName, array, explanationCheck, explanation)
    }
    // DEL IN MODEL
    handleDeleteAnswer = (id) => {
        this.model.deleteAnswerQcm(id)
    }

    handleDeleteShort = (id) => {
        this.model.deleteAnswerShort(id)
    }

    handleDeleteQuestion = (id) => {
        this.model.deleteQuestion(id)
    }

// INIT TABLE AND EDITOR
    clearTableQcm = () => {
        this.model.qcmAnswers = [];
        localStorage.removeItem("qcmAnswers")

    }
    clearTableShort = () => {
        this.model.shortAnswers = [];
        localStorage.removeItem("shortAnswers")
    }

    clearEditor = () => {
        this.view.getElement("#question-name").value = ""
        this.view.getElement("#change").classList.add("display-none")
        this.view.getElement("#explication").checked = false;
        this.view.getElement("#explication-text").value = "";
        if (this.view.getElement("#qcm").checked) {
            this.clearTableQcm()
            this.view.displayTableQcm(this.model.qcmAnswers)
        }
        if (this.view.getElement("#short-answer").checked) {
            this.clearTableShort()
            this.view.displayTableShort(this.model.shortAnswers)
        }
    }

    // GET FROM STORAGE
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
                if (this.view.getElement("#questions").childElementCount === 0){
                    this.view._showDisplay(this.view.getElement("#change"))
                }
                else {
                    this.view._hideDisplay(this.view.getElement("#change"))
                }
                this.view.qcmTable(document.getElementById("root").id)
                this.view._lockExercice();
                this.view.displayTableQcm(this.model.qcmAnswers)
                this.model.bindChangeQcmAnswer(this.onChange)
                this.view.bindAddQcm(this.handleAddAnswer)
                this.view.binDelete(this.handleDeleteAnswer)
                this.view.binEditQcm(this.handleEditAnswer)
                this.onChange(this.model.qcmAnswers)
                this.view.getElement("#tool-nothing").disabled= true
                this.view.getElement("#tool-nothing").style.color = "grey"

            }
            if (this.view.getElement("#identification").checked) {
                if (this.view.getElement("#questions").childElementCount === 0){
                    this.view._showDisplay(this.view.getElement("#change"))
                }
                else {
                    this.view._hideDisplay(this.view.getElement("#change"))
                }
                this.view._lockExercice();
            }
            if (this.view.getElement("#short-answer").checked) {
                if (this.view.getElement("#questions").childElementCount === 0){
                    this.view._showDisplay(this.view.getElement("#change"))
                }
                else {
                    this.view._hideDisplay(this.view.getElement("#change"))
                }
                this.view.answerTable(document.getElementById("root").id)
                this.view._lockExercice();
                this.view.displayTableShort(this.model.shortAnswers)
                this.model.bindChangeShortAnswer(this.onChangeShort)
                this.view.bindAddShort(this.handleAddShort)
                this.view.binDelete(this.handleDeleteShort)
                this.view.binEditShort(this.handleEditShort)
                this.onChangeShort(this.model.shortAnswers)
                this.view.getElement("#tool-nothing").disabled= true
                this.view.getElement("#tool-nothing").style.color = "grey"
            }

            this.view.getElement("#explication").checked ?
                this.view._showDisplay(this.view.getElement("#explication-text")) :
                this.view._hideDisplay(this.view.getElement("#explication-text"))


        }
    }

    // INIT COUNTER TAG
    initCounter = () => {
        this.countR = 1
        this.countG = 1
        this.countI = 1
        this.view._history = []
        this.view._redo = []
    }

    // GENERATE A JSON FILE

    download = () => {
        let tagsyQuestion = JSON.parse(sessionStorage.getItem("questionCreated")) || JSON.parse(localStorage.getItem("questionCreated"))

        let tagsy = JSON.parse(sessionStorage.getItem("tagsy")) || JSON.parse(localStorage.getItem("tagsy"))
        console.log(tagsyQuestion, "question")

        let json = {
            "id": "TODO",
            "topic": "TODO",
            "category": "TODO",
            "engine": "",
            "rules": [""],
            "description": {
                "long": "TODO",
                "medium": "TODO",
                "short": "TODO"
            },
            "wrapper": "ul",
            "intro": "TODO",
            "objective": tagsy.exerciseName,
            "debrief": "TODO",
            "help": "<h2>Comment gagner&nbsp;?</h2><ul><li>Cliquez sur un verbe pour afficher le formulaire de réponse puis entrez cette dernière. Cliquez à nouveau pour modifier la réponse.</li><li>Quand vous avez terminé, enfoncez joyeusement le bouton «&nbsp;J’ai fini&nbsp;!&nbsp;» pour connaître votre résultat.</li></ul><h2>Bon à savoir…</h2><ul><li>Il faut créer ou sélectionner un profil avant de commencer à faire un exercice si vous voulez sauvegarder le résultat dans votre suivi de progression.</li><li>Quitter l’exercice en cours efface les réponses déjà entrées.</li></ul>",
            "fragments": [],
        }
        let i = 0
        let k = 1


        tagsyQuestion.forEach(answer => {
            let choix = [];
            let good = [];
            let shortAnswer = [];
            let questions = []
            if (answer.type === "QCM") {
                json.engine = "MCQ"


                answer.table.forEach(val => {

                    let choice = {
                        "id": val.id,
                        "value": val.choix
                    }
                    console.log(choice)
                    choix.push(choice)

                    if (val.goodAnswer !== false) {
                        let j = 0
                        let ans = {
                            "id": (j) - good.length + (good.length + 1),
                            "value": val.id

                        }
                        j++
                        good.push(ans)
                    }


                })

                let quest = {
                    "id": k,
                    "format": "big",
                    "choices": choix,
                    "answers": good,
                    "clue": answer.explication !== "" ? answer.explication : "",

                }
                k++
                questions.push(quest)


                console.log(i, "avant incrément")
                console.log(choix)
                i++
                let question = {
                    "id": i.toString(),
                    "text": answer.enonce,
                    "questions": questions,

                }

                json.fragments.push(question)
            }
            if (answer.type === "Identification") {
                json.engine = "FIT"
                i++

                let question = {
                    "id": i,
                    "text": answer.enonce,
                    "clue": answer.explication
                }

                json.fragments.push(question)
            }

            if (answer.type === "Réponse courte") {
                console.log("short")
                json.engine = "FTB"

                answer.table.forEach(val => {

                    let short = {
                        "id": val.id,
                        "value": val.answer
                    }

                    shortAnswer.push(short)


                })


                let quest = {
                    "id": k,
                    "format": "big",
                    "answers": shortAnswer,
                    "clue": answer.explication !== "" ? answer.explication : "",

                }
                questions.push(quest)

                i++
                let question = {
                    "id": i.toString(),
                    "text": answer.enonce,
                    "questions": questions,

                }

                json.fragments.push(question)
            }
        })


        console.log(json)

// generate MCQ exercise
        if (json.engine === "MCQ") {
            console.log("generate MCQ")

            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
            let dlElem = this.view.getElement("a.generate");
            dlElem.setAttribute("href", dataStr)
            dlElem.setAttribute("download", `${json.engine}.json`)
            dlElem.click()
            dlElem.removeAttribute("href")
            dlElem.removeAttribute("download")
        }
// generate FIT exercise
        else if (json.engine === "FIT") {
            console.log("generate FIT")
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
            let dlElem = this.view.getElement("a.generate");
            dlElem.setAttribute("href", dataStr)
            dlElem.setAttribute("download", `${json.engine}.json`)
            dlElem.click()
            dlElem.removeAttribute("href")
            dlElem.removeAttribute("download")

        }
// generate FTB exercise
        else if (json.engine === "FTB") {
            console.log("generate FTB")
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json))
            let dlElem = this.view.getElement("a.generate");
            dlElem.setAttribute("href", dataStr)
            dlElem.setAttribute("download", `${json.engine}.json`)
            dlElem.click()
            dlElem.removeAttribute("href")
            dlElem.removeAttribute("download")
        }


    }


    // reinit all when exercise is generated
    initAll = () => {
        while (document.getElementById("questions").firstChild) {
            document.getElementById("questions").removeChild(document.getElementById("questions").firstChild)
        }
        this.countR = 1;
        this.countG = 1;
        this.countI = 1;
        localStorage.clear()
        sessionStorage.clear()
        document.querySelectorAll("input[type=text]").forEach(text => {
            text.value = ""
        })
        document.querySelectorAll("input[type=checkbox]").forEach(check => {
            check.checked = false
        })
        document.querySelectorAll("input[type=radio]").forEach(check => {
            check.checked = false, check.disabled = false
        })
        document.querySelector("#change").classList.add("display-none");
        this.model.questionCreated = []
        this.model.tagsyEditor = []
        this.model.qcmAnswers = []
        this.model.shortAnswers = []
        this.model.tagsy = []
        this.historyClick = []
        this.redoClick = []
        this.view._history = []
        this.view._redo = []
        document.getElementById("nbr-question").innerHTML = `Nombre de questions : ${document.getElementById("questions").childElementCount}`
        document.getElementById("r").innerHTML = `Ajout [%R${this.countR}][/%R${this.countR}]`
        document.getElementById("g").innerHTML = `Ajout [%G${this.countG}][/%G${this.countG}]`
        document.getElementById("i").innerHTML = `Ajout [%I${this.countI}][/%I${this.countI}]`
        this.clearEditor()
        while (document.getElementById("root").firstChild) {
            document.getElementById("root").removeChild(document.getElementById("root").firstChild)
        }
    }

    undoTags() {

        this.deIncrementTag()


        if (this.historyClick.length !== 0) {
            this.redoClick.push(this.historyClick.pop())

            if (this.redoClick.length > 10) {
                this.redoClick.shift()
            }

        }


    }

// REDO FUNCTION MAX 10 ELEMENTS
    redoTags() {
        this.IncrementTag()
        if (this.redoClick.length !== 0) {
            this.historyClick.push(this.redoClick.pop())

            if (this.historyClick.length > 10) {
                this.historyClick.shift()
            }
            console.log(this.historyClick, "redo", 'history')
            console.log(this.redoClick, "redo", "redo")
        }
    }

    deIncrementTag = () => {
        if (this.view.getElement("#counter").checked) {

            if (this.historyClick[this.historyClick.length - 1] === 1) {
                if (this.historyClick !== []) {
                    this.countR--
                    console.log(this.countR, "--")
                    document.getElementById("r").innerHTML = `Ajout [%R${this.countR}][/%R${this.countR}]`
                }

            }

            if (this.historyClick[this.historyClick.length-1] === 2) {
                console.log(this.countG)
                if (this.historyClick !== []) {
                    this.countG--
                    document.getElementById("g").innerHTML = `Ajout [%G${this.countG}][/%G${this.countG}]`
                }
            }

            if (this.historyClick[this.historyClick.length-1] === 3) {
                if (this.historyClick !== []) {
                    this.countI--
                    document.getElementById("i").innerHTML = `Ajout [%I${this.countI}][/%I${this.countI}]`
                }
            }

        }
    }

    IncrementTag = () => {
        if (this.view.getElement("#counter").checked) {

            if (this.redoClick[this.redoClick.length - 1] === 1) {
                if (this.redoClick !== []) {
                    this.countR++
                    console.log(this.countR, "++")
                    document.getElementById("r").innerHTML = `Ajout [%R${this.countR}][/%R${this.countR}]`
                }

            }

            if (this.redoClick[this.redoClick.length - 1] === 2) {
                if (this.redoClick !== []) {
                    this.countG++
                    console.log(this.countG, "++")
                    document.getElementById("g").innerHTML = `Ajout [%G${this.countG}][/%G${this.countG}]`
                }

            }

            if (this.redoClick[this.redoClick.length - 1] === 1) {
                if (this.redoClick !== []) {
                    this.countI++
                    console.log(this.countI, "++")
                    document.getElementById("i").innerHTML = `Ajout [%I${this.countI}][/%I${this.countI}]`
                }

            }
        }

    }
}