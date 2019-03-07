"use strict";

const mysql = require('mysql');

module.exports = class Cryptocurrency {

  constructor() {
    this.connection = mysql.createConnection({
      multipleStatements: true,
      host: 'localhost',
      user: 'nick',
      password: 'nick2018!',
      database: 'personalcase'
    });

    this.connection.connect(function(err) {
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

  findAll() {
    return new Promise((resolve, reject) => {
      this.connection.query("select * from cryptocurrency", function(error, rows) {
        if (!error) {
          resolve(rows);
        } else {
          reject(error);
        }
      });
    });
  }

  removeAll() {
    return new Promise((resolve, reject) => {
      this.connection.query("SET FOREIGN_KEY_CHECKS = 0; truncate table cryptocurrency; SET FOREIGN_KEY_CHECKS = 1", (error, result) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query("select * from cryptocurrency where id='?'", [id], (error, rows) => {
        if (!error) {
          let crypto = rows[0];
          if (crypto) {
            resolve(crypto);
          } else {
            reject(404);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  update(id, cryptoName, cryptoSupply, cryptoProtocol) {
    let name = cryptoName;
    let supply = cryptoSupply;
    let protocol = cryptoProtocol;
    return new Promise((resolve, reject) => {
      this.connection.query("update cryptocurrency set name = ?, supply = ?, protocol = ? where id ='?'", [name, supply, protocol, id], (error, result) => {
        if (!error) {
          resolve(result.affectedRows === 1)
        } else {
          reject(false);
        }
      });
    });
  }

  deleteById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query("delete from cryptocurrency where id='?'", id, function(error, result) {
        if (!error) {
          resolve(result.affectedRows === 1);
        } else {
          reject(false);
        }
      });
    });
  }
}
