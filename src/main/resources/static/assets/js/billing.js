$(document).ready(function() {
  if($.cookie("username") != null){
    var pat_id;
    $("#searchBtn").click(function() {
        grantTotal=0;
        pat_id=$("#patient_id").val();
        resetFields();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Enter Patient ID");
        }
        else
        {
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
                                                        url:'http://localhost:8080/getBillingDetails/'+pat_id, //getting the patient details
                                                        headers:{
                                                            "Content-Type":"application/json"
                                                        },
                                                        success: function(data){
                                                            setPatientData(data); //to set the values in the corresponding fields of table
                                                            $.ajax({
                                                                        type:"POST",
                                                                        url:'http://localhost:8080/getMedicineDetails/'+pat_id, //getting medicines issued to the patient
                                                                        headers:{
                                                                            "Content-Type":"application/json"
                                                                        },
                                                                        success: function(data){
                                                                            setMedicineData(data); //to set the values in the corresponding fields of medicine table
                                                                            $.ajax({
                                                                                    type:"POST",
                                                                                    url:'http://localhost:8080/getDiagnosticsDetails/'+pat_id, //getting diagnostics done to the patient
                                                                                    headers:{
                                                                                        "Content-Type":"application/json"
                                                                                    },
                                                                                    success: function(data){
                                                                                        setDiagnosticsData(data); //to set values in diagnostic data table fields
                                                                                    }
                                                                            });//close of ajax-getDiagnosticsDetails
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
        }//close of if-checking value of textbox
    });//close of click-searchBtn
    $("#confirmbtn").click(function() {
        pat_id=$("#patient_id").val();
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/discharge/'+pat_id, //updating status of patient to 'discharged'
            headers:{
                "Content-Type":"application/json"
            },
            success: function(data)
            {
                alert("Discharged");
                resetFields(); // clear the fields
            }
        });//close of ajax-discharge
    });//close of click-confirmbtn
  }
  else{
     window.location.replace("http://localhost:8080/hospitalLogin");
  }
});//close of document.ready
function setDiagnosticsData(data){
    if(data){
        var len = data.length;
        var txt = "";
        var diagnosticsTotal=0;
        if(len > 0){
            for(var i=0;i!=len;i++){
                    var arr=data[i].split(",");
                    var test_name=arr[0];
                    var amount=arr[1];
                    txt += "<tr><td>"+test_name+"</td><td>"+amount+"</td></tr>";
                    diagnosticsTotal=diagnosticsTotal+parseFloat(amount); //finding total amount of diagnostics done
            }
            if(txt != ""){
                $('#diagnosticstbl').append(txt);
                $("#billfordiagnostics").val(diagnosticsTotal);//setting the value of textbox
            }
        }
    }//close of if-checking the content of data
    setTotal();//setting the value of grant total field
}//close of function setDiagnosticsData
function setTotal(){
    var grantTotal=0;
    if($("#billfordiagnostics").val()!=""){
        grantTotal=grantTotal+parseFloat($("#billfordiagnostics").val());
    }
    if($("#billforpharmacy").val()!="") {
        grantTotal=grantTotal+parseFloat($("#billforpharmacy").val());
    }
    if($("#billforroom").val()!=""){
        grantTotal=grantTotal+parseFloat($("#billforroom").val());
    }
    $("#grandtotal").val(grantTotal);
}//close of function setTotal
function setMedicineData(data){
    if(data){
        var len = data.length;
        var txt = "";
        var pharmacyTotal=0;
        if(len > 0){
            for(var i=0;i!=len;i++){
                    var arr=data[i].split(",");
                    var medicine_name=arr[0];
                    var qty_issued=arr[1];
                    var rate=arr[2];
                    var amount=qty_issued*rate; //finding amount
                    txt += "<tr><td>"+medicine_name+"</td><td>"+qty_issued+"</td><td>"+rate+"</td><td>"+amount+"</td></tr>";
                    pharmacyTotal=pharmacyTotal+parseFloat(amount); //finding total of prices of medicine
            }
            if(txt != ""){
                $('#pharmacytbl').append(txt);
                $("#billforpharmacy").val(pharmacyTotal);
            }
        }
    }
}//close of function setMedicineData
function setPatientData(data){
    len = data.length;
    if(len > 0){
        var arr=data.split(",");
        var name=arr[0];
        var age=arr[1];
        var address=arr[2];
        var date=arr[3];
        var room=arr[4];
        var d1=new Date(date);
        var today=new Date();
        var join_date=d1.getDate()+'-'+(d1.getMonth()+1)+'-'+d1.getFullYear(); //formatting joining date
        var leaveDate=today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); //formatting leave date
        var noofdays =Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()) ) /(1000 * 60 * 60 * 24)) //finding no.of days the patient was admitted in hospital
        $("#tdName").text(name);
        $("#tdAge").text(age);
        $("#tdAddress").text(address);
        $("#tdDoj").text(join_date);
        $("#tdDol").text(leaveDate);
        $("#tdRoom").text(room);
        $("#noofdays").val(noofdays);
        if(room=="General"){
            $("#billforroom").val(noofdays*2000);
        }
        else if(room=="Semi"){
            $("#billforroom").val(noofdays*4000);
        }
        else{
            $("#billforroom").val(noofdays*8000);
        }
    }
    else{
        alert("Patient ID Not Found");
    }
}//close of function setPatientData
function resetFields(){
    $("#pharmacytbl").find("tr:gt(0)").remove();
    $("#diagnosticstbl").find("tr:gt(0)").remove();
    $("#billforroom").val('');
    $("#noofdays").val('');
    $("#billforpharmacy").val('');
    $("#billfordiagnostics").val('');
    $("#grandtotal").val('');
}// close of function resetFields

