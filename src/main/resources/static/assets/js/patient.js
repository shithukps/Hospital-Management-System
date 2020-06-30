$(document).ready(function() {
    enableOptions();
    $("#submitBtn").click(function() {
        var ssnid=$("#ws_ssn").val();
        var pname=$("#ws_pat_name").val();
        var age=$("#ws_age").val();
        var rtype=$("#ws_rtype").val();
        var doa=$("#ws_doj").val();
        var address=$("#ws_adrs").val();
        var state=$("#ws_state").val();
        var city=$("#ws_city").val();
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
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/register',
            headers:{
                "Content-Type":"application/json"
            },
            data:patientJson,
            success: function(data)
            {
                alert("Success");
                resetFields();
            }
        });
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
        case "Search Patient":window.location.replace("http://localhost:8080/search_patient");
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