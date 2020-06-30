$(document).ready(function() {
    enableOptions();
    $.ajax({
        type:"POST",
        url:'http://localhost:8080/getAll',
        headers:{
            "Content-Type":"application/json"
        },
        success: function(data)
        {
            if(data.toString()!='')
            {
                populateTable(data);
            }
            else
            {
                alert("No Records");
            }
        }
    });
    $("#useroptions").change(function(){
        var d= $(this).val();
        if(d!=''){
            getval(d);
        }
    });
});
function populateTable(data)
{
    if(data)
    {
        var len = data.length;
        var txt = "";
        if(len > 0)
        {
            for(var i=0;i!=len;i++)
            {
                    txt += "<tr><td>"+data[i].patient_id+"</td><td>"+data[i].patient_name+"</td><td>"+data[i].age+"</td><td>"+data[i].address+"</td><td>"+data[i].date_of_admission+"</td><td>"+data[i].room_type+"</td></tr>";
            }
            if(txt != "")
            {
                $('#patientstbl').find("tr:gt(0)").remove();
            }
        }
    }
}
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