
// set global variables
let showPassword   = document.querySelector('.showPassword')
let generate       = document.querySelector('.generatePassword')

let copyIcon       = document.querySelector('.copy-icon')
let refreshIcon    = document.querySelector('.refresh-icon')
let copiedMsg      = document.querySelector('.password-copied')

let progress       = document.querySelector('.progress')
let error          = document.querySelector('.error')

let customRange    = document.querySelector('.custom-range')

let easy           = document.querySelector('#easy-to-say')
let allCharacters  = document.querySelector('#all-characters')

let checkbox       = document.querySelectorAll('input[type="checkbox"]')
let checkboxChoice = document.querySelectorAll('.checkbox-choice')

let checkUppercase = checkbox[0]
let checkLowercase = checkbox[1]
let checkNumbers   = checkbox[2]
let checkSymbols   = checkbox[3]

// test
// checkUppercase.onchange = function () {
//   (this.checked) ? console.log('yes') : console.log('no')
// }

// theme mode
let lightMode = document.querySelector('.light')
let darkMode  = document.querySelector('.dark')

function controlMode() {
  let getDark = localStorage.getItem('mode')
  if (getDark == 'night') {
    document.body.className = getDark
    darkMode.classList.remove('opacity-low')
    lightMode.classList.add('opacity-low')    
  }
}
controlMode()

darkMode.onclick = function () {
  localStorage.setItem('mode', 'night')
  controlMode()
}

lightMode.onclick = function () {
  localStorage.removeItem('mode')
  document.body.className = ''
  darkMode.classList.add('opacity-low')
  lightMode.classList.remove('opacity-low')
}

// password copy
function copy() {
  showPassword.select()
  document.execCommand('copy') // deprecated !
}

function copyMsg() {
  copiedMsg.classList.add('show')
  setTimeout(() => {
    copiedMsg.classList.remove('show')
  }, 3000)
}



// ----------------------------------------------------------------------------

// array shuffle function:
function shuffle(array) {
  let currentIndex = array.length
  let randomIndex
  while (currentIndex != 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
  return array.join('')
}

// ----------------------------------------------------------------------------

// Random Password Generator with condition (30% capital letters / 30% small letters / 20% numbers / 20% symbols):
let numbers       = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let symbols       = ['@', '*', '&', '!', '#', ',', '~', '^','.']
let smallLetter   = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let capitalLetter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

// use with oddLength function
let num_And_symb  = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '@', '*', '&', '!', '#', ',', '~', '^','.']


// evenLength function
function evenLength(passwordLength) {
  password = []
  let letter_Len
  let num_And_symb_Len

  if (allCharacters.checked) {

    if (checkUppercase.checked && checkLowercase.checked && checkNumbers.checked && checkSymbols.checked) {
      letter_Len   = Math.round(passwordLength * .3)
      num_And_symb_Len = Math.round(passwordLength * .2)

      for (let i = 0; i < letter_Len; i++) {
        password.push(capitalLetter[Math.floor(Math.random() * capitalLetter.length)])
        password.push(smallLetter[Math.floor(Math.random() * smallLetter.length)])
      }
    
      for (let i = 0; i < num_And_symb_Len; i++) {     
        password.push(numbers[Math.floor(Math.random() * numbers.length)])
        password.push(symbols[Math.floor(Math.random() * symbols.length)])
      }
    }

    if (checkUppercase.checked == false) {
      letter_Len = Math.round(passwordLength * .6)
      num_And_symb_Len = Math.round(passwordLength * .2)

      for (let i = 0; i < letter_Len; i++) {
        password.push(smallLetter[Math.floor(Math.random() * smallLetter.length)])
      }
    
      for (let i = 0; i < num_And_symb_Len; i++) {     
        password.push(numbers[Math.floor(Math.random() * numbers.length)])
        password.push(symbols[Math.floor(Math.random() * symbols.length)])
      }
    }

  }


  // random sort using (shuffle function)
  return shuffle(password)
}

// oddLength function
function oddLength(passwordLength) {

  let password = []
  let letter_Len       = Math.round(passwordLength * .35)
  let num_And_symb_Len = Math.round(passwordLength * .3)

  // handling ( num_And_symb_Len is equal -> 5, 7, 13 )
  if (passwordLength == 5)
    num_And_symb_Len = 1

  else if (passwordLength == 7)
    num_And_symb_Len = 3

  else if (passwordLength == 13)
    num_And_symb_Len = 3

  for (let i = 0; i < letter_Len; i++) {
    password.push(capitalLetter[Math.floor(Math.random() * capitalLetter.length)])
    password.push(smallLetter[Math.floor(Math.random() * smallLetter.length)])
  }

  // no problem in ( num_And_symb_Len is equal -> 9, 11, 15 )
  for (let i = 0; i < num_And_symb_Len; i++) {     
    password.push(num_And_symb[Math.floor(Math.random() * num_And_symb.length)])
  }

  // random sort using (shuffle function)
  return shuffle(password)
}


// generate password ( main function )
function generatePassword(num) {
  num = customRange.value
  if ((num <= 16) && (num >= 4))
    if (num % 2 == 0)
      return evenLength(num)
    
  else 
    return oddLength(num)
}


// handle password length  ---------------------------------------------------------------
// ( handle error, password strength with colors, custom range color with password strength )

function handlePasswordLength(passwordLength) {
  
  if ((passwordLength < 4) || (passwordLength > 16)) {
    showPassword.value = ''  // to replace 'undefined'
    error.textContent = '* Password length should not be less than 4 and not greater than 16'
    progress.classList.add('hide-progress')
    customRange.classList.add('custom-range-error')
    customRange.classList.add('red')
  } else {
    error.textContent = ''
    progress.classList.remove('hide-progress')
    customRange.classList.remove('custom-range-error')
  }

  if ((passwordLength >= 4) && (passwordLength <= 5)){
    error.textContent = '* Very Weak'
    progress.classList.add('very-low')
    customRange.classList.add('red')
  } else {
    progress.classList.remove('very-low')
  }
  
  if ((passwordLength >= 6) && (passwordLength <= 7)){
    error.textContent = '* Weak'
    progress.classList.add('low')
    customRange.classList.add('red')
  } else {
    progress.classList.remove('low')
  }
  
  if (passwordLength >= 8 && passwordLength <= 10) {
    error.textContent = '* Middle'
    error.classList.add('yellow')
    customRange.classList.add('yellow')
    progress.classList.add('middle')
    
  } else {
    error.classList.remove('yellow')
    customRange.classList.remove('yellow')
    progress.classList.remove('middle')
  }
  
  if (passwordLength >= 11 && passwordLength <= 12) {
    error.textContent = '* Strong'
    error.classList.add('green')
    customRange.classList.add('green')
    progress.classList.add('strong')
  } else {
    error.classList.remove('green')
    customRange.classList.remove('green')
    progress.classList.remove('strong')
  }
  
  
  if ((passwordLength >= 13) && (passwordLength <= 16)){
    error.textContent = '* Very Strong'
    error.classList.add('green')
    customRange.classList.add('green')
    progress.classList.add('very-strong')
  } else {
    progress.classList.remove('very-strong')
  }

}


// password on input ----------------------------------------------------------

showPassword.oninput = function () {
  handlePasswordLength(showPassword.value.length)
  customRange.value = showPassword.value.length
}

// ----------------------------------------------------------------------------
function generateFire() {
  refreshIcon.style.animationName = 'rotate'
  setTimeout(() => {
    refreshIcon.style.animationName = ''
  },300)
  showPassword.value = generatePassword(customRange.value)
  handlePasswordLength(customRange.value)
}

// custom range on input ( execute generate ) ---------------------------------
customRange.addEventListener('input', function(){generateFire()})

// generate button ( execute generate )
generate.addEventListener('click', function(){generateFire()})

// refresh icon ( execute generate )
refreshIcon.addEventListener('click', function(){generateFire()})

// ----------------------------------------------------------------------------


// Customize your password ----------------------------------------------------

// easy choices ( Uppercase / Lowercase only)
function easyChoices() {
  if (easy.checked) {
    for (let i = 0; i < 2; i++) {
      checkbox[i].checked = true
      checkboxChoice[i].classList.add('no-select')
    }
    for (let i = 2; i < 4; i++) {
      checkbox[i].checked = false
      checkboxChoice[i].classList.add('no-select-inactive')
    }
  }
}

// default choices ( All characters )
function defaultChoices() {
  if (allCharacters.checked) {
    for (let i = 0; i < 4; i++) {
      checkbox[i].checked = true
      checkboxChoice[i].classList.remove('no-select', 'no-select-inactive')
    }
  }
}

// easy to say radio input
easy.onclick = function () {
  easyChoices()
}

// all characters radio input
allCharacters.onclick = function () {
  defaultChoices()
}


// ----------------------------------------------------------------------------

// onload ( default values )
window.onload = function () {
  showPassword.value = 'l0sPG,x8*OGu'
  customRange.value = 12
  
  allCharacters.checked = true
  defaultChoices()
  handlePasswordLength(showPassword.value.length)

}