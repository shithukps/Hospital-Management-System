$(document).ready(function() 
{
    if($.cookie("username") != null)
    {
        var uname=$.cookie("username");
        var type=uname.substring(0, 3);
        if(type=="ADE")
        {
            $("#options").removeClass("hidden");
        }
        loadDiagnosticsData();
        $("#addbtn").click(function() 
        {
            var d_name=$("#diagnosticslist option:selected").text();
            var d_id=$("#diagnosticslist").val();
            var d_amount=$("#rate").val();
            var txt="<tr><td style=\"display: none;\">"+d_id+"</td><td>"+d_name+"</td><td>"+d_amount+"</td><tr/>";
            $('#diagnosticstbl').append(txt);//to populate table
        });//close of click-addbtn
        $("#submitBtn").click(function() 
        {
            var notyf = new Notyf({
                position:
                {
                    x: 'right',
                    y: 'top',
                }
            });
            notyf.success('Diagnostic Details Added');
            var pat_id=$.cookie("pat_id"); //getting the patient id from addDiagnotic page
            $("#diagnosticstbl tr").each(function() 
            {
                if($(this).find("td:first").length > 0) 
                {
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
                            //alert("Added");
                        }
                    });//close of ajax-insertDiagnosticsTrack
                }//close of if
            });//close of iterating through table rows
            $.removeCookie('pat_id');//removing value of cookie
            window.location.replace("http://localhost:8080/addDiagnostics");//redirecting the page
        });//close of click-submitBtn
        $("#diagnosticslist").change(function(){
            var d= $(this).val();
            if(d!=''){
                loadSelectedDiagnosticData(d);
            }
        });//close of change event handler of select box diagnosticslist
    }
    else
    {
       window.location.replace("http://localhost:8080/hospitalLogin");
    }
    $("#adminoptions").change(function(){
        var d= $(this).val();
        if(d!=''){
            getval(d);
        }
    });//close of change event handler of adminoptions
    $("#pharmacyoptions").change(function(){
        var d= $(this).val();
        if(d!=''){
            getval(d);
        }
    });//close of change event handler of pharmacyoptions
    $("#diagnosticsoptions").change(function(){
        var d= $(this).val();
        if(d!=''){
            getval(d);
        }
    });//close of change event handler of diagnosticsoptions
    $("#logoutBtn").click(function(){
      $.removeCookie('username');
      window.location.replace("http://localhost:8080/hospitalLogin");
    });//Close of event handler of logout button
});//close of document.ready
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
            var len=data.length;//getting the no.of records retrieved
            if(len>0)
            {
                for(i=0;i<data.length;i++) 
                {
                    var d_id=data[i].test_id;
                    var d_name=data[i].test_name;
                    $("#diagnosticslist").append("<option value=\"" +d_id+ "\">" +d_name+ "</option>");
                }//close of for loop
            }//close of if
        }
    });//close of ajax-getDiagnosticsList
}//close of function loadDiagnosticsData
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
                $("#rate").val(d_rate);//setting the value for the rate
            }//close of if
        }
    });//close of ajax-getDiagnostics
}//close of function loadSelectedDiagnosticData
function getval(optionData){
    switch(optionData){
        case "Register Patient":window.location.replace("http://localhost:8080/registration");
        break;
        case "Update Patient":window.location.replace("http://localhost:8080/updatePatient");
        break;
        case "Delete Patient":window.location.replace("http://localhost:8080/deletePatient");
        break;
        case "Search Patient":window.location.replace("http://localhost:8080/searchPatients");
        break;
        case "View Patient":window.location.replace("http://localhost:8080/viewPatients");
        break;
        case "Billing":window.location.replace("http://localhost:8080/billing");
        break;
        case "Issue Medicine":window.location.replace("http://localhost:8080/issueMedicines");
        break;
        case "Add Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }//close of switch
}//close of function getval