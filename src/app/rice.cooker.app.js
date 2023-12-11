const { RiceCooker } = require('../model/rice.cooker.model');
const {
	addRice,
	addWater,
	removeRice,
	removeWater,
	drain,
	viewContent,
	connectPowerSource,
	cook,
} = require('../service/rice.cooker.service');
const { myPrompt } = require('../util/my.prompt.util');
const { bar } = require('../view/bar.view');
const { printMenu } = require('../view/menu.view');

const add = async riceCooker => {
	let conditionRunning = true;
	while (conditionRunning) {
		printMenu('Add rice', 'Add water', 'Do not add');
		const inputStr = await myPrompt('Choice: ');

		const choice = parseInt(inputStr);
		if (choice === 1) {
			await addRice(riceCooker)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		} else if (choice === 2) {
			await addWater(riceCooker)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		} else if (choice === 3) {
			conditionRunning = false;
		} else {
			console.log('RETRY');
		}
	}
};

const remove = async riceCooker => {
	let conditionRunning = true;
	while (conditionRunning) {
		printMenu(
			'Remove rice',
			'Remove water',
			'Empty the rice cooker',
			'Do not remove',
		);
		const inputStr = await myPrompt('Choice : ');

		const choice = parseInt(inputStr);
		if (choice === 1) {
			await removeRice(riceCooker)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		} else if (choice === 2) {
			await removeWater(riceCooker)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		} else if (choice === 3) {
			await drain(riceCooker)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		} else if (choice === 4) {
			conditionRunning = false;
		} else {
			console.log('RETRY');
		}
	}
};

const run = async () => {
	console.log('Welcome');
	const riceCooker = new RiceCooker(5);

	console.log(
		`THE MAXIMUM CAPACITY OF THE RICE COOKER IS ${riceCooker.max_capacity_liter} LITERS`,
	);
	let conditionRunning = true;
	while (conditionRunning) {
		const choice4 = riceCooker.isPowered
			? 'Disconnect from a power source'
			: 'Connect to a power source';
		printMenu('Status', 'Add', 'Remove', choice4, 'Cook', 'Exit');
		const inputStr = await myPrompt('Choice : ');

		const choice = parseInt(inputStr);
		if (choice === 1) {
			bar('Status');
			viewContent(riceCooker);
		} else if (choice === 2) {
			bar('Add');
			await add(riceCooker);
		} else if (choice === 3) {
			bar('Remove');
			await remove(riceCooker);
		} else if (choice === 4) {
			bar(choice4);
			connectPowerSource(riceCooker);
		} else if (choice === 5) {
			bar('Cook');
			await cook(riceCooker)
				.then(res => console.log(res))
				.catch(err => console.log(err));
		} else if (choice === 6) {
			conditionRunning = false;
			console.log('Au revoir');
		} else {
			console.log('RETRY');
		}
	}
};

module.exports.run = run;
