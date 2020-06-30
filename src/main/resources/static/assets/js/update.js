$(document).ready(function() {
    enableOptions();
    $("updateBtn").prop('disabled',true);
    $("#ws_pat_id").blur(function(){
        var patient_id = $('#ws_pat_id').val();
        if(patient_id=='')
        {
            $('#errorid').slideDown();
            $('#errorid').html('Please provide patient id');
        }
        else
        {
            $('#errorid').slideUp();
        }
    });
    $("#ws_pat_name").blur(function(){
        var patient_name= $('#ws_pat_name').val();
        if(patient_name=='')
        {
            $('#errorname').slideDown();
            $('#errorname').html('Please provide patient name');
        }
        else
        {
            $('#errorname').slideUp();
        }
    });
    $("#ws_age").blur(function(){
        var patient_age = $('#ws_age').val();
        if(patient_age=='')
        {
            $('#errorage').slideDown();
            $('#errorage').html('Please provide patient age');
        }
        else
        {
            $('#errorage').slideUp();
        }
    });
    $("#ws_rtype").blur(function(){
        rtype = $('#ws_rtype').val();
        if(rtype=='Select')
        {
            $('#errorrtype').slideDown();
            $('#errorrtype').html('Please select room type');
        }
        else
        {
            $('#errorrtype').slideUp();
        }
    });
    $("#ws_doj").blur(function(){
        var doa = $('#ws_doj').val();
        if(doa=='')
        {
            $('#errordoa').slideDown();
            $('#errordoa').html('Please provide date of admission');
        }
        else
        {
               $('#errordoa').slideUp();
        }
    });
    $("#ws_adrs").blur(function(){
        var address = $('#ws_adrs').val();
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
        var state = $('#ws_state').val();
        if(state=='Select')
        {
            $('#errorstate').slideDown();
            $('#errorstate').html('Please provide state');
        }
        else
        {
            $('#errorstate').slideUp();
        }
    });
    $("#ws_city").blur(function(){
         var city = $('#ws_city').val();
         if(city=='Select')
         {
            $('#errorcity').slideDown();
            $('#errorcity').html('Please provide city');
         }
         else
         {
            $('#errorcity').slideUp();
         }
    });
    $("#getBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Provide Patient ID");
        }
        else
        {
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/getdetails/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(data)
                {
                    if(data.toString()!='')
                    {
                        $("#updateBtn").prop('disabled',false);
                        $("#ws_pat_id").prop('disabled',true);
                        setFields(data);
                    }
                    else
                    {
                        alert("Patient Record Not Found");
                    }
                }
            });
        }
    });
    $("#updateBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        var pname=$("#ws_pat_name").val();
        var age=$("#ws_age").val();
        var rtype=$("#ws_rtype").val();
        var doa=$("#ws_doj").val();
        var address=$("#ws_adrs").val();
        var state=$("#ws_state").val();
        var city=$("#ws_city").val();
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
        else if(rtype==''){
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
        else if(state==''){
            $('#errorstate').slideDown();
            $('#errorstate').html('Please provide state');
        }
        else if(city==''){
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
                });
        }
    });
    $("#useroptions").change(function(){
        var d= $(this).val();
        if(d!=''){
            getval(d);
        }
    });

});
function getval(optionData)
{
    switch(optionData)
    {
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
        case "Issue Medicine":window.location.replace("http://localhost:8080/issueMedicine");
        break;
        case "Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }
}
function setFields(data)
{
    len = data.length;
    if(len > 0)
    {
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
    else
    {
        alert("Empty List");
    }
    $("#ws_pat_name").prop('disabled',false);
    $("#ws_age").prop('disabled',false);
    $("#ws_adrs").prop('disabled',false);
    $("#ws_city").prop('disabled',false);
    $("#ws_state").prop('disabled',false);
    $("#ws_doj").prop('disabled',false);
    $("#ws_rtype").prop('disabled',false);
}
function enableOptions()
{
    var uname=$.cookie("username");
    var type=uname.substring(0, 3);
    if(type=="ADE")
    {
        $("#useroptions").append(new Option("Register Patient", "Register Patient"));
        $("#useroptions").append(new Option("Update Patient", "Update Patient"));
        $("#useroptions").append(new Option("Delete Patient", "Delete Patient"));
        $("#useroptions").append(new Option("Search Patient", "Search Patient"));
        $("#useroptions").append(new Option("View Patients", "View Patients"));
        $("#useroptions").append(new Option("Billing", "Billing"));
    }
    else if(type=="PHA")
    {
        $("#useroptions").append(new Option("Issue Medicine", "Issue Medicine"));
    }
    else
    {
        $("#useroptions").append(new Option("Diagnostics", "Diagnostics"));
    }
}
function resetFields()
{
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
}
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
    });
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
    });
    $("#ws_pat_name").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^[A-Za-z]+$/;
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
    });
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
    });
    $("#ws_age").keyup(function(){
            var len=$("#ws_age").val().length;
            if(len>3)
            {
                $('#errorage').slideDown();
                $("#errorage").html("Maximum 3 digits are allowed");
            }
            else
            {
                $('#errorage').slideUp();
            }
    });
    $("#ws_adrs").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^[A-Za-z0-9]+$/;
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
    });
