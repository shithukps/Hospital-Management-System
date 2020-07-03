$(document).ready(function() {
  if($.cookie("username") != null){
    var uname=$.cookie("username");
    var type=uname.substring(0, 3);
    if(type=="ADE")
    {
       $("#options").removeClass("hidden");
    }
    loadMedicinesData();
    $("#addbtn").click(function() {
        var m_name=$("#medicineslist option:selected").text();
        var m_id=$("#medicineslist").val();
        var m_rate=$("#rate").val();
        var qua=jQuery.trim($('#quantity').val());
        var av=jQuery.trim($('#availability').val());
        if(parseInt(qua)<=parseInt(av)){   //checking medicine demand is more than the available stock
            $('#errorquantity').slideUp();
            var amt=m_rate*qua;
            var txt="<tr><td style=\"display: none;\">"+m_id+"</td><td>"+m_name+"</td><td>"+qua+"</td><td>"+m_rate+"</td><td>"+amt+"</td><tr>";
            $('#medicinestbl').append(txt);//to populate table with corresponding medicine list
            $("#medicineslist").val("Select Medicine");
            $("#rate").val('');
            $("#quantity").val('');
            $("#availability").val('');
            $("#amount").val('');
        }
        else{
            $('#errorquantity').slideDown();
            $('#errorquantity').html('Required quantity is not in Stock!...');
            return false;
        }
    });//close of button click-addbtn
    $("#submitBtn").click(function() 
    {
        var pat_id=$.cookie("pat_id");
            $("#medicinestbl tr").each(function() {
                if ($(this).find("td:first").length > 0) {
                            var med_id = $(this).find("td:first").html();
                            var qty=$(this).find("td").eq(2).html();
                            var patientMedicineData={
                                'patient_id':pat_id,
                                'medicine_id':med_id,
                                'quantity_issued':qty
                            };
                            var patientMedicineJson=JSON.stringify(patientMedicineData);
                            $.ajax({
                                type:"POST",
                                url:'http://localhost:8080/insertMedicineTrack',
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                data:patientMedicineJson,
                                success: function(data)
                                {
                                     $.ajax({
                                                  type:"POST",
                                                  url:'http://localhost:8080/updateMedicineQty/'+parseInt(qty)+'/'+med_id,
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
                                                    notyf.success('Medicines Issued');
                                                  }
                                     });//close of ajax-updateMedicineQty
                                },
                                error: function(data){
                                    var notyf = new Notyf({
                                        position:
                                        {
                                            x: 'right',
                                            y: 'top',
                                        }
                                    });
                                    notyf.error('Error');
                                }
                            });//close of ajax-insertMedicineTrack

                }//close of if
            });//close of each function to iterate the table rows
            $.removeCookie('pat_id');
            setTimeout(function()
            {
                window.location.replace("http://localhost:8080/issueMedicines");
            },2000);
            
    });//close of click-submitBtn
    $("#medicineslist").change(function(){
        var d= $(this).val();
        if(d!='Select Medicine'){
            $.ajax({
                        type:"POST",
                        url:'http://localhost:8080/getmedicine/'+d,
                        headers:{
                            "Content-Type":"application/json"
                        },
                        success: function(data){
                            len = data.length;
                            if(len > 0){
                                var arr=data.split(",");
                                var med_avail="";
                                var available=arr[0];
                                var med_rate=arr[1];

                                if(available<1)
                                {
                                        var notyf = new Notyf({
                                                position: {
                                                    x: 'right',
                                                    y: 'top',
                                                  }
                                            });
                                        notyf.error('Medicine Not Available');
                                        $("#rate").val('');
                                        $("#quantity").val('');
                                        $("#availability").val('');
                                        $("#amount").val('');
                                }
                                else
                                {
                                    var notyf = new Notyf({
                                            position: {
                                                x: 'right',
                                                y: 'top',
                                              }
                                        });
                                    notyf.success('Medicine available');
                                    $("#availability").val(available);
                                    $("#rate").val(med_rate);
                                }

                            }
                        }
                    });//close of ajax-getmedicine
        }
        else
        {
            $("#rate").val('');
            $("#quantity").val('');
            $("#availability").val('');
            $("#amount").val('');
        }
    });//close of change event handler of select box medicineslist

    function loadMedicinesData(){
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/getmedicineslist',
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data){
                var len=data.length;
                if(len>0){
                    for(i=0;i<data.length;i++) {
                        var med_id=data[i].medicine_id;
                        var med_name=data[i].medicine_name;
                        $("#medicineslist").append("<option value=\"" +med_id+ "\">" +med_name+ "</option>");
                    }//close of for loop
                }
            }
        });//close of ajax-getmedicineslist
    }//close of function loadMedicinesData
    function loadSelectedMedicineData(med_id)
    {

    }//close of function loadSelectedMedicineData
    $("#quantity").keyup(function(){
        var q=$("#quantity").val();
        var rate=$("#rate").val();
        $("#amount").val(q*rate);
    });//close of keyup of textbox quantity
  }
  else{
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
$("#quantity").keypress(function (e) {
        var keyCode = e.keyCode || e.which;
        var regex = /^([0-9])$/;
        var isValid = regex.test(String.fromCharCode(keyCode));
        if (!isValid) {
            $('#errorquantity').slideDown();
            $("#errorquantity").html("Only Numbers are allowed.");
        }
        else
        {
            $('#errorid').slideUp();
        }
        return isValid;
});//close of keypress-ID