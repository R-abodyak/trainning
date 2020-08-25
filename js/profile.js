$(document).ready(function() {
    {

        $('#edit_password').click(function() {

            var password1 = document.getElementById('password1').value;
            var password2 = document.getElementById('password2').value;
            var confirmpassword = document.getElementById('confirm').value;
            $('.change_password_note').html("");
            $('.change_password_error').html("");
            if (password2 !== confirmpassword) {
                $('.change_password_error').html("New password and confirm don't match ")

            } else {

                $.ajax({
                    method: "post",
                    url: "../backend/resetpassword.php",
                    data: {
                        email: $('#email').val(),
                        old: $('#password1').val(),
                        new: $('#password2').val(),

                        confirm_new: $('#confirm').val(),


                    },

                    success: function(data, status, xhr) {




                        $('.change_password_note').html(data);

                    },
                    error: function(xhr, status, err) {
                        alert("eror in response");
                        console.log(err);
                    },
                })



            }


        });






        $('#edit').click(function() {

            $('#Fname').prop("disabled", false);
            $('#Lname').prop("disabled", false);
            $('#phone').prop("disabled", false);


            $('#birth').prop("disabled", false);
            $('#save').prop("disabled", false);

        });

        $('#save').click(function() {

                $.ajax({
                    method: "post",
                    url: "../backend/getprofileinfo.php",
                    data: {
                        save: 1,
                        Fname: $('#Fname').val(),
                        Lname: $('#Lname').val(),
                        phone: $('#phone').val(),
                        birth: $('#birth').val(),
                        email: $('#email').val(),

                    },

                    success: function(data, status, xhr) {

                        $('#Fname').prop("disabled", true);
                        $('#Lname').prop("disabled", true);
                        $('#phone').prop("disabled", true);

                        $('#birth').prop("disabled", true);
                        $('#save').prop("disabled", true);
                        $('.tittle').html("Your changes were successful");

                    },
                    error: function(xhr, status, err) {
                        alert("eror in response");
                        console.log(err);
                    },
                })
            }





        );



        $.ajax({
            method: "post",
            url: "../backend/getprofileinfo.php",
            data: {},

            success: function(data, status, xhr) {
                //alert(data);
                var obj = JSON.parse(data);

                var Fname = obj.first
                var Lname = obj.last;
                var birth = obj.birth;

                var email = obj.email;
                var phone = obj.phone;
                var first = 'Hi' + "     " + obj.first;;
                $('#first').val(first);
                $('#Fname').val(Fname);
                $('#Lname').val(Lname);
                $('#birth').val(birth);;
                $('#email').val(email);
                $('#phone').val(phone);



            },
            error: function(xhr, status, err) {
                alert("eror in response");
                console.log(err);
            },
        })
    }
});