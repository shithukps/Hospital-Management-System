$(document).ready(function() {
  if($.cookie("username") != null){
    loadMedicinesData();
    var available=0;
    $("#addbtn").click(function() {
        var m_name=$("#medicineslist option:selected").text();
        var m_id=$("#medicineslist").val();
        var m_rate=$("#rate").val();
        var qua=$("#quantity").val();
        var amt=m_rate*qua;
        var txt="<tr><td style=\"display: none;\">"+m_id+"</td><td>"+m_name+"</td><td>"+qua+"</td><td>"+m_rate+"</td><td>"+amt+"</td><tr>";
        $('#medicinestbl').append(txt);//to populate table with corresponding medicine list
    });//close of button click-addbtn
    $("#submitBtn").click(function() 
    {
        var pat_id=$.cookie("pat_id");
        var qtyVal=jQuery.trim($('#quantity').val());
        if(qtyVal>available){   //checking medicine demand is more than the available stock
            alert("Stock is less than required");
        }
        else{
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
                                    alert("Medicines Issued");
                                }
                            });//close of ajax-insertMedicineTrack
                            $.ajax({
                                type:"POST",
                                url:'http://localhost:8080/updateMedicineQty/'+qty+'/'+med_id,
                                headers:{
                                           "Content-Type":"application/json"
                                },
                                success: function(data)
                                {
                                       $.removeCookie('pat_id');
                                       window.location.replace("http://localhost:8080/issueMedicines");
                                }
                            });//close of ajax-updateMedicineQty
                }//close of if
            });//close of each function to iterate the table rows
        }//close of availability checking if
    });//close of click-submitBtn
    $("#medicineslist").change(function(){
        var d= $(this).val();
        if(d!=''){
            loadSelectedMedicineData(d);
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
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/getmedicine/'+med_id,
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data){
                len = data.length;
                if(len > 0){
                    var arr=data.split(",");
                    var med_avail="";
                    available=arr[0];
                    var med_rate=arr[1];
                    $("#availability").val(available);
                    $("#rate").val(med_rate);
                }
            }
        });//close of ajax-getmedicine
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
});//close of document.ready