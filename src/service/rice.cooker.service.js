const { myPrompt } = require('../util/my.prompt.util');

const riceGramToLiter = riceGram => {
	const densityOfRice = 0.6; // g/ml
	const riceCapacityInLiters = riceGram / 1000 / densityOfRice; // l
	return riceCapacityInLiters;
};

const riceWithWater = (riceGram, waterLiter) => {
	return waterLiter + riceGramToLiter(riceGram); // l
};

const isCanBeContained = (riceCooker, riceGram = 0, waterLiter = 0) => {
	return (
		riceCooker.maxCapacityLiter >
		riceWithWater(
			riceCooker.riceGram + riceGram,
			riceCooker.waterLiter + waterLiter,
		)
	);
};

const addRice = async riceCooker => {
	const inputStr = await myPrompt('add rice (grams): ');
	try {
		const riceAdd = parseFloat(inputStr);
		if (riceAdd > 0) {
			if (!isCanBeContained(riceCooker, riceAdd)) {
				throw new Error('You exceed the maximum capacity of the rice cooker');
			}
			riceCooker.riceGram += riceAdd;
			Promise.resolve(`${riceAdd} gram of rice added`);
		} else {
			throw new Error('Enter a valid number - Retry');
		}
	} catch (error) {
		throw new Error('Enter a valid number - Retry');
	}
};

const addWater = async riceCooker => {
	const inputStr = await myPrompt('add water (liters): ');
	try {
		const waterAdd = parseFloat(inputStr);
		if (waterAdd > 0) {
			if (!isCanBeContained(riceCooker, 0, waterAdd)) {
				throw new Error('You exceed the maximum capacity of the rice cooker');
			}
			riceCooker.waterLiter += waterAdd;
			Promise.resolve(`${waterAdd} liter of water added`);
		} else {
			throw new Error('Enter a valid number - Retry');
		}
	} catch (error) {
		throw new Error('Enter a valid number - Retry');
	}
};

const removeRice = async riceCooker => {
	const inputStr = await myPrompt('remove rice (grams): ');
	try {
		const riceRemove = parseFloat(inputStr);
		if (riceRemove > 0) {
			if (riceRemove >= riceCooker.riceGram) {
				riceCooker.riceGram = 0;
				Promise.resolve('All the rice has been removed');
			}
			riceCooker.riceGram -= riceRemove;
			Promise.resolve(`${riceRemove} grams of rice have been removed`);
		} else {
			throw new Error('Enter a valid number - Retry');
		}
	} catch (error) {
		throw new Error('Enter a valid number - Retry');
	}
};

const removeWater = async riceCooker => {
	const inputStr = await myPrompt('remove water (liters): ');
	try {
		const waterRemove = parseFloat(inputStr);
		if (waterRemove > 0) {
			if (waterRemove >= riceCooker.waterLiter) {
				riceCooker.waterLiter = 0;
				Promise.resolve('All water removed');
			}
			riceCooker.riceGram -= waterRemove;
			Promise.resolve(`${waterRemove} liter of water removed`);
		} else {
			throw new Error('Enter a valid number - Retry');
		}
	} catch (err) {
		throw new Error('Enter a valid number - Retry');
	}
};

const drain = async riceCooker => {
	riceCooker.riceGram = 0;
	riceCooker.waterLiter = 0;
	Promise.resolve('The rice cooker has been emptied');
};

const connectPowerSource = riceCooker => {
	riceCooker.isPowered = !riceCooker.isPowered;
};

const cook = async riceCooker => {
	if (!riceCooker.isPowered) {
		throw new Error('Your rice cooker is not connected to an electric source');
	}
	if (riceCooker.waterLiter <= 0) {
		throw new Error('The rice cooker contains no water');
	}
	if (riceCooker.riceGram <= 0) {
		throw new Error('The rice cooker does not contain rice');
	}
	if (riceCooker.waterLiter < riceGramToLiter(riceCooker.riceGram)) {
		throw new Error('The rice cooker does not contain enough water');
	}
	Promise.resolve('A FEW MINUTES LATER\nYour rice is cooked');
};

const viewContent = riceCooker => {
	console.log(`SOURCE POWER: ${riceCooker.is_powered}`);
	if (riceCooker.riceGram === 0 && riceCooker.waterLiter === 0) {
		console.log('The rice cooker is empty');
	} else {
		if (riceCooker.waterLiter > 0) {
			console.log(`WATER: ${riceCooker.water_liter} liter`);
		}
		if (riceCooker.riceGram > 0) {
			console.log(`RICE: ${riceCooker.rice_gram} gram`);
		}
	}
};

module.exports.riceGramToLiter = riceGramToLiter;
module.exports.riceWithWater = riceWithWater;
module.exports.isCanBeContained = isCanBeContained;
module.exports.addRice = addRice;
module.exports.addWater = addWater;
module.exports.removeRice = removeRice;
module.exports.removeWater = removeWater;
module.exports.drain = drain;
module.exports.connectPowerSource = connectPowerSource;
module.exports.cook = cook;
module.exports.viewContent = viewContent;
