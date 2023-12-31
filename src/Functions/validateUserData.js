export default function validateUserData(data) {
  //a validation function which is executed during signup. It checks the validity of phone numbers (should be 10 digits), and password (should match, in addition to the password rules set by firebase).
  var phoneno = /^\d{10}$/;
  var phoneValid = false;
  var passwordValid = false;

  if (data.phoneNumber.match(phoneno)) {
    phoneValid = true;
  } else {
    phoneValid = false;
  }

  if (data.password === data.password2) {
    passwordValid = true;
  } else {
    passwordValid = false;
  }

  if (phoneValid === true && passwordValid === true) {
    return [true, ""];
  } else if (phoneValid === true && passwordValid === false) {
    return [false, "Passwords don't match"];
  } else if (phoneValid === false && passwordValid === true) {
    return [false, "Invalid phone number"];
  } else {
    return [false, "Phone invalid and passwords don't match"];
  }
}
