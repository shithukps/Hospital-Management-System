$(document).ready(function() {
//    enableOptions();

    $("#updatebtn").prop('disabled',false);
    $("#ws_pat_id").blur(function(){
         var patient_id = $('#ws_pat_id').val();
         if(patient_id=='')
         {
                $('#errorid').slideDown();
                $('#errorid').html('Please provide patient id');
         }
         else
         {

                $('#errorid').slideUp();


         }
    });
    $("#ws_pat_name").blur(function(){
             var patient_name= $('#ws_pat_name').val();
             if(patient_name=='')
             {
                    $('#errorname').slideDown();
                    $('#errorname').html('Please provide patient name');
             }
             else
             {

                    $('#errorname').slideUp();


             }
    });
     $("#ws_age").blur(function(){
                     var patient_age = $('#ws_age').val();
                     if(patient_age=='')
                     {
                            $('#errorage').slideDown();
                            $('#errorage').html('Please provide patient age');
                     }
                     else
                     {

                            $('#errorage').slideUp();


                     }
    });
    $("#ws_rtype").blur(function(){
                           rtype = $('#ws_rtype').val();
                           if(rtype=='Select')
                           {
                                 $('#errorrtype').slideDown();
                                 $('#errorrtype').html('Please select room type');
                           }
                           else
                           {
                                 $('#errorrtype').slideUp();
                           }
    });
     $("#ws_doj").blur(function(){
                             var doa = $('#ws_doj').val();
                             if(doa=='')
                             {
                                    $('#errordoa').slideDown();
                                    $('#errordoa').html('Please provide date of admission');
                             }
                             else
                             {

                                    $('#errordoa').slideUp();


                             }
            });
    $("#ws_adrs").blur(function(){
                                 var address = $('#ws_adrs').val();
                                 if(address=='')
                                 {
                                        $('#erroradrs').slideDown();
                                        $('#erroradrs').html('Please provide address');
                                 }
                                 else
                                 {

                                        $('#erroradrs').slideUp();


                                 }
    });
    $("#ws_state").blur(function(){
                                       var state = $('#ws_state').val();
                                       if(state=='Select')
                                       {
                                              $('#errorstate').slideDown();
                                              $('#errorstate').html('Please provide state');
                                       }
                                       else
                                       {

                                              $('#errorstate').slideUp();


                                       }
       });
     $("#ws_city").blur(function(){
                                        var city = $('#ws_city').val();
                                        if(city=='Select')
                                        {
                                               $('#errorcity').slideDown();
                                               $('#errorcity').html('Please provide city');
                                        }
                                        else
                                        {

                                               $('#errorcity').slideUp();


                                        }
     });

    $("#getBtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Provide  Patient ID");
        }
        else
        {
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/getdetails/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                success: function(data)
                {
                    if(data.toString()!='')
                    {
                        $("#updatebtn").prop('disabled',false);
                        setFields(data);
                    }
                    else
                    {
                        alert("Patient Record Not Found");
                    }
                }
            });
        }
    });
    $("#updatebtn").click(function() {
        var pat_id=$("#ws_pat_id").val();
        var pname=$("#ws_pat_name").val();
        var age=$("#ws_age").val();
        var rtype=$("#ws_rtype").val();
        var doa=$("#ws_doj").val();
        var address=$("#ws_adrs").val();
        var state=$("#ws_state").val();
        var city=$("#ws_city").val();
        var patientData={
            'patient_name':pname,
            'age':age,
            'room_type':rtype,
            'date_of_admission':doa,
            'address':address,
            'state':state,
            'city':city
        };
        var patientJson=JSON.stringify(patientData);
         if(pat_id==''){
                              $('#errorid').slideDown();
                              $('#errorid').html('Please provide patient id');
                        }
                        else if(pname==''){
                               $('#errorname').slideDown();
                               $('#errorname').html('Please provide patient name');
                        }
                         else if(age==''){
                               $('#errorage').slideDown();
                               $('#errorage').html('Please provide patient age');
                        }
                         else if(rtype==''){
                               $('#errorrtype').slideDown();
                               $('#errorrtype').html('Please provide room type');
                        }
                         else if(doa==''){
                             $('#errordoa').slideDown();
                             $('#errordoa').html('Please provide date of admission');
                        }
                         else if(address==''){
                               $('#erroradrs').slideDown();
                               $('#erroradrs').html('Please provide address');
                        }
                         else if(state==''){
                               $('#errorstate').slideDown();
                               $('#errorstate').html('Please provide state');
                        }
                         else if(city==''){
                               $('#errorcity').slideDown();
                               $('#errorcity').html('Please provide city');
                        }



                        else{
                                $('#errorid').slideUp();
                                $('#errorname').slideUp();
                                $('#errorage').slideUp();
                                $('#errorrtype').slideUp();
                                $('#errordoa').slideUp();
                                $('#erroradrs').slideUp();
                                $('#errorstate').slideUp();
                                $('#errorcity').slideUp();

        $.ajax({
                type:"POST",
                url:'http://localhost:8080/update/'+pat_id,
                headers:{
                    "Content-Type":"application/json"
                },
                data:patientJson,
                success: function(data)
                {
                    if(data.toString()=='')
                    {
                        alert("Updated");
                        resetFields();
                        $("#updatebtn").prop('disabled',true);
                    }
                    else
                    {
                        alert("Error");
                    }
                }
            });
         }
    });
});
function setFields(data)
{
    $("#ws_pat_name").val(data.patient_name);
    $("#ws_age").val(data.age);
    $("#ws_adrs").val(data.address);
    $("#ws_city").val(data.city);
    $("#ws_state").val(data.state);
    $("#ws_doj").val(data.date_of_admission);
    $("#ws_rtype").val(data.room_type);
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
    document.getElementById("ws_ssn").value="";
    document.getElementById("ws_pat_name").value="";
    document.getElementById("ws_age").value="";
    document.getElementById("ws_adrs").value="";
    document.getElementById("ws_city").value="Select";
    document.getElementById("ws_state").value="Select";
    document.getElementById("ws_doj").value="";
    document.getElementById("ws_rtype").value="Select";
}

$("#ws_pat_id").keypress(function (e) {
            var keyCode = e.keyCode || e.which;

            //Regex for Valid Characters i.e. Alphabets and Numbers.
            var regex = /^([0-9])$/;

            //Validate TextBox value against the Regex.
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
});
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
      });
$("#ws_pat_name").keypress(function (e) {
            var keyCode = e.keyCode || e.which;

            //Regex for Valid Characters i.e. Alphabets and Numbers.
            var regex = /^[A-Za-z]+$/;

            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (!isValid) {
                $('#errorname').slideDown();
                $("#errorname").html("Only alphabets are allowed.");
            }
            else
            {
                $('#errorname').slideUp();
            }

            return isValid;
});
$("#ws_age").keypress(function (e) {
            var keyCode = e.keyCode || e.which;

            //Regex for Valid Characters i.e. Alphabets and Numbers.
             var regex = /^([0-9])$/;

            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (!isValid) {
                $('#errorage').slideDown();
                $("#errorage").html("Only numbers are allowed.");
            }
            else
            {
                $('#errorage').slideUp();
            }
            return isValid;
    });
    $("#ws_age").keyup(function(){
                var len=$("#ws_age").val().length;
                if(len>3)
                {
                    $('#errorage').slideDown();
                    $("#errorage").html("Maximum 3 digits are allowed");
                }
                else
                {
                    $('#errorage').slideUp();
                }
      });

$("##ws_adrs").keypress(function (e) {
            var keyCode = e.keyCode || e.which;

            //Regex for Valid Characters i.e. Alphabets and Numbers.
            var regex = /^[A-Za-z0-9]+$/;

            //Validate TextBox value against the Regex.
            var isValid = regex.test(String.fromCharCode(keyCode));
            if (!isValid) {
                $('#erroradrs').slideDown();
                $("#erroradrs").html("Only Alphabets and Numbers allowed.");
            }
            else
            {
                $('#erroradrs').slideUp();
            }

            return isValid;
});
