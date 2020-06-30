$(document).ready(function() {
    enableOptions();
    $("#deletebtn").prop('disabled',true);
    $("#getBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Enter Patient ID");
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
                        $("#deletebtn").prop('disabled',false);
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
    $("#deletebtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/delete/'+pat_id,
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data)
            {
                if(data=="success")
                {
                    alert("Deleted");
                    $("#ws_pat_id").prop('disabled',false);
                    resetFields();
                    $("#deletebtn").prop('disabled',true);
                }
                else
                {
                    alert("Error");
                }
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
        $("#ws_pat_name").prop('disabled',false);
        $("#ws_age").prop('disabled',false);
        $("#ws_adrs").prop('disabled',false);
        $("#ws_city").prop('disabled',false);
        $("#ws_state").prop('disabled',false);
        $("#ws_doj").prop('disabled',false);
        $("#ws_rtype").prop('disabled',false);
    }
    else
    {
        alert("Empty List");
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
    $("#ws_pat_id").val('');
    document.getElementById("ws_pat_name").value="";
    document.getElementById("ws_age").value="";
    document.getElementById("ws_adrs").value="";
    document.getElementById("ws_city").value="";
    document.getElementById("ws_state").value="";
    document.getElementById("ws_doj").value="";
    document.getElementById("ws_rtype").value="";
    $("#ws_pat_name").prop('disabled',true);
    $("#ws_age").prop('disabled',true);
    $("#ws_adrs").prop('disabled',true);
    $("#ws_city").prop('disabled',true);
    $("#ws_state").prop('disabled',true);
    $("#ws_doj").prop('disabled',true);
    $("#ws_rtype").prop('disabled',true);
}