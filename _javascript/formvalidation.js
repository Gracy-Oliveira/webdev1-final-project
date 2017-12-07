/*
 * Script: formvalidation.js
 * Author: Gracy Kelly Oliveira
 * Version: 1.0
 * Date Created:
 * Last Updated:
 *
 */
function trim(str)
{
    // Uses a regex to remove spaces from a string.
    return str.replace(/^\s+|\s+$/g,"");
}

function validate(e)
{
    hideErrors();

    //Prevents the form to be submited if it has errors.
    if(formHasErrors())
    {
        e.preventDefault();
        return false;
    }

    return true;
}

function resetForm(e)
{
    // Confirm that the user wants to reset the form.
    if (confirm('Clear Information?') )
    {
        hideErrors();

        document.getElementById("fullname").focus();

        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();

    return false;
}

//Check if the text field has input
function formFieldHasInput(fieldElement)
{
    return fieldElement.value && trim(fieldElement.value);
}

function formHasErrors()
{
    var errorFlag = false;

    //Errors for required fields
    var requiredField = ["fullname", "phoneNum", "email"];

    for (var i = 0; i < requiredField.length; i++) {
        var field = document.getElementById(requiredField[i]);

        if (!formFieldHasInput(field)) {
            var error = document.getElementById(requiredField[i] + "_error");

            error.style.display = "block";

            if (!errorFlag)
            {
                field.focus();
                field.select();
            }

            errorFlag = true;
        }
    }

    //Phone number validation
    var regexPhoneNumber = new RegExp(/\D*([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D*/);

    var phoneNumberField = document.getElementById("phoneNum").value;

    if (!regexPhoneNumber.test(regexPhoneNumber) && formFieldHasInput(phoneNum))
    {
        document.getElementById("phoneNumFormat_error").style.display = "block";

        if (!errorFlag)
        {
            phoneNumberField.focus();
            phoneNumberField.select();
        }

        errorFlag = true;
    }

    //E-mail validation
    var regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    var emailFieldValue = document.getElementById("email").value;

    if (!regexEmail.test(emailFieldValue) && formFieldHasInput(email))
    {
        document.getElementById("emailformat_error").style.display = "block";

        if (!errorFlag)
        {
            emailFieldValue.focus();
            emailFieldValue.select();
        }

        errorFlag = true;
    }

    return errorFlag;
}

function hideErrors()
{
    var errors = document.getElementsByClassName("error");

    for (var i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}

function load()
{
    hideErrors();

    document.getElementById("submit").addEventListener("click", validate);

    document.getElementById("clear").addEventListener("click", resetForm);

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);