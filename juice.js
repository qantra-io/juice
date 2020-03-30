"use strict";

class Juice {

  constructor(sets, combos) {

    this.sets = sets;
    this.combos = combos;

  }

  random(chars, length) {

    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;

  }

  /**
  @param { Number } theNumber a number that want to be splited to more than segment
  for example for split 10 for 3 segment you will get array of [3,3,4] making a total of 10
  @param { Number } segments the number of segments that needs to be outputed

  @return { [ Number ] } an array of segments example splitNumber(100,7)
  will output [ 14, 14, 14, 14, 14, 14, 16 ]
  */
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

  generate(type, length) {

    let compo = this.combos[type];
    if (compo) {

      let segments = compo.length;
      let crumbs = this.splitNumber(length, segments);
      let childRandoms = '';

      for (let i = 0; i < compo.length; i++) {

        let set = this.sets[compo[i]];

        if (set) {
          childRandoms += (this.random(set, crumbs[i]));
        } else {
          throw Error(`Unable to find set: ${compo[i]}`);
        }

      }

      return this.random(childRandoms, length);

    } else {

      throw Error(`Unable to find compo type: ${type}`);

    }

  }

}


module.exports = Juice;
