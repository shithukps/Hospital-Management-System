$(document).ready(function() {
    enableOptions();
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
                url:'http://localhost:8080/getBillingDetails/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(data)
                {
                    setPatientData(data);
                    $.ajax({
                        type:"POST",
                        url:'http://localhost:8080/getMedicineDetails/'+pat_id,
                        headers:{
                            "Content-Type":"application/json"
                        },
                        success: function(data)
                        {
                            setMedicineData(data);
                        }
                    });
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
                    var grantTotal=$("#billfordiagnostics").val()+$("#billforpharmacy").val()+$("#billforroom").val();
                    $("#grandtotal").val(grantTotal);
                }
            });
        }
    });
    $("#confirmbtn").click(function() {
        pat_id=$("#patient_id").val();

        $.ajax({
            type:"POST",
            url:'http://localhost:8080/discharge/'+pat_id,
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data)
            {
                alert("Discharged");
                resetFields();
            }
        });
    });

function setDiagnosticsData(data)
{
    if(data)
    {
        var len = data.length;
        var txt = "";
        var diagnosticsTotal=0;
        if(len > 0)
        {
            for(var i=0;i!=len;i++)
            {
                    var arr=data[i].split(",");
                    var test_name=arr[0];
                    var amount=arr[1];
                    txt += "<tr><td>"+test_name+"</td><td>"+amount+"</td></tr>";
                    diagnosticsTotal=diagnosticsTotal+amount;
            }
            if(txt != "")
            {
                $('#diagnosticstbl').append(txt);
                $("#billfordiagnostics").val(diagnosticsTotal);
            }
        }
    }
}
function setMedicineData(data)
{
    if(data)
    {
        var len = data.length;
        var txt = "";
        var pharmacyTotal=0;
        if(len > 0)
        {
            for(var i=0;i!=len;i++)
            {
                    var arr=data[i].split(",");
                    var medicine_name=arr[0];
                    var qty_issued=arr[1];
                    var rate=arr[2];
                    var amount=qty_issued*rate;
                    txt += "<tr><td>"+medicine_name+"</td><td>"+qty_issued+"</td><td>"+rate+"</td><td>"+amount+"</td></tr>";
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
function setPatientData(data)
{
    len = data.length;
    if(len > 0)
    {
        var arr=data.split(",");
        var name=arr[0];
        var age=arr[1];
        var address=arr[2];
        var date=arr[3];
        var room=arr[4];
        var d1=new Date(date);
        var today=new Date();
        var join_date=d1.getDate()+'-'+(d1.getMonth()+1)+'-'+d1.getFullYear();
        var leaveDate=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var noofdays =Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()) ) /(1000 * 60 * 60 * 24))
        $("#tdName").text(name);
        $("#tdAge").text(age);
        $("#tdAddress").text(address);
        $("#tdDoj").text(join_date);
        $("#tdDol").text(leaveDate);
        $("#tdRoom").text(room);
//        var txt = "";
//        txt += "<td><input type=\"text\" id=\"patient_id\" name=\"patient_id\" value="+pat_id+"><input type=\"button\" id=\"searchBtn\" name=\"searchBtn\" value=\"Search\"></td><td>"+name+"</td><td>"+age+"</td><td>"+address+"</td><td>"+join_date+"</td><td>"+leaveDate+"</td><td>"+room+"</td></tr>";
//        if(txt != "")
//        {
//            $('#patientstbl').find("tr:gt(0)").remove();
//            $('#patientstbl').append(txt);
//        }
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

});