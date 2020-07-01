$(document).ready(function() {
    enableOptions();
    $("#ws_ssn").blur(function(){
            var patient_ssn =jQuery.trim($('#ws_ssn').val());
            if(patient_ssn=='')
            {
                $('#errorssn').slideDown();
                $('#errorssn').html('Please provide patient SSN');
            }
            else
            {
                $('#errorssn').slideUp();
            }
        });
        $("#ws_pat_name").blur(function(){
            var patient_name= jQuery.trim($('#ws_pat_name').val());
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
            var patient_age = jQuery.trim($('#ws_age').val());
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
            rtype = jQuery.trim($('#ws_rtype').val());
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
            var doa = jQuery.trim($('#ws_doj').val());


            if(doa=='')
            {
                $('#errordoj').slideDown();
                $('#errordoj').html('Please provide date of admission');
            }

            else
            {
                   $('#errordoa').slideUp();
            }
        });
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
             var city = jQuery.trim($('#ws_city').val());
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
                    $('#errordoj').slideDown();
                    $('#errordoj').html('Please provide date of admission');
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
            url:'http://localhost:8080/register',
            headers:{
                "Content-Type":"application/json"
            },
            data:patientJson,
            success: function(data)
            {
                alert("Registered Successfully");
                resetFields();
            }
        });
        }
    });//end of button click
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
        case "View Patients":window.location.replace("http://localhost:8080/viewPatients");
        break;
        case "Billing":window.location.replace("http://localhost:8080/billing");
        break;
        case "Issue Medicine":window.location.replace("http://localhost:8080/issueMedicine");
        break;
        case "Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }
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
    document.getElementById("ws_ssn").value="";
    document.getElementById("ws_pat_name").value="";
    document.getElementById("ws_age").value="";
    document.getElementById("ws_adrs").value="";
    document.getElementById("ws_city").value="Select";
    document.getElementById("ws_state").value="Select";
    document.getElementById("ws_doj").value="";
    document.getElementById("ws_rtype").value="Select";
}


$("#ws_ssn").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^([0-9])$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorssn').slideDown();
            $("#errorssn").html("Only Numbers are allowed.");
        }
        else
        {
            $('#errorssn').slideUp();
        }
        return isValid;
    });
    $("#ws_ssn").keyup(function(){
            var len=jQuery.trim($("#ws_ssn").val()).length;
            if(len>9)
            {
                $('#errorssn').slideDown();
                $("#errorssn").html("Maximum 9 digits are allowed");
            }
            else
            {
                $('#errorage').slideUp();
            }
    });
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
            var len=jQuery.trim($("#ws_age").val()).length;
            var p_age=jQuery.trim($("#ws_age").val());
            /*if(len>3)
            {
                $('#errorage').slideDown();
                $("#errorage").html("Maximum 3 digits are allowed");
            }*/
             if(p_age>=150)
                        {
                            $('#errorage').slideDown();
                            $("#errorage").html("Please provide a valid age");
                        }
            else
            {
                $('#errorage').slideUp();
            }
    });
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
    });
    /*$("#ws_doj").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var date = new Date($("#ws_doj").val());
        var year = date.getFullYear();

        //var regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/;
        //var isValid = regex.test(String.fromCharCode(keyCode));
        if (year<1970) {
            $('#errordoj').slideDown();
            $("#errordoj").html("Provide a valid date.");
        }
        else
        {
            $('#errordoj').slideUp();
        }
        return isValid;
    });*/