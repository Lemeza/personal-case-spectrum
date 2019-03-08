"use strict";

const mysql = require('mysql');
let express = require('express');
let http = require('http');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nick',
    password: 'nick2018!',
    database: 'personalcase'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log(`Connected!`);
    }
});

app.get('/api/cryptocurrency', (req, res) => {
    connection.query('SELECT * FROM cryptocurrency', (err, cryptocurrency) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(cryptocurrency));
        } else {
            throw err;
        }
    });
});

app.get('/api/cryptocurrency/:id', (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM cryptocurrency WHERE id = ?', id, (err, rows) => {
        if (!err) {
            let cryptocurrency = rows[0];
            if (cryptocurrency) {
                console.log(`Cryptocurrency ${id} returned (${req.connection.remoteAddress})!`);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(cryptocurrency));
            } else {
                console.log(`Cryptocurrency ${id} doesn't exist (${req.connection.remoteAddress})!`);
                res.setHeader('Content-Type', 'application/json');
                res.status(404).end();
            }
        } else {
            throw err;
        }
    });
});

app.post('/api/cryptocurrency', (req, res) => {
    let cryptocurrency = req.body;
    connection.query('INSERT INTO cryptocurrency SET ?', cryptocurrency, (err, result) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            connection.query('SELECT * FROM cryptocurrency WHERE id = ?', result.insertId, (err, rows) => {
                if (!err) {
                    let cryptocurrency = rows[0];
                    if (cryptocurrency) {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(201).end(JSON.stringify(cryptocurrency));
                        console.log(`Cryptocurrency ${JSON.stringify(cryptocurrency)} added (${req.connection.remoteAddress})!`);
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(404).end();
                    }
                } else {
                    throw err;
                }
            });
        } else {
            throw err;
        }
    });
});

app.put('/api/cryptocurrency/:id', (req, res) => {
    let id = req.params.id
    let inputCrypto = req.body;
    console.log(`Changing cryptocurrency with id: ${id}`);
    connection.query(
        'UPDATE cryptocurrency SET name = ?, supply = ?, protocol = ? WHERE id = ?',
        [inputCrypto.name, inputCrypto.supply, inputCrypto.protocol, id],
        (err, result) => {
            if (!err) {
                console.log(`Changed ${result.changedRows} row(s)`);
                connection.query('SELECT * FROM cryptocurrency WHERE id = ?', [id], (err, rows) => {
                    if (!err) {
                        console.log('Data received from Database:');
                        let cryptocurrency = rows[0];
                        console.log(cryptocurrency);
                        if (cryptocurrency) {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(cryptocurrency));
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            console.log(`: Not found! (Request from ${req.connection.remoteAddress})`);
                            res.status(404).end();
                        }
                    } else {
                        throw err;
                    }
                });
            }
            else {
                throw err;
            }
        }
    );
});

app.delete('/api/cryptocurrency/:id', (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM cryptocurrency WHERE id = ?', [id], (err, result) => {
        if (!err) {
            console.log(`Deleted ${result.affectedRows} row(s)`);
            res.status(204).end();
        } else {
            throw err;
        }
    });
});

app.get('/api/exchange', (req, res) => {
    connection.query('SELECT * FROM exchange', (err, exchange) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(exchange));
        } else {
            throw err;
        }
    });
});

app.get('/api/exchange/:id', (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM exchange WHERE id = ?', id, (err, rows) => {
        if (!err) {
            let exchange = rows[0];
            if (exchange) {
                console.log(`Exchange ${id} returned (${req.connection.remoteAddress})!`);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(exchange));
            } else {
                console.log(`Exchange ${id} doesn't exist (${req.connection.remoteAddress})!`);
                res.setHeader('Content-Type', 'application/json');
                res.status(404).end();
            }
        } else {
            throw err;
        }
    });
});

app.post('/api/exchange', (req, res) => {
    let exchange = req.body;
    connection.query('INSERT INTO exchange SET ?', exchange, (err, result) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            connection.query('SELECT * FROM exchange WHERE id = ?', result.insertId, (err, rows) => {
                if (!err) {
                    let exchange = rows[0];
                    if (exchange) {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(201).end(JSON.stringify(exchange));
                        console.log(`Exchange ${JSON.stringify(exchange)} added (${req.connection.remoteAddress})!`);
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(404).end();
                    }
                } else {
                    throw err;
                }
            });
        } else {
            throw err;
        }
    });
});

app.put('/api/exchange/:id', (req, res) => {
    let id = req.params.id
    let inputExchange = req.body;
    console.log(`Changing exchange with id: ${id}`);
    connection.query(
        'UPDATE exchange SET name = ?, country = ? WHERE id = ?',
        [inputExchange.name, inputExchange.country, id],
        (err, result) => {
            if (!err) {
                console.log(`Changed ${result.changedRows} row(s)`);
                connection.query('SELECT * FROM exchange WHERE id = ?', [id], (err, rows) => {
                    if (!err) {
                        console.log('Data received from Database:');
                        let exchange = rows[0];
                        console.log(exchange);
                        if (exchange) {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(exchange));
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            console.log(`: Not found! (Request from ${req.connection.remoteAddress})`);
                            res.status(404).end();
                        }
                    } else {
                        throw err;
                    }
                });
            }
            else {
                throw err;
            }
        }
    );
});

app.delete('/api/exchange/:id', (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM exchange WHERE id = ?', [id], (err, result) => {
        if (!err) {
            console.log(`Deleted ${result.affectedRows} row(s)`);
            res.status(204).end();
        } else {
            throw err;
        }
    });
});

app.get('/api/price', (req, res) => {
    connection.query('SELECT * FROM price', (err, price) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(price));
        } else {
            throw err;
        }
    });
});

app.get('/api/price/:id', (req, res) => {
    let id = req.params.id;
    connection.query('SELECT * FROM price WHERE id = ?', id, (err, rows) => {
        if (!err) {
            let price = rows[0];
            if (price) {
                console.log(`Price ${id} returned (${req.connection.remoteAddress})!`);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(price));
            } else {
                console.log(`Price ${id} doesn't exist (${req.connection.remoteAddress})!`);
                res.setHeader('Content-Type', 'application/json');
                res.status(404).end();
            }
        } else {
            throw err;
        }
    });
});

app.post('/api/price', (req, res) => {
    let price = req.body;
    connection.query('INSERT INTO price SET ?', price, (err, result) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            connection.query('SELECT * FROM price WHERE id = ?', result.insertId, (err, rows) => {
                if (!err) {
                    let price = rows[0];
                    if (price) {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(201).end(JSON.stringify(price));
                        console.log(`Price ${JSON.stringify(price)} added (${req.connection.remoteAddress})!`);
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.status(404).end();
                    }
                } else {
                    throw err;
                }
            });
        } else {
            throw err;
        }
    });
});

app.put('/api/price/:id', (req, res) => {
    let id = req.params.id
    let inputPrice = req.body;
    console.log(`Changing price with id: ${id}`);
    connection.query(
        'UPDATE price SET cryptocurrency_id = ?, exchange_id = ?, exchangePrice = ?, date = ? WHERE id = ?',
        [inputPrice.cryptocurrency_id, inputPrice.exchange_id, inputPrice.exchangePrice, inputPrice.date, id],
        (err, result) => {
            if (!err) {
                console.log(`Changed ${result.changedRows} row(s)`);
                connection.query('SELECT * FROM price WHERE id = ?', [id], (err, rows) => {
                    if (!err) {
                        console.log('Data received from Database:');
                        let price = rows[0];
                        console.log(price);
                        if (price) {
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify(price));
                        } else {
                            res.setHeader('Content-Type', 'application/json');
                            console.log(`: Not found! (Request from ${req.connection.remoteAddress})`);
                            res.status(404).end();
                        }
                    } else {
                        throw err;
                    }
                });
            }
            else {
                throw err;
            }
        }
    );
});

app.delete('/api/price/:id', (req, res) => {
    let id = req.params.id;
    connection.query('DELETE FROM price WHERE id = ?', [id], (err, result) => {
        if (!err) {
            console.log(`Deleted ${result.affectedRows} row(s)`);
            res.status(204).end();
        } else {
            throw err;
        }
    });
});

let server = app.listen(8081, () => {
    console.log("Rest app listening at http://%s:%s", server.address().address, server.address().port);
});