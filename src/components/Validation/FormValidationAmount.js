/* eslint-disable no-useless-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
function validateFormAmount(event, state) {
    // clear all error messages
    const inputs = document.getElementsByClassName('is-danger');
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].classList.contains('error')) {
        inputs[i].classList.remove('is-danger');
      }
    }
  
    if (state.hasOwnProperty('amount') && state.amount === '') {
        document.getElementById('amount').classList.add('is-danger');
        return { blankfield: true };
    }
     // regex expression

     const numberRegexKcal = /^[0-9]{1,4}([,.][0-9]{1,2})?$/;
 
     if (state.hasOwnProperty('amount') && !numberRegexKcal.test(state.amount) ) {
         document.getElementById('amount').classList.add('is-danger');
         return { blankfield: false ,invalidFormat: true };
     }
  }
  
  export default validateFormAmount;