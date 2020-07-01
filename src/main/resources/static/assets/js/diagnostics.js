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
        $("#diagnosticstbl tr").each(function() {
                        if ($(this).find("td:first").length > 0) {
                                    var d_id = $(this).find("td:first").html();
                                    var patientMedicineData={
                                        'patient_id':pat_id,
                                        'test_id':d_id,
                                    };
                                    var patientDiagnosticsJson=JSON.stringify(patientMedicineData);
                                    $.ajax({
                                        type:"POST",
                                        url:'http://localhost:8080/insertDiagnosticsTrack',
                                        headers:{
                                            "Content-Type":"application/json"
                                        },
                                        data:patientDiagnosticsJson,
                                        success: function(data)
                                        {
                                            alert("Added diagnostics details");
                                            $.removeCookie('pat_id');
                                            window.location.replace("http://localhost:8080/addDiagnostics");
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
                for(i=0;i<data.length;i++) {
                    var d_id=data[i].test_id;
                    var d_name=data[i].test_name;
                    $("#diagnosticslist").append("<option value=\"" +d_id+ "\">" +d_name+ "</option>");
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
                var d_rate=arr[0];
                $("#availability").val(d_rate);
                $("#rate").val(d_rate);
            }
        }
    });
}