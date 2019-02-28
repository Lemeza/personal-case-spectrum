"use strict";

let Cryptocurrency = require('./modules/cryptocurrency');

console.log(`Starting index.js`);

let cryptocurrencyRepository = new Cryptocurrency();

cryptocurrencyRepository.removeAll().then(result => {

  if (result) {
    console.log(`Removed all cryptocurrencies from database`);
  }
}, error => {
  console.log(`Unable to remove cryptocurrencies: ${error}`);
});

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

let getCryptoPromise = cryptocurrencyRepository.findAll();

getCryptoPromise.then(function(rows) {
  for (let row of rows) {
    console.log(row);
  }
}, error => {
  console.log(error);
});

crypto = {
  name: 'ethereum',
  supply: 105000000,
  protocol: 'Proof of Work'
};

cryptocurrencyRepository.insert(crypto).then(createCrypto => {
  console.log(`Inserted crypto with ID: ${createCrypto.id}`);
}, error => {
  console.log(`Error: ${error}`);
});

let cryptoId = 2;

cryptocurrencyRepository.findById(cryptoId).then(crypto => {
    if (crypto) {
      console.log(`Crypto with id ${crypto.id} has the name ${crypto.name} and has a supply of ${crypto.supply} units`);
    } else {
      console.log(`Crypto with id ${cryptoId} was not found!`);
    }
  },
  error => {
    console.log("Something went wrong: " + error);
  });

cryptocurrencyRepository.update(cryptoId, 'ethereum', 106000000, 'Proof of Stake').then(updatedCrypto => {
  console.log(`Updated crypto ${updatedCrypto}`);
}, error => {
  console.log("Something went wrong: " + error);
});

cryptoId = 1;

cryptocurrencyRepository.deleteById(cryptoId).then(deletedCrypto => {
  console.log(`Crypto with id ${cryptoId} is` + (deletedCrypto ? "" : " not") + ` deleted`)
}, error => {
  console.log(`Error: ${error}`);
});

cryptocurrencyRepository.stop();
