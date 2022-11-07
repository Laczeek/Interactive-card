const nameInput = document.querySelector('#name')
const numInput = document.querySelector('#number')
const monthInput = document.querySelector('#month')
const yearInput = document.querySelector('#year')
const cvcInput = document.querySelector('#cvc')
const confirmBtn = document.querySelector('.inter-card__bgform-form-btn')

// card elements
const cardNumbers = document.querySelector('.inter-card__bgmain-cardfront-number')
const cardName = document.querySelector('.inter-card__bgmain-cardfront-other-names')
const cardMonth = document.querySelector('.card-month')
const cardYear = document.querySelector('.card-year')
const cardCvc = document.querySelector('.inter-card__bgmain-cardback-cvc')
// form
const formBox = document.querySelector('.inter-card__bgform')
const form = document.querySelector('.inter-card__bgform-form')
// template
const template = document.querySelector('.success')

// input max length
const maxcharacters = (input, maxlength) => {
	if (input.value.length > maxlength) {
		input.value = input.value.slice(0, maxlength)
	}
}
// live card date
const writeName = () => {
	cardName.textContent = nameInput.value
}
const writeNumbers = () => {
	cardNumbers.textContent = numInput.value.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' ')
}
const writeMonth = () => {
	cardMonth.textContent = monthInput.value
}
const writeYear = () => {
	cardYear.textContent = yearInput.value
}
const writeCvc = () => {
	cardCvc.textContent = cvcInput.value
}
// form check
const resetErrors = input => {
	input.classList.remove('input-error')
	input.nextElementSibling.style.visibility = 'hidden'
}
const addError = (input, msg) => {
	input.classList.add('input-error')
	input.nextElementSibling.style.visibility = 'visible'
	input.nextElementSibling.textContent = msg
}

const checkForm = event => {
	event.preventDefault()
	const allInputs = [nameInput, numInput, monthInput, yearInput, cvcInput]
	checkAllInputs(allInputs)
	checkName()
	checkNumber()
	checkMonth()
	checkYear()
	checkCvc()
	submitForm(allInputs)
}

const checkAllInputs = allInputs => {
	allInputs.forEach(input => {
		if (input.value !== '') {
			resetErrors(input)
		} else {
			addError(input, "Can't be blank")
		}
	})
}

const checkName = () => {
	const reqName = "^[a-zA-Z'-]+ [a-zA-Z'-]+$"
	if (!nameInput.value.match(reqName) && !nameInput.value == '') {
		addError(nameInput, 'Enter correct name')
	}
}

const checkNumber = () => {
	if (numInput.value.length !== 16 && !numInput.value == '') {
		addError(numInput, 'Code must have 16 characters')
	}
}

const checkMonth = () => {
	if ((monthInput.value.length !== 2 && !monthInput.value == '') || parseInt(monthInput.value) > 12) {
		addError(monthInput, 'Incorrect month')
	}
}

const checkYear = () => {
	if ((yearInput.value.length !== 2 && !yearInput.value == '') || parseInt(yearInput.value) <= 22) {
		addError(yearInput, 'Incorrect year')
	}
}

const checkCvc = () => {
	if (cvcInput.value.length !== 3 && !cvcInput.value == '') {
		addError(cvcInput, 'Incorrect cvc code')
	}
}

const submitForm = (allInputs) => {
	let error = 0
	allInputs.forEach(input => {
		if (input.classList.contains('input-error')) {
			error++
		}
	})
	if (error == 0) {
		
		form.style.display = 'none'
		const success = template.content.cloneNode(true)
		const successBtn = success.querySelector('.success__box-btn')
		successBtn.addEventListener('click', () => {
		form.submit();
		})
		formBox.append(success)
	}
}

nameInput.addEventListener('keyup', writeName)
numInput.addEventListener('keyup', writeNumbers)
monthInput.addEventListener('keyup', writeMonth)
yearInput.addEventListener('keyup', writeYear)
cvcInput.addEventListener('keyup', writeCvc)
confirmBtn.addEventListener('click', checkForm)
