function getTextElementValueById(elementId) {
    const element = document.getElementById(elementId);
    const value = parseInt(element.innerText);
    return value;
}

function getInputTextById(elementId) {
    const element = document.getElementById(elementId);
    const text = element.innerText;
    return text;
}

function setTextElementValueById(elementId, value) {
    const element = document.getElementById(elementId);
    element.innerText = value;
}

function setValueElementById(elementId, value1) {
    const element = document.getElementById(elementId);
    element.value = value1;
}

function getInputValueById(elementId) {
    const element = document.getElementById(elementId);
    const elementValue = element.value;
    return elementValue;
}