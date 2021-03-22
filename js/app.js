
import {Model} from "./composents/model.mjs";
import {View} from "./composents/view.mjs";
import {Controller} from "./composents/controller.mjs";
import {callLS, getTagsy, stopLS} from "./composents/API/LocalStorage.mjs";


let app = new Controller(new Model(), new View());

console.table(app.model.qcmAnswers);
console.table(app.model.shortAnswers);



