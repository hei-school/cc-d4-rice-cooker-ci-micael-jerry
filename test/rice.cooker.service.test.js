const { describe, it } = require("mocha");
const { riceGramToLiter, riceWithWater, isCanBeContained } = require("../src/service/rice.cooker.service");
const { expect } = require("chai");
const { createRiceCooker } = require("./utils/rice.cooker.test.util");

describe('Rice cooker service TEST', () => {
  it('This test always passes', () => {
  })

  describe('riceGramToLiter function TEST', () => {
    it('Should convert the amount of rice in grams into liters', () => {
      const res = riceGramToLiter(500);
      expect(res).to.be.closeTo(0.8, 0.05);
    })
  })

  describe('riceWithWater function TEST', () => {
    it('Should return the sum of rice in grams and water in liters (liters)', () => {
      const res = riceWithWater(500, 2);
      expect(res).to.be.closeTo(2.8, 0.05);
    })
  })

  describe('isCanBeContained function TEST', () => {
    it('Should return true if the rice can be contained', () => {
      const riceCooker = createRiceCooker(3, 0, 0);
      const res = isCanBeContained(riceCooker, 500, 2);
      expect(res).to.be.true;
    })

    it('Should return false if the rice cannot be contained', () => {
      const riceCooker = createRiceCooker(3, 0, 0);
      const res = isCanBeContained(riceCooker, 1000, 3);
      expect(res).to.be.false;
    })
  })
})