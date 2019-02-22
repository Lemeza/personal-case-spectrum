"use strict";

let Cryptocurrency = require('./modules/cryptocurrency');

console.log(`Starting index.js`);

let cryptocurrencyRepository = new Cryptocurrency();

let crypto = {
  name: 'bitcoin',
  supply: 21000000,
  protocol: 'Proof of Work'
};

let createdCryptoPromise = cryptocurrencyRepository.insert(crypto);
console.log(createdCryptoPromise);

createdCryptoPromise.then(createCrypto => {
  console.log(`Inserted crypto with ID: ${createCrypto.id}`);
}, error => {
  console.log(`Error: ${error}`);
});

cryptocurrencyRepository.query('INSERT into cryptocurrency set ?', [crypto]).then(result => {
  console.log(`Inserted result with id: ${result.insertId}`);
}, error => {
  console.log(`Error: ${error}`);
});

cryptocurrencyRepository.stop();