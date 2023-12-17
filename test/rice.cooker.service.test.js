const { describe, it } = require("mocha");
const { riceGramToLiter } = require("../src/service/rice.cooker.service");
const { expect } = require("chai");

describe('Rice cooker service TEST', () => {
  it('This test always passes', () => {
  })

  describe('riceGramToLiter function TEST', () => {
    it('Should convert the amount of rice in grams into liters', () => {
      const res = riceGramToLiter(500);
      expect(res).to.be.closeTo(0.8, 0.05);
    })
  })
})