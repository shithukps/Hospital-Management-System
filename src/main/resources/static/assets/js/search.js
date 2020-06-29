$(document).ready(function() {
    enableOptions();
    $("#searchBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Error");
        }
        else
        {
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/search/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(data)
                {
                    if(data.toString()!='')
                    {
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
});
function setFields(data)
{
    $("#ws_pat_name").val(data.patient_name);
    $("#ws_age").val(data.age);
    $("#ws_adrs").val(data.address);
    $("#ws_city").val(data.city);
    $("#ws_state").val(data.state);
    $("#ws_doj").val(data.date_of_admission);
    $("#ws_rtype").val(data.room_type);
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