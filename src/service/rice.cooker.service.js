const { myPrompt } = require("../util/my.prompt.util");

const riceGramToLiter = (riceGram) => {
  const densityOfRice = 0.6;  // g/ml
  const riceCapacityInLiters = (riceGram / 1000) / densityOfRice;   // l
  return riceCapacityInLiters;
}

const riceWithWater = (riceGram, waterLiter) => {
  return waterLiter + riceGramToLiter(riceGram);    // l
}

const isCanBeContained = (riceCooker, riceGram = 0, waterLiter = 0) => {
  return riceCooker.maxCapacityLiter > riceWithWater(riceCooker.riceGram + riceGram, riceCooker.waterLiter + waterLiter);
}

const addRice = async (riceCooker) => {
  const inputStr = await myPrompt("add rice (grams): ");
  try {
    const riceAdd = parseFloat(inputStr);
    if (riceAdd > 0) {
      if (!isCanBeContained(riceCooker, riceAdd)) {
        throw new Error("You exceed the maximum capacity of the rice cooker");
      }
      riceCooker.riceGram += riceAdd;
      Promise.resolve(`${riceAdd} gram of rice added`)
    } else {
      throw new Error("Enter a valid number - Retry");
    }
  } catch (error) {
    Promise.reject(error);
  }
}

const addWater = async (riceCooker) => {
  const inputStr = await myPrompt("add water (liters): ");
  try {
    const waterAdd = parseFloat(inputStr);
    if (waterAdd > 0) {
      if (!isCanBeContained(riceCooker, 0, waterAdd)) {
        throw new Error("You exceed the maximum capacity of the rice cooker");
      }
      riceCooker.waterLiter += waterAdd;
      Promise.resolve(`${waterAdd} liter of water added`)
    } else {
      throw new Error("Enter a valid number - Retry");
    }
  } catch (error) {
    Promise.reject(error);
  }
}

module.exports.riceGramToLiter = riceGramToLiter;
module.exports.riceWithWater = riceWithWater;
module.exports.isCanBeContained = isCanBeContained;
module.exports.addRice = addRice;
module.exports.addWater = addWater;