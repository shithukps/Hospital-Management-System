$(document).ready(function() {
    loadDiagnosticsData();
    $("#addbtn").click(function() {
        var d_name=$("#diagnosticslist option:selected").text();
        var d_id=$("#diagnosticslist").val();
        var d_amount=$("#rate").val();
        var txt="<tr><td style=\"display: none;\">"+d_id+"</td><td>"+d_name+"</td><td>"+d_amount+"</td><tr>";
        $('#diagnosticstbl').append(txt);
    });
    $("#submitBtn").click(function() 
    {
        var pat_id=$.cookie("pat_id");
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/updateDiagnosticsDetails/'+pat_id,
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data)
            {
                $.ajax({
                    type:"POST",
                    url:'http://localhost:8080/updateDiagnosticsList/'+d_id,
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
    $("#diagnosticslist").change(function(){
        var d= $(this).val();
        if(d!=''){
            loadSelectedDiagnosticData(d);
        }
    });
});
function loadDiagnosticsData()
{
    $.ajax({
        type:"POST",
        url:'http://localhost:8080/getDiagnosticsList',
        headers:{
            "Content-Type":"application/json"
        },
        success: function(data)
        {
            var len=data.length;
            if(len>0)
            {
                var arr=data.split(",");
                var d_id=arr[0];
                var d_name=arr[1];
                for(i=0;i<len;i++)
                {
                    $("#diagnosticslist").append(new Option(d_id,d_name));
                }
            }
        }
    });
}
function loadSelectedDiagnosticData(d_id)
{
    $.ajax({
        type:"POST",
        url:'http://localhost:8080/getDiagnostics/'+d_id,
        headers:{
            "Content-Type":"application/json"
        },
        success: function(data)
        {
            len = data.length;
            if(len > 0)
            {
                var arr=data.split(",");
                var d_id=arr[0];
                var d_name=arr[1];
                var d_rate=arr[3];
                $("#availability").val(d_avail);
                $("#rate").val(d_rate);
            }
        }
    });
}