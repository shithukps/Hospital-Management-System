$(document).ready(function() {
    enableOptions();
    $.ajax({
        type:"POST",
        url:'http://localhost:8080/getall',
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
});
function populateTable(data) {
    if(data)
    {
        var len = data.length;
        var txt = "";
        if(len > 0)
        {
            for(var i=0;i!=len;i++)
            {
                if(data[i].id){
                    txt += "<tr><td>"+data[i].patient_id+"</td><td>"+data[i].patient_name+"</td><td>"+data[i].age+"</td><td>"+data[i].address+"</td><td>"+data[i].date_of_admission+"</td><td>"+data[i].room_type+"</td></tr>";
                }
            }
            if(txt != ""){
                $('#patientstbl').find("tr:gt(0)").remove();
                $('#patientstbl').append(txt).removeClass("hidden");
            }
        }
    }
}
function getval(sel)
{
    switch(sel.value)
    {
        case "Register Patient":window.location.replace("patient_registration.html");
        break;
        case "Update Patient":window.location.replace("update_patient.html");
        break;
        case "Delete Patient":window.location.replace("delete_patient.html");
        break;
        case "Search Patient":window.location.replace("search_patient.html");
        break;
        case "View Patient":window.location.replace("view_patients.html");
        break;
        case "Billing":window.location.replace("billing.html");
        break;
        case "Issue Medicine":window.location.replace("issue_medicine.html");
        break;
        case "Diagnostics":window.location.replace("add_diagnostics.html");
        break;
    }
}
function enableOptions()
{
    var uname=$.cookie("username");
    var type=uname.substring(0, 3);
    document.getElementById("admin").disabled=true;
    document.getElementById("pharmasist").disabled=true;
    document.getElementById("diagnostics").disabled=true;
    if(type=="ADE")
    {
        document.getElementById("admin").disabled=false;
    }
    else if(type=="PHA")
    {
        document.getElementById("pharmasist").disabled=false;
    }
    else
    {
        document.getElementById("diagnostics").disabled=false;
    }
}