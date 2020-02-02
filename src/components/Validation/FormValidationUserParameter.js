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
    // check for blank field in setOwnGoal section
    if (state.hasOwnProperty('kcalGoal') && state.kcalGoal === '' && state.setOwnGoal === true) {
        document.getElementById('kcalGoal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('proteinGoal') && state.proteinGoal === '' && state.setOwnGoal === true) {
        document.getElementById('proteinGoal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('fatGoal') && state.fatGoal === '' && state.setOwnGoal === true) {
        document.getElementById('fatGoal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('carbGoal') && state.carbGoal === '' && state.setOwnGoal === true) {
        document.getElementById('carbGoal').classList.add('is-danger');
        return { blankfield: true };
    }
    // check for blank fields in custom section
    if (state.hasOwnProperty('gender') && state.gender === '' && state.setOwnGoal === false) {
        document.getElementById('gender').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('activity') && state.activity === '' && state.setOwnGoal === false) {
        document.getElementById('activity').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('goal') && state.goal === '' && state.setOwnGoal === false) {
        document.getElementById('goal').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('weight') && state.weight === '' && state.setOwnGoal === false) {
        document.getElementById('weight').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('height') && state.height === '' && state.setOwnGoal === false) {
        document.getElementById('height').classList.add('is-danger');
        return { blankfield: true };
    }
    if (state.hasOwnProperty('age') && state.age === '' && state.setOwnGoal === false) {
        document.getElementById('age').classList.add('is-danger');
        return { blankfield: true };
    }
    
   
    // regex expression

     const numberRegexKcal = /^[0-9]{4}([,.][0-9]{1,2})?$/;
     const numberRegex = /^[0-9]{2,3}([,.][0-9]{1,2})?$/;
    // regex check for setOwnGoal
    if (state.hasOwnProperty('kcalGoal') && !numberRegexKcal.test(state.kcalGoal) && state.setOwnGoal === true ) {
        document.getElementById('kcalGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('proteinGoal') && !numberRegex.test(state.proteinGoal) && state.setOwnGoal === true ) {
        document.getElementById('proteinGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('fatGoal') && !numberRegex.test(state.fatGoal) && state.setOwnGoal === true ) {
        document.getElementById('fatGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('carbGoal') && !numberRegex.test(state.carbGoal) && state.setOwnGoal === true ) {
        document.getElementById('carbGoal').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    // regex check for custom section
    if (state.hasOwnProperty('weight') && !numberRegex.test(state.weight) && state.setOwnGoal === false ) {
        document.getElementById('weight').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('height') && !numberRegex.test(state.height) && state.setOwnGoal === false ) {
        document.getElementById('height').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    if (state.hasOwnProperty('age') && !numberRegex.test(state.age) && state.setOwnGoal === false ) {
        document.getElementById('age').classList.add('is-danger');
        return { blankfield: false ,invalidFormat: true };
    }
    // own callory set makro not match exception
    const calculationSum = state.proteinGoal * 4 + state.fatGoal * 9 + state.carbGoal * 4;

    if ( calculationSum !== Number(state.kcalGoal) && state.setOwnGoal === true ) {
        document.getElementById('kcalGoal').classList.add('is-danger');
        return { invalidSum: true };
    }

  }
  
  export default validateFormUserParameter;