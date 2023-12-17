const { describe, it } = require("mocha");
const { riceGramToLiter, riceWithWater, isCanBeContained, drain, connectPowerSource, cook } = require("../src/service/rice.cooker.service");
const { expect, assert } = require("chai");
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

  describe('riceWithWater', () => {
    it('Should return the sum of rice in grams and water in liters (liters)', () => {
      const res = riceWithWater(500, 2);
      expect(res).to.be.closeTo(2.8, 0.05);
    })
  })

  describe('isCanBeContained', () => {
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

  describe('drain', () => {
    it('Should empty the rice cooker', () => {
      const riceCooker = createRiceCooker(6, 500, 5);

      drain(riceCooker);

      expect(riceCooker.riceGram).to.be.equal(0);
      expect(riceCooker.waterLiter).to.be.equal(0);
    })
  })

  describe('connectPowerSource', () => {
    it('Should connect the rice cooker', () => {
      const riceCooker = createRiceCooker(3, 0, 0);

      connectPowerSource(riceCooker);

      expect(riceCooker.isPowered).to.be.true;
    })

    it('Should disconnect the rice cooker', () => {
      const riceCooker = createRiceCooker(3, 0, 0);

      connectPowerSource(riceCooker);
      connectPowerSource(riceCooker);

      expect(riceCooker.isPowered).to.be.false;
    })
  })

  describe('cook', () => {
    it('Should cook the rice', () => {
      const riceCooker = createRiceCooker(3, 500, 2);

      connectPowerSource(riceCooker)
      cook(riceCooker).then((res) => assert.equal(res, 'A FEW MINUTES LATER\nYour rice is cooked'))
    })
    
    it('Should return an error', () => {
      const riceCooker = createRiceCooker(3, 500, 2);

      cook(riceCooker)
        .catch((err) => expect(err).to.be.Throw)
    })
  })
})