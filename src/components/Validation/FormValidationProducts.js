/* eslint-disable no-useless-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
function validateFormProducts(event, state) {
    // clear all error messages
    const inputs = document.getElementsByClassName('is-danger');
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].classList.contains('error')) {
        inputs[i].classList.remove('is-danger');
      }
    }
  
    if (state.hasOwnProperty('name') && state.name === '') {
        document.getElementById('name').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('kcal') && state.kcal === '') {
        document.getElementById('kcal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('fats') && state.fats === '') {
        document.getElementById('fats').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('carbs') && state.carbs === '') {
        document.getElementById('carbs').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('proteins') && state.proteins === '') {
        document.getElementById('proteins').classList.add('is-danger');
        return { blankfield: true };
    }
    // regex expression

    const numberRegexKcal = /^[0-9]{1,3}([,.][0-9]{1,2})?$/;
    const numberRegex = /^[0-9]{1,2}([,.][0-9]{1,2})?$/;

    if (state.hasOwnProperty('kcal') && !numberRegexKcal.test(state.kcal) ) {
        document.getElementById('kcal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('fats') && !numberRegex.test(state.fats) ) {
        document.getElementById('fats').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('saturated') && !numberRegex.test(state.saturated) ) {
        document.getElementById('saturated').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('carbs') && !numberRegex.test(state.carbs) ) {
        document.getElementById('carbs').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('sugars') && !numberRegex.test(state.sugars) ) {
        document.getElementById('sugars').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('proteins') && !numberRegex.test(state.proteins) ) {
        document.getElementById('proteins').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('salt') && !numberRegex.test(state.salt) ) {
        document.getElementById('salt').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
  }
  
  export default validateFormProducts;