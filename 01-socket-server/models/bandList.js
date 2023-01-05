const Band = require('./band');

class BandList {
  constructor() {
    this.bands = [
      new Band('The Beatles'),
      new Band('The Rolling Stones'),
      new Band('The Who'),
    ];
  }

  addBand(name) {
    this.bands.push(new Band(name));
    return this.bands;
  }

  getBands() {
    return this.bands;
  }

  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }

  increaseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
      }
      return band;
    });
    return this.bands;
  }

  changeName(id, name) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = name;
      }
      return band;
    });
    return this.bands;
  }
}

module.exports = BandList;
