$(document).ready(function() {
    loadMedicinesData();
    $("#addbtn").click(function() {
        var m_name=$("#medicineslist option:selected").text();
        var m_id=$("#medicineslist").val();
        var m_rate=$("#rate").val();
        var qua=$("#quantity").val();
        var amt=m_rate*qua;
        var txt="<tr><td style=\"display: none;\">"+m_id+"</td><td>"+m_name+"</td><td>"+qua+"</td><td>"+m_rate+"</td><td>"+amt+"</td><tr>";
        $('#medicinestbl').append(txt);
    });
    $("#submitBtn").click(function() 
    {
        var pat_id=$.cookie("pat_id");
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/updateMedicinesDetails/'+pat_id,
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data)
            {
                $.ajax({
                    type:"POST",
                    url:'http://localhost:8080/updateMedicinesData/',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    success: function(data)
                    {
                        
                    }
                });
            }
        });
    });
    $("#medicineslist").change(function(){
        var d= $(this).val();
        if(d!=''){
            loadSelectedMedicineData(d);
        }
    });
});
function loadMedicinesData()
{
    $.ajax({
        type:"POST",
        url:'http://localhost:8080/getmedicineslist',
        headers:{
            "Content-Type":"application/json"
        },
        success: function(data)
        {
            var len=data.length;
            if(len>0)
            {
                var arr=data.split(",");
                var med_id=arr[0];
                var med_name=arr[1];
                for(i=0;i<len;i++)
                {
                    $("#medicineslist").append(new Option(med_id,med_name));
                }
            }
        }
    });
}
function loadSelectedMedicineData(med_id)
{
    $.ajax({
        type:"POST",
        url:'http://localhost:8080/getmedicine/'+med_id,
        headers:{
            "Content-Type":"application/json"
        },
        success: function(data)
        {
            len = data.length;
            if(len > 0)
            {
                var arr=data.split(",");
                var med_id=arr[0];
                var med_name=arr[1];
                var med_avail="";
                if(parseInt(arr[2])>0)
                {
                    med_avail="Available"
                }
                else
                {
                    med_avail="Not Available"
                }
                var med_rate=arr[3];
                $("#availability").val(med_avail);
                $("#rate").val(med_rate);
            }
        }
    });
}
$("#quantity").keyup(function(){
    var q=$("#quantity").val();
    var rate=$("#rate").val();
    $("#amount").val(q*rate);
});