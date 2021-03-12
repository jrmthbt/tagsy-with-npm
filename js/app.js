import {Model} from "./composents/model.mjs";
import {View} from "./composents/view.mjs";
import {Controller} from "./composents/controller.mjs";


let app = new Controller(new Model(), new View());


app.model.addAnswerQcm("nous sommes", "checked");
console.table(app.model.qcmAnswers)
