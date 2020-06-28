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
            'ws_ssn':ssnid,
            'ws_pat_name':pname,
            'ws_age':age,
            'ws_rtype':rtype,
            'ws_doj':doa,
            'ws_adrs':address,
            'ws_state':state,
            'ws_city':city
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
                if(data=="success")
                {
                    resetFields();
                    alert("Success");
                }
                else
                {
                    alert("Error");
                }
            }
        });
    });
});
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