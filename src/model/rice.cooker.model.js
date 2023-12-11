class RiceCooker {
	constructor(maxCapacityLiter = 0, riceGram = 0, waterLiter = 0) {
		this._maxCapacityLiter = maxCapacityLiter;
		this._riceGram = riceGram;
		this._waterLiter = waterLiter;
		this._isPowered = false;
	}

	get maxCapacityLiter() {
		return this._maxCapacityLiter;
	}

	set maxCapacityLiter(maxCapacityLiter) {
		this._maxCapacityLiter = maxCapacityLiter;
	}

	get riceGram() {
		return this._riceGram;
	}

	set riceGram(riceGram) {
		this._riceGram = riceGram;
	}

	get waterLiter() {
		return this._waterLiter;
	}

	set waterLiter(waterLiter) {
		this._waterLiter = waterLiter;
	}

	get isPowered() {
		return this._isPowered;
	}

	set isPowered(isPowered) {
		this._isPowered = isPowered;
	}
}

module.exports.RiceCooker = RiceCooker;
