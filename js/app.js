import {Model} from "./composents/model.mjs";
import {View} from "./composents/view.mjs";
import {Controller} from "./composents/controller.mjs";


const app = new Controller(new Model(), new View());

app.model.addAnswerQcm("je suis", true);
app.model.addAnswerShort("tu es");

console.table(app.model.qcmAnswers);
console.table(app.model.shortAnswers);

app.model.addAnswerQcm("jfhvlvhd", true);


