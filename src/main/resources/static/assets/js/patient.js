$(document).ready(function() {
  if($.cookie("username") != null){
    $("#ws_ssn").blur(function(){
            var patient_ssn =jQuery.trim($('#ws_ssn').val());
            var len=patient_ssn.length;
            if(patient_ssn==''){
                $('#errorssn').slideDown();
                $('#errorssn').html('Please provide patient SSN');
                return false;
            }
            else if(len!=9){
                $('#errorssn').slideDown();
                $("#errorssn").html("SSNID is 9 Digit number");
                return false;
            }
            else{
                $('#errorssn').slideUp();
            }
    });//close of blur function of ssn input
    $("#ws_pat_name").blur(function(){
            var patient_name= jQuery.trim($('#ws_pat_name').val());
            if(patient_name==''){
                $('#errorname').slideDown();
                $('#errorname').html('Please provide patient name');
                return false;
            }
            else{
                $('#errorname').slideUp();
            }
    });//close of blur function of patient name
    $("#ws_age").blur(function(){
            var patient_age = jQuery.trim($('#ws_age').val());
            if(patient_age=='')
            {
                $('#errorage').slideDown();
                $('#errorage').html('Please provide patient age');
                return false;
            }
            else
            {
                $('#errorage').slideUp();
            }
    });//close of blur function of age
    $("#ws_rtype").blur(function(){
            rtype = jQuery.trim($('#ws_rtype').val());
            if(rtype=='Select')
            {
                $('#errorrtype').slideDown();
                $('#errorrtype').html('Please select room type');
                return false;
            }
            else
            {
                $('#errorrtype').slideUp();
            }
    });//close of blur function of room type
    $("#ws_doj").blur(function(){
            var doa = jQuery.trim($('#ws_doj').val());
            if(doa==''){
                $('#errordoj').slideDown();
                $('#errordoj').html('Please provide date of admission');
                return false;
            }
            else{
                   $('#errordoj').slideUp();
            }
    });//close of blur function of doj
    $("#ws_adrs").blur(function(){
            var address = jQuery.trim($('#ws_adrs').val());
            if(address=='')
            {
                $('#erroradrs').slideDown();
                $('#erroradrs').html('Please provide address');
                return false;
            }
            else
            {
                $('#erroradrs').slideUp();
            }
    });//close of blur function of address
    $("#ws_state").blur(function(){
            var state = jQuery.trim($('#ws_state').val());
            if(state=='Select'){
                $('#errorstate').slideDown();
                $('#errorstate').html('Please provide state');
                return false;
            }
            else{
                $('#errorstate').slideUp();
            }
    });//close of blur function of state
    $("#ws_city").blur(function(){
             var city = jQuery.trim($('#ws_city').val());
             if(city=='Select'){
                $('#errorcity').slideDown();
                $('#errorcity').html('Please provide city');
                return false;
             }
             else{
                $('#errorcity').slideUp();
             }
    });//close of blur function of city
    $("#submitBtn").click(function() {
        var ssnid=jQuery.trim($("#ws_ssn").val());
        var pname=jQuery.trim($("#ws_pat_name").val());
        var age=jQuery.trim($("#ws_age").val());
        var rtype=jQuery.trim($("#ws_rtype").val());
        var doa=jQuery.trim($("#ws_doj").val());
        var address=jQuery.trim($("#ws_adrs").val());
        var state=jQuery.trim($("#ws_state").val());
        var city=jQuery.trim($("#ws_city").val());
        var patientData={
            'ssnid':ssnid,
            'patient_name':pname,
            'age':age,
            'room_type':rtype,
            'date_of_admission':doa,
            'address':address,
            'state':state,
            'city':city
        };
        var patientJson=JSON.stringify(patientData);
        if(ssnid==''){
                    $('#errorssn').slideDown();
                    $('#errorssn').html('Please provide patient SSN');
                    return false;
        }
        else if(ssnid.length!=9){
                    $('#errorssn').slideDown();
                    $("#errorssn").html("SSNID is 9 Digit number");
                    return false;
        }
        else if(pname==''){
                   $('#errorname').slideDown();
                   $('#errorname').html('Please provide patient name');
                   return false;
        }
        else if(age==''){
                   $('#errorage').slideDown();
                   $('#errorage').html('Please provide patient age');
                   return false;
        }
        else if(age>150){
                   $('#errorage').slideDown();
                   $('#errorage').html('Please provide a valid age');
                   return false;
        }
        else if(doa==''){
                   $('#errordoj').slideDown();
                   $('#errordoj').html('Please provide date of admission');
                   return false;
        }
        else if(rtype=='Select'){
                   $('#errorrtype').slideDown();
                   $('#errorrtype').html('Please provide room type');
                   return false;
        }
        else if(address==''){
                   $('#erroradrs').slideDown();
                   $('#erroradrs').html('Please provide address');
                   return false;
        }
        else if(state=='Select'){
                   $('#errorstate').slideDown();
                   $('#errorstate').html('Please provide state');
                   return false;
        }
        else if(city=='Select'){
                   $('#errorcity').slideDown();
                   $('#errorcity').html('Please provide city');
                   return false;
        }
        else{
                   $('#errorssn').slideUp();
                   $('#errorname').slideUp();
                   $('#errorage').slideUp();
                   $('#errorrtype').slideUp();
                   $('#errordoj').slideUp();
                   $('#erroradrs').slideUp();
                   $('#errorstate').slideUp();
                   $('#errorcity').slideUp();
                   $.ajax({
                        type:"POST",
                        url:'http://localhost:8080/register', //Inserting patient details to patient table
                        headers:{
                            "Content-Type":"application/json"
                        },
                        data:patientJson,
                        success: function(data){
                            alert("Registered Successfully");
                            resetFields(); //clear the fields
                        }
                   });//close of ajax-register
        }//close of if-checking text box empty
    });//end of button click-submitBtn
    $("#adminoptions").change(function(){
            var d= $(this).val();
            if(d!=''){
                getval(d);
            }
        });//close of change event handler of adminoptions
        $("#pharmacyoptions").change(function(){
                var d= $(this).val();
                if(d!=''){
                    getval(d);
                }
        });//close of change event handler of pharmacyoptions
            $("#diagnosticsoptions").change(function(){
                    var d= $(this).val();
                    if(d!=''){
                        getval(d);
                    }
        });//close of change event handler of diagnosticsoptions
  }
  else{
    window.location.replace("http://localhost:8080/login");
  }
  $("#logoutBtn").click(function(){
      $.removeCookie('username');
      window.location.replace("http://localhost:8080/hospitalLogin");
    });//Close of event handler of logout button
});//close of document.ready
function getval(optionData){
    switch(optionData){
        case "Register Patient":window.location.replace("http://localhost:8080/registration");
        break;
        case "Update Patient":window.location.replace("http://localhost:8080/updatePatient");
        break;
        case "Delete Patient":window.location.replace("http://localhost:8080/deletePatient");
        break;
        case "Search Patient":window.location.replace("http://localhost:8080/searchPatients");
        break;
        case "View Patient":window.location.replace("http://localhost:8080/viewPatients");
        break;
        case "Billing":window.location.replace("http://localhost:8080/billing");
        break;
        case "Issue Medicine":window.location.replace("http://localhost:8080/issueMedicines");
        break;
        case "Add Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }//close of switch
}//close of function getval
function resetFields(){
    document.getElementById("ws_ssn").value="";
    document.getElementById("ws_pat_name").value="";
    document.getElementById("ws_age").value="";
    document.getElementById("ws_adrs").value="";
    document.getElementById("ws_city").value="Select";
    document.getElementById("ws_state").value="Select";
    document.getElementById("ws_doj").value="";
    document.getElementById("ws_rtype").value="Select";
}//close of function resetFields
$("#ws_ssn").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^([0-9])$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorssn').slideDown();
            $("#errorssn").html("Only Numbers are allowed.");
            return false;
        }
        else{
            $('#errorssn').slideUp();
        }
        return isValid;
});//close of keypress-ssn
$("#ws_ssn").keyup(function(){
            var len=jQuery.trim($("#ws_ssn").val()).length;
            if(len>9){
                $('#errorssn').slideDown();
                $("#errorssn").html("Maximum 9 digits are allowed");
                return false;
            }
            else{
                $('#errorage').slideUp();
            }
});//close of keyup-ssn
$("#ws_pat_name").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^[A-Za-z\s]+$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorname').slideDown();
            $("#errorname").html("Only alphabets are allowed.");
            return false;
        }
        else{
            $('#errorname').slideUp();
        }
        return isValid;
});//close of keypress-name
$("#ws_age").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
         var regex = /^([0-9])$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorage').slideDown();
            $("#errorage").html("Only numbers are allowed.");
            return false;
        }
        else
        {
            $('#errorage').slideUp();
        }
        return isValid;
});//close of keypress-age
$("#ws_age").keyup(function(){
        var len=jQuery.trim($("#ws_age").val()).length;
        var p_age=jQuery.trim($("#ws_age").val());
        if(p_age>=150){
            $('#errorage').slideDown();
            $("#errorage").html("Please provide a valid age");
            return false;
        }
        else{
                $('#errorage').slideUp();
        }
});//close of keyup-age
$("#ws_adrs").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^[A-Za-z0-9\s]+$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#erroradrs').slideDown();
            $("#erroradrs").html("Only Alphabets and Numbers allowed.");
            return false;
        }
        else{
            $('#erroradrs').slideUp();
        }
        return isValid;
});//close of keypress-address