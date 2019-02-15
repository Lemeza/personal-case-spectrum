"use strict";

module.exports = class Exchange {

  constructor(id, name, country) {
    this._id = id;
    this._name = name;
    this._country = country;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get country() {
    return this._country;
  }

  set id(id) {
    this._id = id;
  }

  set name(name) {
    this._name = name;
  }

  set country(country) {
    this._country = country;
  }
}
