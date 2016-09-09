window.targetThing = "";
window.alertActive = false;
window.emailActive = false;
window.userEmailAddress = "";
window.currentMachine = "";
window.key = "";

$.support.cors = true;

window.sendEmailAlert = function () {
    window.emailActive = true;
    if (window.userEmailAddress !== '') {
        $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': window.key,
                'message': {
                    'from_email': 'alerts@freeboard.io',
                    'to': [
                        {
                            'email': window.userEmailAddress,
                            'type': 'to'
                            }
                        ],
                    'autotext': 'true',
                    'subject': 'Thing ' + +' Alert!',
                    'html': 'Mix out on Machine 1 at Store 1111.'
                }
            }
        }).done(function (response) {});
    }
};
window.setEmailAddress = function (email) {
    window.userEmailAddress = email;
}
window.resetEmail = function () {
    window.emailActive = false;
}
$('input#userThingInput').click(function () {
    if ($("input#userThingInput").val() == "enter val") {
        $("input#userThingInput").val("");
        alert($("input#userThingInput").val());
    }
});
setTimeout(function () {
    freeboard.showDialog($("<div align='center'><div><input class='userInput' value='Thing Name'  id='userThingInput'></div><div><input class='userInput' value='Email'  id='userEmailInput'></div></div>"), "Enter Thing Name & Email Address", "<button id='userThingSubmit'>Submit</button>", null, function () {
        window.currentMachine = $("#userThingInput").val();
        //window.userEmailAddress = $("#userEmailInput").val();
        window.setEmailAddress(window.userEmailAddress);
        //alert(window.userEmailAddress);
        freeboard.setDatasourceSettings("Thing_1", {
            "thing_id": window.currentMachine
        });
    });
}, 1000);
