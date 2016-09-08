window.targetThing = "";
window.alertActive = false;
window.emailActive = false;
window.userEmailAddress = "";
window.currentMachine = "";
window.key = "";

$.support.cors = true;

setTimeout(function () {
    freeboard.showDialog($("<div align='center'><div><input class='userInput'  id='userThingInput'></div><div><input class='userInput'  id='userEmailInput'></div></div>"), "Enter Thing Name & Email Address", "<button id='userThingSubmit'>Submit</button>", null, function () {
        window.userThingInput = $("#userThingInput").val();
        window.userEmailAddress = $("#userEmailInput").val();
        alert(window.userEmailAddress);
        freeboard.setDatasourceSettings("Thing_1", {
            "thing_id": window.userThingInput
        });
    });



}, 1000);
