import Validator from "validator";
import isEmpty from "is-empty";
//Reference for register and login is taken from: https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
//I have made modifications to the solutiona and used it in both staff and student backend and mongoDB database model files.


module.exports = function validateRegisterInput(data){
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email: "";

    data.password = !isEmpty(data.password) ? data.password: "";

    data.password2 = !isEmpty(data.password2) ? data.password2: "";

    //Email Checks
    if(Validator.isEmpty(data.email)

    ) {
        errors.email = "Email field is required";
    } else if(!Validator.isEmail(data.email)

    ) {
        errors.email = "Email is invalid";
    }

    //Password Checks

    if(Validator.isEmpty(data.password)

    ) {
        errors.password = "Password field is required";
    }
    if(Validator.isEmpty(data.password2)

    ) {
        errors.password2 = "Confirm password field is required";
    }
    if(!Validator.isLength(data.password, { min: 6, max: 30}))
    {
        errors.password = "Password must be at least 6 characters";
    }

    if(!Validator.equals(data.password, data.password2)
    ) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors, isValid: isEmpty(errors)
    };

};
