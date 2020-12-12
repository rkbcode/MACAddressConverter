const input    = document.querySelector('#input')
const nothing  = document.querySelector('#nothing')
const dashes   = document.querySelector('#dashes')
const colons   = document.querySelector('#colons')
const cisco    = document.querySelector('#cisco')
const copy     = document.querySelector('#copy')
const clear    = document.querySelector('#clear')
const outputs  = document.querySelectorAll('.outputMac')

const regex    = /^^([0-9a-fA-F]{2}[:\-]?[0-9a-fA-F]{2}[:\-\.]?){2}[0-9a-fA-F]{2}[:\-]?[0-9a-fA-F]{2}$/

input.addEventListener('input', showMacs)
clear.addEventListener('click', clearInput)
outputs.forEach(output => output.addEventListener('click', copyThis, false))

function showMacs() {
    input.value = input.value.trim()
    let inputValue = input.value.toLowerCase()
    
    if (inputValue.match(regex)) {
        const nothingFormat = inputValue.replace(/[:\-\.]/g, '')
        const splitFormat = nothingFormat.match(/../g)
        const dashesFormat = splitFormat.join('-')
        const colonsFormat = splitFormat.join(':')
        const ciscoFormat = nothingFormat.match(/..../g).join('.')
        
        nothing.textContent = nothingFormat
        dashes.textContent  = dashesFormat
        colons.textContent  = colonsFormat
        cisco.textContent   = ciscoFormat
    } else {
        nothing.textContent = ''
        dashes.textContent  = ''
        colons.textContent  = ''
        cisco.textContent   = ''
        copy.textContent    = ''
    }
}

function copyThis(event) {
    const text = event.target.textContent
    if (text != '') {
        input.value = text
        input.select()
        document.execCommand('copy')
        input.blur()
        copy.textContent = `Copied ${text}`
    }
}

function clearInput() {
    input.value = ''
    input.select()
}