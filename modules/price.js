module.exports = class Price {

  constructor(id, exchangeId, exchangePrice, cryptocurrencyId, date) {
    this._id = id;
    this._exchangeId = exchangeId;
    this._exchangePrice = exchangePrice;
    this._cryptocurrencyId = cryptocurrencyId;
    this._date = date;
  }

  get id() {
    return this._id;
  }

  get exchangeId() {
    return this._exchangeId;
  }

  get exchangePrice() {
    return this._exchangePrice;
  }

  get cryptocurrencyId() {
    return this._cryptocurrencyId;
  }

  get date() {
    return this._date;
  }

  set id(id) {
    this._id = id;
  }

  set exchangeId(exchangeId) {
    this._exchangeId = exchangeId;
  }

  set exchangePrice(exchangePrice) {
    this._exchangePrice = exchangePrice;
  }

  set cryptocurrencyId(cryptocurrencyId) {
    this._cryptocurrencyId = cryptocurrencyId;
  }

  set date(date) {
    this._date = date;
  }
}
