$(document).ready(function() {
  if($.cookie("username") != null){
    $("#deleteBtn").prop('disabled',true);
    var uname=$.cookie("username");
        var type=uname.substring(0, 3);
        if(type=="ADE")
        {
             $("#options").removeClass("hidden");
        }
    $("#getBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        if(pat_id==''){
            $("#errorid").slideDown();
            $("#errorid").html("Enter Patient ID");
        }
        else{
            $.ajax({
                     type:"POST",
                     url:'http://localhost:8080/checkPatientExistence/'+pat_id, //checking patient is existing or not
                     headers:{
                                    "Content-Type":"application/json"
                     },
                     success: function(data){
                        if(data==1){
                                        $.ajax({
                                                type:"POST",
                                                url:'http://localhost:8080/getdetails/'+pat_id, //fetching the details of patient
                                                headers:{
                                                                "Content-Type":"application/json"
                                                },
                                                success: function(data){
                                                    if(data.toString()!=''){
                                                            $("#deleteBtn").prop('disabled',false);
                                                            setFields(data); //setting the value in corresponding fields
                                                    }
                                                    else{
                                                        var notyf = new Notyf({
                                                            position:
                                                            {
                                                                x: 'right',
                                                                y: 'top',
                                                            }
                                                        });
                                                        notyf.error('Patient Record Not Found');
                                                    }
                                                }
                                        });//close of ajax-getdetails
                        }
                        else{
                            $("#errorid").slideDown();
                            $("#errorid").html("Enter a valid Patient ID");
                        }
                     },
                     error: function () {
                                    $("#errorid").slideDown();
                                    $("#errorid").html("Enter a valid Patient ID");
                     }
            });//close of ajax-checkPatientExistence
        }//close of if-checking patient Id
    });//close of click-getBtn
    $("#deleteBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/delete/'+pat_id, //deleting the record in patient table
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data){
                var notyf = new Notyf({
                    position:
                    {
                        x: 'right',
                        y: 'top',
                    }
                });
                notyf.success('Patient Deleted Successfully');
                $("#ws_pat_id").prop('disabled',false);
                resetFields();
                $("#deleteBtn").prop('disabled',true);
            },
            error: function () {
                var notyf = new Notyf({
                    position:
                    {
                        x: 'right',
                        y: 'top',
                    }
                });
                notyf.error('Error On Delete');
            }
        });//close of ajax-delete
    });//close of click-deleteBtn
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
  }
  else{
       window.location.replace("http://localhost:8080/hospitalLogin");
  }
  $("#logoutBtn").click(function(){
      $.removeCookie('username');
      window.location.replace("http://localhost:8080/hospitalLogin");
    });//Close of event handler of logout button
});//close of document.ready
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
        $("#ws_pat_name").prop('disabled',true);
        $("#ws_age").prop('disabled',true);
        $("#ws_adrs").prop('disabled',true);
        $("#ws_city").prop('disabled',true);
        $("#ws_state").prop('disabled',true);
        $("#ws_doj").prop('disabled',true);
        $("#ws_rtype").prop('disabled',true);
    }
    else{
        var notyf = new Notyf({
            position:
            {
                x: 'right',
                y: 'top',
            }
        });
        notyf.error('Enter Valid Patient ID');
    }
}//close of function setFields
function resetFields(){
    $("#ws_pat_id").val('');
    document.getElementById("ws_pat_name").value="";
    document.getElementById("ws_age").value="";
    document.getElementById("ws_adrs").value="";
    document.getElementById("ws_city").value="";
    document.getElementById("ws_state").value="";
    document.getElementById("ws_doj").value="";
    document.getElementById("ws_rtype").value="";
    $("#ws_pat_name").prop('disabled',true);
    $("#ws_age").prop('disabled',true);
    $("#ws_adrs").prop('disabled',true);
    $("#ws_city").prop('disabled',true);
    $("#ws_state").prop('disabled',true);
    $("#ws_doj").prop('disabled',true);
    $("#ws_rtype").prop('disabled',true);
}//close of function resetFields
$("#ws_pat_id").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^([0-9])$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorid').slideDown();
            $("#errorid").html("Only Numbers are allowed.");
        }
        else
        {
            $('#errorid').slideUp();
        }
        return isValid;
});//close of keypress-ID
$("#ws_pat_id").keyup(function(){
            var len=$("#ws_pat_id").val().length;
            if(len>9)
            {
                $('#errorid').slideDown();
                $("#errorid").html("Maximum 9 digits are allowed");
            }
            else
            {
                $('#errorage').slideUp();
            }
});//close of keyup-Id
