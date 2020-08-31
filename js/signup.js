jQuery.validator.addMethod("passwordCheck",
    function(value, element, param) {
        if (this.optional(element)) {
            return true;
        } else if (!/[A-Z]/.test(value)) {
            return false;
        } else if (!/[a-z]/.test(value)) {
            return false;
        } else if (!/[0-9]/.test(value)) {
            return false;
        }

        return true;
    },
);

jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please enter a valid phone number");


$("#sign_form").validate({

    rules: {
        first: {
            required: true,
            number: false,
        },
        last: {
            required: true,
        },
        birthday: {
            required: true,
            date: true
        },
        gender: {
            required: true,
        },
        email: {
            required: true,
            email: true,
        },

        phone: {
            required: true,
            phoneUS: true

        },
        password: {
            required: true,
            minlength: 5,
            passwordCheck: true
        },
        confirm: {
            required: true,
            equalTo: "#password1",
        },
    },

    messages: {
        //names not id
        first: {
            required: "First name is required",
            number: "the name shouldn't contains numbers"
        },
        last: {
            required: "Last name is required"
        },
        birthday: {
            required: "Birthday is required",
            date: "please enter valid date"
        },
        gender: {
            required: "Gender is required",
        },
        email: {
            required: "Email is required",
            email: "email should contain @ and valid domain name",
        },

        phone: {
            required: "Phone is required",

        },
        password: {
            required: "Password is required",
            minlength: "password length atleast is 5",
            passwordCheck: "password At least contain 1 uppercase,lowercase 1digit"
        },
        confirm: {
            required: "Confirm Password is required",
            equalTo: "please enter the same password ",
        },
    },
    submitHandler: function(sign_form) {

        $('#sucesse_message').html("");

        $('#erorr_message').html("");

        $.ajax({
            method: "post",
            url: "../backend/checksign.php",
            data: {
                first: $('#first_name').val(),
                last: $('#last_name').val(),
                birthday: $('#birthday').val(),
                Gender: $('#Gender').val(),
                Email1: $('#Email1').val(),
                password: $('#password1').val(),
                confirm: $('#confirm').val(),
                phone: $('#phone').val(),
            },

            success: function(data, status, xhr) {

                var obj = JSON.parse(data);
                $('#sucesse_message').html("");

                $('#erorr_message').html("");

                var error = obj.error;
                var success = obj.success;
                $('#sucesse_message').html(success);

                $('#erorr_message').html(error);
            },
            error: function(xhr, status, err) {
                alert("eror in response");
                console.log(err);
            },
        });



        ;
    }
})


jQuery(document).ready(function() {
    $("#birthday").datepicker({
        changeYear: true,
        changeMonth: true,
        NumberOfMonths: 1,
        showOtherMonths: true,
        showOtherYear: true,
        yearRange: '1930:-16',
        dateFormat: 'yy-mm-dd',

        closeText: "Close",
        prevText: "Earlier",

        showAnim: "fold"
    })
});

$(document).ready(function() {
    // no way succesed to put confirm password in same line so lets have only confirm :))
    if (screen.width < 400) {
        $("#phone_text").html("Confirm");
    } else {
        $("#phone_text").html("Confirm password");
    }

});
$(window).resize(function() {
    if (screen.width < 400) {
        $("#phone_text").html("Confirm");
    } else {
        $("#phone_text").html("Confirm password");
    }
});