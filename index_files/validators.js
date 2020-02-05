const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const cardholderIsValid = (value) => {
  const wordsArr = value ? value.split(' ') : [];
  return wordsArr.length === 2 && wordsArr[1].length > 1 && wordsArr[1].length > 1;
};

const phoneValidator = (value) => {
  const numbers = value.split('').filter(el => !isNaN(el) && el !== ' ');
  return numbers.length === 11;
};

// Mappers (Modify values being validated)
const mapName = (value) => {
  src = value.split(' ').map((word) => {
    const [first, ...rest] = word.split('');
    return first ? [first.toUpperCase(), ...rest].join('') : [];
  });
  return src.join(' ');
}

const mapPhone = (value, pattern = '(___) ___-__-__') => {
  const inputArr = value.split('').filter(el => !isNaN(el) && el !== ' ');
  let key = 0;
  return pattern.split('').map(   
    char => {
      if (char === '_') {
        char = inputArr[key] ? inputArr[key] : char;
        key += 1;
      }
      return char;
    }
  ).join('');
}

const checkField = (fieldName, validator, mapValue = val => val) => {
  const field = $(`#${fieldName}`);
  const nodeToListen = document.getElementById(fieldName);
  if (!nodeToListen) {
    return false;
  }

  nodeToListen.addEventListener('keyup',(e) => {
    field.val(mapValue(field.val()));
  });
  nodeToListen.addEventListener("keyup",(e) => {
    if (validator(field.val())) {
      // text field
      if (field.hasClass("is-invalid")) {
          field.removeClass("is-invalid");
          field.addClass("is-valid");
      }
      field.addClass("is-valid");
      } else {
          field.addClass("is-invalid");
      }
    }
  );
}

const checkPhone = (fieldName, validator) => {
  const field = $(`#${fieldName}`);
  const phoneFieldNode = document.getElementById(fieldName);
  if (!phoneFieldNode) {
    return false;
  }
  phoneFieldNode.addEventListener("keyup",(e) => {
    if (validator(field.val())) {
      // text field
      if (field.hasClass("is-invalid")) {
          field.removeClass("is-invalid");
          field.addClass("is-valid");
      }
      field.addClass("is-valid");
      } else {
          field.addClass("is-invalid");
      }
    }
  );
}

const enableButton = (checkboxes, buttonId, textFields) => {
  const eventHandle = (e) => { 
    const allFildsAreOK = textFields.reduce((result, objForTest) => {
      const fieldValue = $(`#${objForTest.name}`).val();

      if (result === false) {
        return false;
      }

      return objForTest.validateFunction(fieldValue);
    }, true);

    const allCheckboxesAreOk = checkboxes.reduce((result, checkbox) => {
      if (result === false) {
        return false;
      }

      return $(`#${checkbox}`).prop('checked');
    }, true);

    allCheckboxesAreOk && allFildsAreOK ?
      $(`#${buttonId}`).prop('disabled', false) : $(`#${buttonId}`).prop('disabled', true);
  }

  addEventListener('keyup', eventHandle);
  addEventListener('change', eventHandle);
}


// --------------------> Starting validation for fields here
// Validate top form
checkField('name', cardholderIsValid, mapName);
checkField('email', validateEmail);
checkPhone('tel', phoneValidator);
enableButton(['cb'], 'payButton', [
  {
    name: 'name',
    validateFunction: cardholderIsValid
  },
  {
    name: 'email',
    validateFunction: validateEmail
  },
  {
    name: 'tel',
    validateFunction: phoneValidator
  }
]);

// Validate bottom form

checkField('name-bottom', cardholderIsValid, mapName);
checkField('email-bottom', validateEmail);
checkPhone('tel-bottom', phoneValidator);
enableButton(['cb-bottom'], 'payButton-bottom', [
  {
    name: 'name-bottom',
    validateFunction: cardholderIsValid
  },
  {
    name: 'email-bottom',
    validateFunction: validateEmail
  },
  {
    name: 'tel-bottom',
    validateFunction: phoneValidator
  }
]);


// validate modal form 

checkField('name-modal', cardholderIsValid, mapName);
checkField('email-modal', validateEmail);
checkPhone('tel-modal', phoneValidator);
enableButton(['cb-modal'], 'payButton-modal', [
  {
    name: 'name-modal',
    validateFunction: cardholderIsValid
  },
  {
    name: 'email-modal',
    validateFunction: validateEmail
  },
  {
    name: 'tel-modal',
    validateFunction: phoneValidator
  }
]);