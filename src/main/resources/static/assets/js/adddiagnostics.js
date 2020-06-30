$(document).ready(function() {
    //enableOptions();
    var pat_id;
    $("#searchBtn").click(function() {
        pat_id=$("#patient_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Enter ID");
        }
        else
        {
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/getPatientDetails/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(data)
                {
                    setPatientData(data);
                    $.ajax({
                        type:"POST",
                        url:'http://localhost:8080/getDiagnosticsDetails/'+pat_id,
                        headers:{
                            "Content-Type":"application/json"
                        },
                        success: function(data)
                        {
                            setDiagnosticsData(data);
                        }
                    });
                }
            });
        }
    });
    $("#addDiagBtn").click(function() {
        $.cookie("pat_id",$("#patient_id").val());
        window.location.replace="http://localhost:8080/diagnosticsList";
    });
});
function setDiagnosticsData(data)
{
    if(data)
    {
        var len = data.length;
        var txt = "";
        if(len > 0)
        {
            for(var i=0;i!=len;i++)
            {
                    var arr=data[i].split(",");
                    var test_name=arr[0];
                    var amount=arr[1];
                    txt += "<tr><td>"+test_name+"</td><td>"+amount+"</td></tr>";
            }
            if(txt != "")
            {
                $('#diagnosticstbl').find("tr:gt(0)").remove();
                $('#diagnosticstbl').append(txt);
            }
        }
    }
}
function setPatientData(data)
{
    var pat_id=$("#patient_id").val();
    var len = data.length;
    if(len > 0)
    {
        var arr=data.split(",");
        var name=arr[0];
        var age=arr[1];
        var address=arr[2];
        var date=arr[3];
        var room=arr[4];
        var join_date=d1.getDate()+'-'+(d1.getMonth()+1)+'-'+d1.getFullYear();
        $("#tdName").text(name);
        $("#tdAge").text(age);
        $("#tdAddress").text(address);
        $("#tdDoj").text(join_date);
        $("#tdRoom").text(room);
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
    $("#patient_id").val('');
}