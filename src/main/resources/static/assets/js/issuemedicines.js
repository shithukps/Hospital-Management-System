$(document).ready(function() {
  if($.cookie("username") != null){
    $.removeCookie('pat_id');
    $("#issuebtn").prop('disabled',true);
    var pat_id;
    $("#searchBtn").click(function() {
        pat_id=$("#patient_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Enter ID");//to show the error message
        }
        else
        {
            $("#errorid").slideUp();
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
                                        url:'http://localhost:8080/getBillingDetails/'+pat_id,
                                        headers:{
                                            "Content-Type":"application/json"
                                        },
                                        success: function(data)
                                        {
                                            setPatientData(data);
                                            $.ajax({
                                                type:"POST",
                                                url:'http://localhost:8080/getMedicineDetails/'+pat_id,
                                                headers:{
                                                    "Content-Type":"application/json"
                                                },
                                                success: function(data)
                                                {
                                                    setMedicineData(data);
                                                    $("#issuebtn").prop('disabled',false);
                                                }
                                            });//close of ajax-getMedicineDetails
                                        }
                                    });//close of ajax-getBillingDetails
                                }
                            },
                            error: function () {
                               $("#errorid").slideDown();
                               $("#errorid").html("Enter a valid Patient ID");
                            }
            });//close of ajax-checkPatientExistence
        }//close of if-checking textbox value
    });//close of searchBtn click
    $("#issuebtn").click(function() {
            $.cookie("pat_id",$("#patient_id").val());
            window.location.replace("http://localhost:8080/medicinesList");
    });//close of issuebtn click
  }
  else{
       window.location.replace("http://localhost:8080/hospitalLogin");
  }
});//close of document.ready
function setMedicineData(data){
    if(data){
        var len = data.length;
        var txt = "";
        if(len > 0){
            for(var i=0;i!=len;i++){
                    var arr=data[i].split(",");
                    var medicine_name=arr[0];
                    var qty_issued=arr[1];
                    var rate=arr[2];
                    var amount=qty_issued*rate;
                    txt += "<tr><td>"+medicine_name+"</td><td>"+qty_issued+"</td><td>"+rate+"</td><td>"+amount+"</td></tr>";

            }//close of for loop
            if(txt != ""){
                $('#medicinestbl').find("tr:gt(0)").remove();
                $('#medicinestbl').append(txt);
            }
        }//close of if-checking data length
    }//close of if-checking data
}//close of setMedicineData
function setPatientData(data){
    var pat_id=$("#patient_id").val();
    var len = data.length;
    if(len > 0){
        var arr=data.split(",");
        var name=arr[0];
        var age=arr[1];
        var address=arr[2];
        var date=arr[3];
        var d1=new Date(date);
        var room=arr[4];
        var join_date=d1.getDate()+'-'+(d1.getMonth()+1)+'-'+d1.getFullYear();
        $("#tdName").text(name);
        $("#tdAge").text(age);
        $("#tdAddress").text(address);
        $("#tdDoj").text(join_date);
        $("#tdRoom").text(room);
    }
    else{
        alert("Empty List");
    }//close of if-checking data length
}//close of setPatientData
