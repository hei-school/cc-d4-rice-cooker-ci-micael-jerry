const { bar } = require('./bar.view');

const printMenu = (...menu) => {
	bar('Menu');
	for (let i = 0; i < menu.length; i++) {
		console.log(i + 1 + '. ' + menu[i]);
	}
};

module.exports.printMenu = printMenu;
