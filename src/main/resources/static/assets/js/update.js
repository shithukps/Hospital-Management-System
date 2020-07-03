$(document).ready(function() {
  if($.cookie("username") != null){
    $("updateBtn").prop('disabled',true);
    $("#ws_pat_id").blur(function(){
        var patient_id =jQuery.trim($('#ws_pat_id').val());
        if(patient_id==''){
            $('#errorid').slideDown();
            $('#errorid').html('Please provide patient id');
        }
        else{
            $('#errorid').slideUp();
        }
    });//close of blur-ID
    $("#ws_pat_name").blur(function(){
        var patient_name= jQuery.trim($('#ws_pat_name').val());
        if(patient_name==''){
            $('#errorname').slideDown();
            $('#errorname').html('Please provide patient name');
        }
        else{
            $('#errorname').slideUp();
        }
    });//close of blur-name
    $("#ws_age").blur(function(){
        var patient_age = jQuery.trim($('#ws_age').val());
        if(patient_age==''){
            $('#errorage').slideDown();
            $('#errorage').html('Please provide patient age');
        }
        else{
            $('#errorage').slideUp();
        }
    });//close of blur-age
    $("#ws_rtype").blur(function(){
        rtype = jQuery.trim($('#ws_rtype').val());
        if(rtype=='Select'){
            $('#errorrtype').slideDown();
            $('#errorrtype').html('Please select room type');
        }
        else{
            $('#errorrtype').slideUp();
        }
    });//close of blur-room
    $("#ws_doj").blur(function(){
        var doa = jQuery.trim($('#ws_doj').val());
        if(doa==''){
            $('#errordoa').slideDown();
            $('#errordoa').html('Please provide date of admission');
        }
        else{
               $('#errordoa').slideUp();
        }
    });//close of blur-doj
    $("#ws_adrs").blur(function(){
        var address = jQuery.trim($('#ws_adrs').val());
        if(address=='')
        {
            $('#erroradrs').slideDown();
            $('#erroradrs').html('Please provide address');
        }
        else
        {
            $('#erroradrs').slideUp();
        }
    });
    $("#ws_state").blur(function(){
        var state = jQuery.trim($('#ws_state').val());
        if(state=='Select'){
            $('#errorstate').slideDown();
            $('#errorstate').html('Please provide state');
        }
        else{
            $('#errorstate').slideUp();
        }
    });//close of blur-state
    $("#ws_city").blur(function(){
         var city = jQuery.trim($('#ws_city').val());
         if(city=='Select'){
            $('#errorcity').slideDown();
            $('#errorcity').html('Please provide city');
         }
         else{
            $('#errorcity').slideUp();
         }
    });//close of blur-city
    $("#getBtn").click(function() {
        var pat_id=jQuery.trim($("#ws_pat_id").val());
        if(pat_id==''){
            $("#errorid").slideDown();
            $("#errorid").html("Provide Patient ID");
        }
        else{
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/getdetails/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(data){
                    if(data.toString()!=''){
                        $("#updateBtn").prop('disabled',false);

                        setFields(data);
                    }
                    else{
                        alert("Patient Record Not Found");
                    }
                },
                error: function () {
                     $("#errorid").slideDown();
                     $("#errorid").html("Enter a valid Patient ID");
                }
            });//close of ajax-getdetails
        }
    });//close of click-getBtn
    $("#updateBtn").click(function() {
        var pat_id=jQuery.trim($("#ws_pat_id").val());
        var pname=jQuery.trim($("#ws_pat_name").val());
        var age=jQuery.trim($("#ws_age").val());
        var rtype=jQuery.trim($("#ws_rtype").val());
        var doa=jQuery.trim($("#ws_doj").val());
        var address=jQuery.trim($("#ws_adrs").val());
        var state=jQuery.trim($("#ws_state").val());
        var city=jQuery.trim($("#ws_city").val());
        var patientData={
            'patient_name':pname,
            'age':age,
            'room_type':rtype,
            'date_of_admission':doa,
            'address':address,
            'state':state,
            'city':city
        };
        var patientJson=JSON.stringify(patientData);
        if(pat_id==''){
            $('#errorid').slideDown();
            $('#errorid').html('Please provide patient id');
        }
        else if(pname==''){
            $('#errorname').slideDown();
            $('#errorname').html('Please provide patient name');
        }
        else if(age==''){
            $('#errorage').slideDown();
            $('#errorage').html('Please provide patient age');
        }
        else if(rtype=='Select'){
            $('#errorrtype').slideDown();
            $('#errorrtype').html('Please provide room type');
        }
        else if(doa==''){
            $('#errordoa').slideDown();
            $('#errordoa').html('Please provide date of admission');
        }
        else if(address==''){
            $('#erroradrs').slideDown();
            $('#erroradrs').html('Please provide address');
        }
        else if(state=='Select'){
            $('#errorstate').slideDown();
            $('#errorstate').html('Please provide state');
        }
        else if(city=='Select'){
            $('#errorcity').slideDown();
            $('#errorcity').html('Please provide city');
        }
        else{
            $('#errorid').slideUp();
            $('#errorname').slideUp();
            $('#errorage').slideUp();
            $('#errorrtype').slideUp();
            $('#errordoa').slideUp();
            $('#erroradrs').slideUp();
            $('#errorstate').slideUp();
            $('#errorcity').slideUp();
            $.ajax({
                    type:"POST",
                    url:'http://localhost:8080/update/'+pat_id,
                    headers:{
                        "Content-Type":"application/json"
                    },
                    data:patientJson,
                    success: function(data)
                    {
                        if(data.toString()=='')
                        {
                            alert("Updated");
                            resetFields();
                            $("#ws_pat_id").prop('disabled',false);
                            $("#updateBtn").prop('disabled',true);
                        }
                        else
                        {
                            alert("Error");
                        }
                    }
            });//close of ajax-update
        }
    });//close of click-updateBtn
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
       window.location.replace("http://localhost:8080/hospitalLogin");
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
function setFields(data){
    len = data.length;
    if(len > 0){
        var arr=data.split(",");
        var name=arr[0];
        var age=arr[1];
        var room=arr[2];
        var date=arr[3];
        var address=arr[4];
        var state=arr[5];
        var city=arr[6];
        $("#ws_pat_name").val(name);
        $("#ws_age").val(age);
        $("#ws_adrs").val(address);
        $("#ws_city").val(city);
        $("#ws_state").val(state);
        $("#ws_doj").val(date);
        $("#ws_rtype").val(room);
    }
    else{
        alert("Patient ID not found");
    }
    $("#ws_pat_name").prop('disabled',false);
    $("#ws_age").prop('disabled',false);
    $("#ws_adrs").prop('disabled',false);
    $("#ws_city").prop('disabled',false);
    $("#ws_state").prop('disabled',false);
    $("#ws_doj").prop('disabled',false);
    $("#ws_rtype").prop('disabled',false);
}//close of function setFields
function resetFields(){
    $("#ws_pat_id").val('');
    document.getElementById("ws_pat_name").value="";
    document.getElementById("ws_age").value="";
    document.getElementById("ws_adrs").value="";
    document.getElementById("ws_city").value="Select";
    document.getElementById("ws_state").value="Select";
    document.getElementById("ws_doj").value="";
    document.getElementById("ws_rtype").value="Select";
    $("#ws_pat_name").prop('disabled',true);
    $("#ws_age").prop('disabled',true);
    $("#ws_adrs").prop('disabled',true);
    $("#ws_city").prop('disabled',true);
    $("#ws_state").prop('disabled',true);
    $("#ws_doj").prop('disabled',true);
    $("#ws_rtype").prop('disabled',true);
}//close of function resetFields
$("#ws_pat_id").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^([0-9])$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorid').slideDown();
            $("#errorid").html("Only Numbers are allowed.");
        }
        else
        {
            $('#errorid').slideUp();
        }
        return isValid;
});//close of keypress-ID
$("#ws_pat_id").keyup(function(){
            var len=$("#ws_pat_id").val().length;
            if(len>9)
            {
                $('#errorid').slideDown();
                $("#errorid").html("Maximum 9 digits are allowed");
            }
            else
            {
                $('#errorage').slideUp();
            }
});//close of keyup-Id
$("#ws_pat_name").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^[A-Za-z\s]+$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorname').slideDown();
            $("#errorname").html("Only alphabets are allowed.");
        }
        else
        {
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
        }
        else
        {
            $('#errorage').slideUp();
        }
        return isValid;
});//close of keypress-age
$("#ws_age").keyup(function(){
            var len=$("#ws_age").val().length;
            var p_age=jQuery.trim($("#ws_age").val());
            if(p_age>=150)
                        {
                            $('#errorage').slideDown();
                            $("#errorage").html("Please provide a valid age");
                        }
            else
            {
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
        }
        else
        {
            $('#erroradrs').slideUp();
        }
        return isValid;
});//close of keypress address