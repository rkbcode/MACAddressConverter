const input    = document.querySelector('#input')
const nothing  = document.querySelector('#nothing')
const dashes   = document.querySelector('#dashes')
const colons   = document.querySelector('#colons')
const aruba    = document.querySelector('#aruba')
const cisco    = document.querySelector('#cisco')
const copy     = document.querySelector('#copy')
const clear    = document.querySelector('#clear')
const outputs  = document.querySelectorAll('.outputMac')
const cards    = document.querySelectorAll('.outputcard')

const regex    = /^^([0-9a-fA-F]{2}[:\-]?[0-9a-fA-F]{2}[:\-\.]?){2}[0-9a-fA-F]{2}[:\-]?[0-9a-fA-F]{2}$/

input.addEventListener('input', showMacs)
clear.addEventListener('click', clearInput)
cards.forEach(output => output.addEventListener('click', copyThis, false))

function showMacs() {
    input.value = input.value.trim()
    let inputValue = input.value.toLowerCase()
    
    if (inputValue.match(regex)) {
        const nothingFormat = inputValue.replace(/[:\-\.]/g, '')
        const splitFormat   = nothingFormat.match(/../g)
        const dashesFormat  = splitFormat.join('-')
        const colonsFormat  = splitFormat.join(':')
        const arubaFormat   = nothingFormat.match(/....../g).join('-')
        const ciscoFormat   = nothingFormat.match(/..../g).join('.')
        
        nothing.textContent = nothingFormat
        dashes.textContent  = dashesFormat
        colons.textContent  = colonsFormat
        aruba.textContent   = arubaFormat
        cisco.textContent   = ciscoFormat
        outputs.forEach(element => element.style.display = "block")

    } else {
        outputs.forEach(element => element.style.display = "none")
        nothing.textContent = ''
        dashes.textContent  = ''
        colons.textContent  = ''
        aruba.textContent   = ''
        cisco.textContent   = ''
        copy.textContent    = ''
    }
}

function copyThis(event) {
    const text = event.currentTarget.children[1].textContent
    console.log(text);
    if (text != '') {
        input.value = text
        input.select()
        document.execCommand('copy')
        input.blur()
        copy.textContent = `Copied ${text}`
        copy.style.display = "block"
    }
}

function clearInput() {
    input.value = ''
    input.select()
    outputs.forEach(element => element.style.display = "none")
    copy.style.display = "none"
    copy.textContent = null
}