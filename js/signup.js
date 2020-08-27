var tmp = 0;
var myfphone;

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        tmp = 0;
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    tmp = 1;
    document.getElementById('invalid_phone').innerHTML = "Wrong Phone";
    return null;
}

function validateForm() {
    var tmp = 0;
    var first_name = document.getElementById('first-name').value;
    var last_name = document.getElementById('last-name').value;
    var birthday = document.getElementById('birthday').value;
    var genderw = document.getElementById('Gender').value;
    var email1 = document.getElementById('Email1').value;
    var phone = document.getElementById('phone').value;
    var password = document.getElementById('password1').value;
    var confipass = document.getElementById('confirm').value;

    var rgx = /^([a-zA_Z0-9\.-]+)@([a-z0-9]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
    var x = rgx.test(email1);
    var res;
    var f = /^(05)[0-9]{8}$/;
    var connum = /^[0-9]/;
    if (last_name === '') {

        document.getElementById("invalid_name2").style.visibility = "visible";
        tmp++;
    }
    if (first_name === '') {
        document.getElementById("invalid_name1").style.visibility = "visible";
        tmp++;
    }



    if (birthday === '') {
        document.getElementById("invalid_birt").style.visibility = "visible";
        tmp++;
    }
    if (genderw === '') {
        document.getElementById("invalid_gender").style.visibility = "visible";
        tmp++;
    }

    if (phone === '') {
        document.getElementById("invalid_phone").style.visibility = "visible";
        tmp++;
    }
    if (password === '') {
        document.getElementById("invalid_pass").style.visibility = "visible";
        tmp++;
    }
    if (confipass === '') {
        document.getElementById("invalid_pass2").style.visibility = "visible";
        tmp++;
    }
    if (!x) {

        document.getElementById("invalid_email").innerHTML = "email should contain @ and valid domain name ";
        tmp++;
    }
    if (email1 === '') {
        document.getElementById("invalid_email").style.visibility = "visible";
        tmp++;
    }

    if (password !== confipass) {
        document.getElementById("invalid_pass2").innerHTML = "no match ";
        document.getElementById("invalid_pass").innerHTML = "no match ";
        tmp++;

    }

    if (connum.test(first_name)) {
        tmp++;
        document.getElementById("invalid_name1").innerHTML = "name shouldnt contain numbers";
    }

    /*   if (  (password.match(/[a-z]/g)) && (password.match(
           /[A-Z]/g)) && (password.match(
           /[0-9]/g))   && (password.length >= 8))
       {   res = "TRUE";}
       else
       {   res = "FALSE";

           tmp12=1;
           document.getElementById("invalid_pass").innerHTML=  "password At least contain 1 uppercase,lowercase 1digit,Minimum length 8 " ;

       }*/
    document.getElementById('phone').value = formatPhoneNumber(phone); // => "+1 (234) 567-8900"
    myfphone = formatPhoneNumber(phone);

    if (tmp != 0) {

        var b = false;
        return b;
    }
    var b = true
    return b;


}

function hide_comment(elem) {

    elem.style.visibility = "hidden";
}
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

$('.sign_btn').click(function() {
    var valid = validateForm();
    $('#sucesse_message').html("");

    $('#erorr_message').html("");
    if (valid) {

        $.ajax({
            method: "post",
            url: "../backend/checksign.php",
            data: {
                first: $('#first-name').val(),
                last: $('#last-name').val(),
                birthday: $('#birthday').val(),
                Gender: $('#Gender').val(),
                Email1: $('#Email1').val(),
                password: $('#password1').val(),
                confirm: $('#confirm').val(),
                phone: myfphone
            },

            success: function(data, status, xhr) {

                var obj = JSON.parse(data);


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
    }


});