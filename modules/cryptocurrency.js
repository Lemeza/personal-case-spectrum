"use strict";

module.exports = class Cryptocurrency {

  constructor(id, name, supply, protocol) {
    this._id = id;
    this._name = name;
    this._supply = supply;
    this._protocol = protocol;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get supply() {
    return this._supply;
  }

  get protocol() {
    return this._protocol;
  }

  set id(id) {
    this._id = id;
  }

  set name(name) {
    this._name = name;
  }

  set supply(supply) {
    return this._supply = supply;
  }

  set protocol(protocol) {
    return this._protocol = protocol;
  }
}
