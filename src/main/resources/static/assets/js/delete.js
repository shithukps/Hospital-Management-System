$(document).ready(function() {
    enableOptions();
    $("#deletebtn").prop('disabled',true);

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
                    alert("Deleted");
                    $("#ws_pat_id").prop('disabled',false);
                    resetFields();
                    $("#deletebtn").prop('disabled',true);
            }
        });
    });
});
function setFields(data)
{
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
        alert("Empty List");
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
}