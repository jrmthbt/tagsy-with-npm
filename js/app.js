
import {Model} from "./composents/model.mjs";
import {View} from "./composents/view.mjs";
import {Controller} from "./composents/controller.mjs";

let app = new Controller(new Model(), new View());



document.querySelectorAll(".tbody-app").forEach(table => {
    if(table.parentElement.classList.contains("tableQCM")) {
        console.log(table.parentElement.parentElement.id)
    }
})

/*app.model.getTagsy.forEach(question => {
    if(question.type === "QCM"){
        console.table(question.table)

    }
})*/