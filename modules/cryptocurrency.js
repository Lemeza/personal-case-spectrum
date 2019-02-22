"use strict";

const mysql = require('mysql');

module.exports = class Cryptocurrency {

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'nick',
      password: 'nick2018!',
      database: 'personalcase'
    });

    this.connection.connect(function (err) {
      if (err) {
        throw err;
      } else {
        console.log(`Connected!`);
      }
    });
  }

  stop() {
    this.connection.end(function() {
      console.log("Disconnected");
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }

  insert(cryptocurrency) {
    return new Promise((resolve, reject) => {
      this.connection.query("insert into cryptocurrency set ?", [cryptocurrency], (err, result) => {
        if (!err) {
          cryptocurrency.id = result.insertId;
          resolve(cryptocurrency);
        } else {
          reject(err);
        }
      });
    });
  }

  createCrypto(name, supply, protocol) {
    let crypto = {
      name: name,
      supply: supply,
      protocol: protocol
    }
    return this.insert(crypto);
  }

}
