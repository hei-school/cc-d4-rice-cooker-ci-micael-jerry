const { RiceCooker } = require("../../src/model/rice.cooker.model")

const createRiceCooker = (maxCapacityLiter = 0, riceGram = 0, waterLiter = 0) => {
  return new RiceCooker(maxCapacityLiter, riceGram, waterLiter);
}

module.exports.createRiceCooker = createRiceCooker