/**************/
/*IMPORT MODEL*/
/**************/
import {Model} from "./composents/model.mjs";

/**************/
/*IMPORT VIEW*/
/**************/
import {View} from "./composents/view.mjs";
/********************/
/*IMPORT CONTROLLER*/
/*******************/
import {Controller} from "./composents/controller.mjs";


let app = new Controller(new Model(), new View());




