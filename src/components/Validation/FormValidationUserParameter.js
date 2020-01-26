/* eslint-disable no-useless-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
function validateFormUserParameter(event, state) {
    // clear all error messages
    const inputs = document.getElementsByClassName('is-danger');
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].classList.contains('error')) {
        inputs[i].classList.remove('is-danger');
      }
    }
  
    if (state.hasOwnProperty('kcalGoal') && state.kcalGoal === '') {
        document.getElementById('kcalGoal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('proteinGoal') && state.proteinGoal === '') {
        document.getElementById('proteinGoal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('fatGoal') && state.fatGoal === '') {
        document.getElementById('fatGoal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('carbGoal') && state.carbGoal === '') {
        document.getElementById('carbGoal').classList.add('is-danger');
        return { blankfield: true };
    }
     // regex expression

     const numberRegexKcal = /^[0-9]{4}([,.][0-9]{1,2})?$/;
     const numberRegex = /^[0-9]{2,3}([,.][0-9]{1,2})?$/;
 
    if (state.hasOwnProperty('kcalGoal') && !numberRegexKcal.test(state.kcalGoal) ) {
        document.getElementById('kcalGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('proteinGoal') && !numberRegex.test(state.proteinGoal) ) {
        document.getElementById('proteinGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('fatGoal') && !numberRegex.test(state.fatGoal) ) {
        document.getElementById('fatGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('carbGoal') && !numberRegex.test(state.carbGoal) ) {
        document.getElementById('carbGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
  }
  
  export default validateFormUserParameter;