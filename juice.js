"use strict";

class Juice {

  constructor(sets={}, combinations={}, models={}) {

    this.sets = sets;
    this.combinations = combinations;
    this.models = models;

  }

  random(chars, length) {

    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;

  }

  splitNumber(theNumber, segments) {

    let crumbs = [];
    let unit = Math.floor(theNumber / segments);
    let tail = theNumber - (unit * segments);

    for (let i = 0; i < segments; i++) {
      crumbs[i] = unit;
    }

    crumbs[crumbs.length - 1] += tail;
    return crumbs;

  }
  // CUMBS IS AN ARRAY CONTAINS THE VALUE OF DIGITS
  //WILL BE TAKEN FROM EACH SET AND
  //THE RIMINDER WILL BE ADDED TO THE LAST ONE

  generate(type, length) {

    let comb = this.combinations[type];
    if (comb) {
      let segments = comb.length;
      let crumbs = this.splitNumber(length, segments);
      let childRandoms = '';

      for (let i = 0; i < comb.length; i++) {

        let set = this.sets[comb[i]];
        if (set) {
          childRandoms += (this.random(set, crumbs[i]));
        } else {
          throw Error(`Unable to find set: ${comb[i]}`);
        }
      }
      return this.random(childRandoms, length);

    } else {

      throw Error(`Unable to find comb type: ${type}`);

    }

  }

  model(modelName){
    let model = this.models[modelName];
    let result = '';
    if(model){
      model.map((i)=>{

        switch(true){

          case (Object.prototype.toString.call(i)==='[object Object]'):
            let k = Object.keys(i)[0];
            result += this.generate(k, i[k]);
            break;
          case (typeof i === 'string'):
            result += i;
            break;
          case Array.isArray(i):
            result += i[Math.floor(Math.random() * i.length)].toString();
            break;
          default:
            throw Error(`Unable to process value ${i}`);

        }

      })
      return result;

    } else {
      throw Error(`Unable to find model name: ${modelName}`);
    }
  }

}


module.exports = Juice;
