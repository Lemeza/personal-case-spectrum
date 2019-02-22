const expect = require('chai').expect;
const Cryptocurrency = require('../modules/cryptocurrency');
const Exchange = require('../modules/exchange');
const Price = require('../modules/price');

describe('class Cryptocurrency', function () {
  it('should return valid object properties', function () {
    let c = new Cryptocurrency(1, 'bitcoin', 21000000, 'Proof of Work');

    expect(c.id).to.be.equal(1);
    expect(c.name).to.be.equal('bitcoin');
    expect(c.supply).to.be.equal(21000000);
    expect(c.protocol).to.be.equal('Proof of Work');
  });

  it('should be an object', function () {
    let cr = new Cryptocurrency(2, 'ethereum', 104000000, 'Proof of Work');

    expect(cr).to.be.a('object');
  });

  it('testing setters', function () {
    let eos = new Cryptocurrency(3, 'eos', 1000000000, 'Proof of Stake');

    eos.protocol = 'Delegated Proof of Stake';
    expect(eos.protocol).to.be.equal('Delegated Proof of Stake');
  })
});
