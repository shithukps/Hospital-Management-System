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
                        $("#errorid").slideDown();
                        $("#errorid").html("Enter a valid Patient ID");
                    }
                },
                error: function () {
                    $("#errorid").slideDown();
                    $("#errorid").html("Enter a valid Patient ID");
                }
            });//close of ajax-search
        }
    });//close of click-getBtn
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
        resetFields();
    }
}//close of function setFields
function resetFields()
{
    $("#ws_pat_name").val("");
            $("#ws_age").val("");
            $("#ws_adrs").val("");
            $("#ws_city").val("");
            $("#ws_state").val("");
            $("#ws_doj").val("");
            $("#ws_rtype").val("");
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