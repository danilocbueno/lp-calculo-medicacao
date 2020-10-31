document.addEventListener("DOMContentLoaded", function () {
    document.forms["contact-form"].addEventListener("submit", postData);
});

function postData(formsubmission) {

    const $name = document.getElementById("name");
    const $email = document.getElementById("email");
    const $phone = document.getElementById("phone");
    const $message = document.getElementById("message");

    var name = encodeURIComponent($name.value);
    var email = encodeURIComponent($email.value);
    var phone = encodeURIComponent($phone.value);
    var message = encodeURIComponent($message.value);

    // Checks if fields are filled-in or not, returns response "<p>Please enter your details.</p>" if not.
    if (name == "" || email == "" || phone == "" || message == "") {
        document.getElementById("response").innerHTML = "<p>Por favor, preencha os campos corretamente.</p>";
        return;
    }

    // Parameters to send to PHP script. The bits in the "quotes" are the POST indexes to be sent to the PHP script.
    var params = "name=" + name + "&email=" + email + "&phone=" + phone + "&message=" + message;

    var http = new XMLHttpRequest();
    http.open("POST", "mail.php", true);

    // Set headers
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            const response = http.responseText;

            if(response.trim() == "") {
                $name.value="";
                $email.value="";
                $phone.value="";
                $message.value="";
            }

            document.getElementById("response").innerHTML = response;
        }
    }
    http.send(params);
    formsubmission.preventDefault();
}