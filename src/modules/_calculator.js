const { _Types } = require('./_types')

class _Calculator {

	static priorityTable = {

		'+': 13,
		'-': 13,
		'*': 14,
		'/': 14

	}

	static mathOperation = {

		'+': addition,
		'-': subtraction,
		'*': multiplication,
		'/': division

	}

	static calculatingExpression(expression) {

		// expression = expression.replace(/(?=[^']*?(?:'|$))/g, '')

		while (expression.match(/[+\-/*]/)) {

			const operator = this.findOperatorWithHighestPriority(expression)

			let [

				firstOperand,
				secondOperand,
				startIndex,
				endIndex

			] = this.findOperatorOperands(expression, operator)

			firstOperand = _Types.transformation(firstOperand)
			secondOperand = _Types.transformation(secondOperand)

			let calculationResult = this.mathOperation[operator](firstOperand, secondOperand)

			if (typeof firstOperand === 'string') {

				calculationResult = `'${calculationResult}'`

			}

			expression = `${expression.slice(0, startIndex)}${calculationResult}${expression.slice(endIndex)}`

		}

		expression = expression.trim()

		return _Types.transformation(expression)

	}

	static findOperatorWithHighestPriority(expression) {

		let highPriority = null

		for (let symbol of expression) {

			if (symbol in this.priorityTable) {

				if ((this.priorityTable[highPriority] ?? 0) < this.priorityTable[symbol]) {

					highPriority = symbol

				}

			}

		}

		return highPriority

	}

	static findOperatorOperands(expression, operator) {

		const operatorIndex = expression.indexOf(operator)

		let startIndex
		let endIndex

		let firstOperand
		let secondOperand

		for (let i = operatorIndex - 1; i > 0; i--) {

			if ('+-*/'.includes(expression[i])) {

				startIndex = i + 1

				firstOperand = expression.slice(i + 1, operatorIndex)

				break

			}

		}

		for (let i = operatorIndex + 1; i < expression.length; i++) {

			if ('+-*/'.includes(expression[i])) {

				endIndex = i

				secondOperand = expression.slice(operatorIndex + 1, i)

				break

			}

		}

		if (firstOperand === undefined) {

			startIndex = 0
			firstOperand = expression.slice(0, operatorIndex)

		}

		if (secondOperand === undefined) {

			endIndex = expression.length
			secondOperand = expression.slice(operatorIndex + 1, expression.length)

		}

		firstOperand = firstOperand.trim()
		secondOperand = secondOperand.trim()

		const { _Variables } = require('./_variables')

		if (_Variables.has(firstOperand)) {

			firstOperand = _Variables.get(firstOperand)

		}

		if (_Variables.has(secondOperand)) {

			secondOperand = _Variables.get(secondOperand)

		}

		_Types.operationIsValid(firstOperand, secondOperand)

		return [

			firstOperand,
			secondOperand,
			startIndex,
			endIndex

		]

	}

}

function addition(a, b) {

	return a + b;

}

function subtraction(a, b) {

	a = _Types.transformation(a)
	b = _Types.transformation(b)

	if (typeof a === 'string' || typeof b === 'string') {

		throw new SyntaxError('SYNTAX_ERROR')

	}

	return a - b

}

function multiplication(a, b) {

	a = _Types.transformation(a)
	b = _Types.transformation(b)

	if (typeof a === 'string' || typeof b === 'string') {

		throw new SyntaxError('SYNTAX_ERROR')

	}

	return a * b

}

function division(a, b) {

	a = _Types.transformation(a)
	b = _Types.transformation(b)

	if (typeof a === 'string' || typeof b === 'string') {

		throw new SyntaxError('SYNTAX_ERROR')

	}

	return a / b

}

module.exports._Calculator = _Calculator
