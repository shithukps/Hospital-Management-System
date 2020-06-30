$(document).ready(function() {
    enableOptions();
    $("#searchBtn").click(function() {
        var pat_id=$("#patient_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Enter ID");
        }
        else
        {
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/getdetails/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(patientddata)
                {
                    setPatientData(patientddata);
                    $.ajax({
                        type:"POST",
                        url:'http://localhost:8080/getmedicinedetails/'+pat_id,
                        headers:{
                            "Content-Type":"application/json"
                        },
                        success: function(medicinedata)
                        {
                            setMedicineData(medicinedata);
                        }
                    });
                    $.ajax({
                        type:"POST",
                        url:'http://localhost:8080/getdiagnosticsdetails/'+pat_id,
                        headers:{
                            "Content-Type":"application/json"
                        },
                        success: function(data)
                        {
                            setDiagnosticsData(data);
                        }
                    });
                    var grantTotal=$("#billfordiagnostics").val()+$("#billforpharmacy").val()+$("#billforroom").val();
                    $("#grandtotal").val(grantTotal);
                }
            });
        }
    });
    $("#confirmbtn").click(function() {
        var pat_id=$("#patient_id").val();

        $.ajax({
            type:"POST",
            url:'http://localhost:8080/discharge/'+pat_id,
            headers:{
                "Content-Type":"application/json"
            },
            success: function(patientddata)
            {
                alert("Discharged");
                resetFields();
            }
        });
    });
});
function setDiagnosticsData(diagnosticsdata)
{
    if(medicinedata)
    {
        var len = diagnosticsdata.length;
        var txt = "";
        var diagnosticsTotal=0;
        if(len > 0)
        {
            for(var i=0;i!=len;i++)
            {
                    txt += "<tr><td>"+diagnosticsdata[i].test+"</td><td>"+diagnosticsdata[i].amount+"</td></tr>";
                    diagnosticsTotal=diagnosticsTotal+diagnosticsdata[i].amount;
            }
            if(txt != "")
            {
                $('#diagnosticstbl').append(txt);
                $("#billfordiagnostics").val(diagnosticsTotal);
            }
        }
    }
}
function setMedicineData(medicinedata)
{
    if(medicinedata)
    {
        var len = medicinedata.length;
        var txt = "";
        var pharmacyTotal=0;
        if(len > 0)
        {
            for(var i=0;i!=len;i++)
            {
                    var amount=medicinedata[i].quantity*medicinedata[i].rate
                    txt += "<tr><td>"+medicinedata[i].medicine+"</td><td>"+medicinedata[i].quantity+"</td><td>"+medicinedata[i].rate+"</td><td>"+amount+"</td></tr>";
                    pharmacyTotal=pharmacyTotal+amount;
            }
            if(txt != "")
            {
                $('#pharmacytbl').append(txt);
                $("#billforpharmacy").val(pharmacyTotal);
            }
        }
    }
}
function setPatientData(patientddata)
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
        var joinDate=new Date(date);
        var today=new Date();
        var leaveDate=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var Difference_In_Time = today.getTime() - joinDate.getTime(); 
        var noofdays = Difference_In_Time / (1000 * 3600 * 24);
        var txt = "";
        txt += "<td>"+name+"</td><td>"+age+"</td><td>"+address+"</td><td>"+date+"</td><td>"+leaveDate+"</td><td>"+room+"</td></tr>";
        if(txt != "")
        {
            $('#patientstbl').find("tr:gt(0)").remove();   
            $('#patientstbl').append(txt); 
        }
        $("#noofdays").val(noofdays);
        if(room=="General")
        {
            $("#billforroom").val(noofdays*2000);
        }
        else if(room=="Semi")
        {
            $("#billforroom").val(noofdays*4000);
        }
        else
        {
            $("#billforroom").val(noofdays*8000);
        }
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
    $("#patientstbl > tr").eq(1).children('td').eq(1).remove();
    $("#patientstbl > tr").eq(1).children('td').eq(2).remove();
    $("#patientstbl > tr").eq(1).children('td').eq(3).remove();
    $("#patientstbl > tr").eq(1).children('td').eq(4).remove();
    $("#patientstbl > tr").eq(1).children('td').eq(5).remove();
    $("#patientstbl > tr").eq(1).children('td').eq(6).remove();
    $("#pharmacytbl").find("tr:gt(0)").remove();
    $("#diagnosticstbl").find("tr:gt(0)").remove();
    $("#billforroom").val('');
    $("#noofdays").val('');
    $("#billforpharmacy").val('');
    $("#billfordiagnostics").val('');
    $("#grandtotal").val('');
}