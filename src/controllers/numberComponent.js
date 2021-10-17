var mintAmount = 0

const addTurtle = () => {
	let newNum = mintAmount + 1
	if (newNum > 20) {
		newNum = 20
	}
	mintAmount = newNum
}

const subtractTurtle = () => {
	let newNum = mintAmount - 1
	if (newNum < 0) {
		newNum = 0
	}
	mintAmount = newNum
}

export { addTurtle, subtractTurtle, mintAmount }
