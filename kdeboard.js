window.targetThing = "";
window.alertActive = false;
window.emailActive = false;
window.userEmailAddress = "";
window.currentMachine = "";
window.key = "";
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

window.getLocData = function (lat,long){
    var urltxt = '';
    urltxt = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true';
    //$.ajax({ url:'http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true',
    $.ajax({ url: urltxt,
         success: function(data){
             if (count(data.results[0]) > 0) {
                 //break up the components
                 $arrComponents = data.results[0]->address_components;
                 
                 foreach($arrComponents as $index=>$component) {
                     $type = $component->types[0];
                     if ($window.zipcode == "" && ($type == "postal_code") ) {
                         $window.zipcode = trim($component->short_name);
                     }
                     if ($window.city == "" && ($type == "sublocality_level_1" || $type == "locality") ) {
                         $window.city = trim($component->short_name);
                     }
                     if ($window.state == "" && $type=="administrative_area_level_1") {
                        $window.state = trim($component->short_name);
                     }
                     if ($window.country == "" && $type=="country") {
                        $window.country = trim($component->short_name);

                        if ($blnUSA && $window.country!="US") {
                            $city = "";
                            $state = "";
                            break;
                        }
                     }
                     if ($city != "" && $state != "" && $country != "") {
                        //we're done
                        break;
                     }
                     
                     $arrReturn = array("zipcode"=>$window.zipcode,"city"=>$window.city, "state"=>$window.state, "country"=>$window.country);
                     die(json_encode($arrReturn));
                }
             //alert(data.results[0].formatted_address);
             /* iterate the components for only the city and state*/
            
           }}
           })}

$('input#userThingInput').click(function () {
    if ($("input#userThingInput").val() == "enter val") {
        $("input#userThingInput").val("");
    }
});
setTimeout(function () {
    freeboard.showDialog($("<div align='center'><div> <h3> Thing Name </h3></div><div><input class='userInput' id='userThingInput' placeholder='kinetic-gold' ></div><div><div><h3>Email Address</h3></div><input class='userInput' id='userEmailInput'  placeholder='firstname.lastname@company.com'></div></div>"), "Enter Thing Name & Email Address", "<button id='userThingSubmit'>Submit</button>", null, function () {
        window.currentMachine = $("#userThingInput").val();
        //window.userEmailAddress = $("#userEmailInput").val();
        window.setEmailAddress(window.userEmailAddress);
        //alert(window.userEmailAddress);
        freeboard.setDatasourceSettings("my_thing_1", {
            "thing_id": window.currentMachine
        });
        freeboard.setDatasourceSettings("Google Map", {
            "latitude": datasources["my_thing_1"]["your_latitude"],
            "longitude": datasources["my_thing_1"]["your_longitude"]
        });
        freeboard.setDatasourceSettings("Temp", {
            "code": getLocData(datasources["my_thing_1"]["your_latitude"], datasources["my_thing_1"]["your_longitude"])[0];
        });
    });
}, 1000);
