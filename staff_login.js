import Validator from "validator";
import isEmpty from "is-empty";

//Reference for register and login is taken from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
//I have made modifications to the solutiona and used it in both staff and student backend and mongoDB database model files.

module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password: "";

    // Email Checks
    if(Validator.isEmpty(data.email)
    ) {
        errors.email = "email field is required";
    }
    // Password checks
    if(Validator.isEmpty(data.password)

    ) {
        errors.password = "Password field is required";
    }

    return {
        errors, isValid: isEmpty(errors)
    };

};
