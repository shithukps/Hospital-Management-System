$(document).ready(function() {
  if($.cookie("username") != null){
    $("#getBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        if(pat_id==''){
            $("#errorid").slideDown();
            $("#errorid").html("Provide Patient ID");
        }
        else{
            $("#errorid").slideUp();
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/search/'+pat_id, //getting the details of patient
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(data){
                    if(data.toString()!=''){
                        setFields(data); //setting values of corresponding fields
                    }
                    else{
                        resetFields(); //clear the fields
                        alert("Patient Record Not Found");
                    }
                },
                error: function () {
                    $("#errorid").slideDown();
                    $("#errorid").html("Enter a valid Patient ID");
                }
            });//close of ajax-search
        }
    });//close of click-getBtn
    $("#useroptions").change(function(){
        var d= $(this).val();
        if(d!=''){
            getval(d);
        }
    });//close of change event handler-useroptions
  }
  else{
       window.location.replace("http://localhost:8080/hospitalLogin");
  }
});
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
        case "Issue Medicine":window.location.replace("http://localhost:8080/issueMedicine");
        break;
        case "Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }//close of switch
}//close of function getval
function setFields(data){
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
        alert("Patient ID Not Found");
        resetFields();
    }
}//close of function setFields
function resetFields()
{
    document.getElementById("ws_pat_name").value="";
    document.getElementById("ws_age").value="";
    document.getElementById("ws_adrs").value="";
    document.getElementById("ws_city").value="Select";
    document.getElementById("ws_state").value="Select";
    document.getElementById("ws_doj").value="";
    document.getElementById("ws_rtype").value="Select";
}//close of function resetFields