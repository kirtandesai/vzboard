window.targetThing = "";
window.alertActive = false;
window.emailActive = false;
window.userEmailAddress = "";
window.currentMachine = "";
window.key = "";
window.city = "";
window.state = "";
window.country = ""; 
window.zipcode = "";

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
                    'html': "<div align='center'><div> <h3> Thing Name </h3></div><div><input class='userInput' id='userThingInput' placeholder='kinetic-gold' ></div><div><div><h3>Email Address</h3></div><input class='userInput' id='userEmailInput'  placeholder='firstname.lastname@company.com'></div></div>"
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

$("#userThingInput").click(function () {
    console.log("input click");
    if ($("input#userThingInput").val() == "enter val") {
        $("input#userThingInput").val("");
    }
});

$("#userThingSubmit").click(function(){
    console.log("submit clicked");
    freeboard.setDatasourceSettings("Temp", {
            "location": weather.city+', '+weather.region
        });
});

setTimeout(function () {
    freeboard.showDialog($("<div align='center'><div> <h3> Thing Name </h3></div><div><input class='userInput' id='userThingInput' placeholder='kinetic-gold' ></div><div><div><h3>Email Address</h3></div><input class='userInput' id='userEmailInput'  placeholder='firstname.lastname@company.com'></div></div>"), "Enter Thing Name & Email Address", "<button id='userThingSubmit'>Submit</button>", null, function () {
        window.currentMachine = $("#userThingInput").val();
        //window.userEmailAddress = $("#userEmailInput").val();
        window.setEmailAddress(window.userEmailAddress);
        //alert(window.userEmailAddress);
        freeboard.setDatasourceSettings("my_thing_1", {"thing_id": window.currentMachine});
        freeboard.setDatasourceSettings("Local Weather",{"location":'Charlotte, NC'});
        console.log(freeboard.getDatasourceSettings("Temp"));
        window.sendEmailAlert();
//        freeboard.setDatasourceSettings("Google Map", {
//            "latitude": datasources["my_thing_1"]["your_latitude"],
//            "longitude": datasources["my_thing_1"]["your_longitude"]
//        });
//        freeboard.setDatasourceSettings("Temp", {
//            "code": getLocData(datasources["my_thing_1"]["your_latitude"], datasources["my_thing_1"]["your_longitude"])[0];
//        });
    });
}, 1000);
