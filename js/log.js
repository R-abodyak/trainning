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

$("#log_form").validate({

    rules: {
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 5,
            passwordCheck: true
        },
    },

    messages: {
        //name not id
        email: {
            required: "Email is required",
            email: "email should contain @ and valid domain name",
        },
        password: {
            required: "Password is required",
            minlength: "password length atleast is 5",
            passwordCheck: "password At least contain 1 uppercase,lowercase 1digit"
        },

    },
    submitHandler: function(log_form) {


        $.ajax({
            method: "post",
            url: "../backend/checklogin.php",
            data: {
                email: $('#exampleInputEmail1').val(),
                password: $('#exampleInputPassword1').val()
            },

            success: function(data, status, xhr) {


                if (data == 1) {
                    $('#note').show();
                    $('#note').html("invalid email or password");
                } else {

                    window.location.href = "profile.html";

                }
            },
            error: function(xhr, status, error) {
                alert("eror in response");
                console.log(error);
            },
        });
    }


});


function showpass() {
    var password_element = document.getElementById("exampleInputPassword1");
    if (password_element.type === "password") {
        password_element.type = "text";
    } else {
        password_element.type = "password";
    }

}