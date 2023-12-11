const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const scanner = async question => {
	return new Promise(resolve => {
		rl.question(question, response => {
			resolve(response);
		});
	});
};

const myPrompt = async question => {
	let res = await scanner(question);
	return res;
};

const closeMyPrompt = () => {
	rl.close();
};

module.exports.myPrompt = myPrompt;
module.exports.closeMyPrompt = closeMyPrompt;
