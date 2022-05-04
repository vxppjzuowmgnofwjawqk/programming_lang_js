const code =
	`
	
	v a number = 10;
	
	v b number = a * 90;
	
	v c number = b - a;
	
	v d string = 'HELLO' + ' ' + 'WORLD' + '!';
	
	v e boolean = true;
	
	l 10 + c * c;
	
	`

const { _Variables } = require('./modules/_variables')
const {_Calculator} = require("./modules/_calculator");

class Main {

	constructor(code) {

		this.code = code

	}

	execute() {

		try {

			for (let line of this.formattedCode) {

				if (line.startsWith('v')) {

					_Variables.createVariable(line)

				} else if (line.startsWith('l')) {

					this.log(line.slice(2))

				}

			}

		} catch (e) {

			console.log(e)

		}

	}

	log(expression) {

		console.log(_Calculator.calculatingExpression(expression))

	}

	get formattedCode() {

		const temporary = this.code.replace(/(\n)|(\t)/g, '').split(';')

		temporary.length--

		return temporary

	}

}

(function() {
	new Main(code)
		.execute()
})()
