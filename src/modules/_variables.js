const { _Calculator } = require('./_calculator')

class _Variables {

	static variables = {}

	static createVariable(line) {

		const [key, type] = line.slice(2).split(' ')

		const value = _Calculator
			.calculatingExpression(line.slice(line.indexOf('=') + 1))

		this.variables[key] = {type, value}

	}

	static has(key) {

		return this.variables[key] !== undefined

	}

	static get(key) {

		return this.variables[key].value

	}

}

module.exports._Variables = _Variables
