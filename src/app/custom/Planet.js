import { EventEmitter } from "eventemitter3";
import config from "../../config";
import utils from "../utils";
import Person from "./Person";

export default class Planet extends EventEmitter{
    constructor(name, config, peopleData){
        super();
        this.name = name;
        this.config = config;
        this.peopleData = peopleData // data for  first 10 ppl
        this.population = [];
    }

    static get events() {
        return {
            PERSON_BORN: "person_born",
            POPULATING_COMPLETE: "populating_complete"
        }
    }

    get populationCount() {
        return this.population.length;
    }

    async populate(){
        console.log(this.peopleData.length)
        if(this.peopleData.length === 0){
            this.emit(Planet.events.POPULATING_COMPLETE)
            return;
        }
        await utils.delay(config.populationDelay);
        const personData = this.peopleData.shift();
        const person = new Person(personData.name, personData.height, personData.mass)
        this.emit(Planet.events.PERSON_BORN, {filmUrls : personData.films})
        console.log(personData)
        await this.populate();
    }
}