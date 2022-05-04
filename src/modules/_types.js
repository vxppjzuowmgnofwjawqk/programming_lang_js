class _Types {

	static get(value) {

		if (
			!isNaN(Number(value))
		) {

			return 'number'

		} else if (
			value === 'true' ||
			value === 'false'
		) {

			return 'boolean'

		} else {

			return 'string'

		}

	}

	static transformation(value) {

		switch (this.get(value)) {

			case 'number': return +value
			case 'boolean': return value === 'true'
			case 'string': return value.trim().replace(/['"]/g, '')

		}

	}

	static operationIsValid(firstOperand, secondOperand) {

		if (this.get(firstOperand) !== this.get(secondOperand)) {

			throw new TypeError('TYPE_ERROR')

		}

	}

}

module.exports._Types = _Types
