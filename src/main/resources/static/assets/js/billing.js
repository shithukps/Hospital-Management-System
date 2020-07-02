$(document).ready(function() {
  if($.cookie("username") != null){
    var pat_id;
    $("#searchBtn").click(function() {
        grantTotal=0;
        pat_id=$("#patient_id").val();
        $("#pharmacytbl").find("tr:gt(0)").remove();
        $("#diagnosticstbl").find("tr:gt(0)").remove();
        if(pat_id=='')
        {
            $("#errorpatid").slideDown();
            $("#errorpatid").html("Enter Patient ID");
        }
        else
        {
            $("#errorpatid").slideUp();
            $.ajax({
                     type:"POST",
                     url:'http://localhost:8080/checkPatientActive/'+pat_id, //checking patient is existing or not
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
                         $("#errorpatid").slideDown();
                         $("#errorpatid").html("Enter a valid Patient ID");
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
                txt=txt+"<tr><td class=\"required\">Bill for Diagnostics</td><td class=\"required\">"+diagnosticsTotal+"</td></tr>";
                $('#diagnosticstbl').append(txt);
            }
        }
    }//close of if-checking the content of data
    setTotal();//setting the value of grant total field
}//close of function setDiagnosticsData
function setTotal(){
    var grantTotal=0;
    var rbill=0;
    var pbill=0;
    var dbill=0;
    if($("#billforroom").text()!="")
    {
        rbill=$("#billforroom").text();
    }
    if($('#diagnosticstbl tr').length>1)
    {
        dbill=$("#diagnosticstbl").find("tr:last td:eq(1)").text();
    }
    if($('#pharmacytbl tr').length>1)
    {
        pbill=$("#pharmacytbl").find("tr:last td:eq(1)").text();
    }
    grantTotal=parseFloat(rbill)+parseFloat(pbill)+parseFloat(dbill);
    $("#grandtotal").text(grantTotal);
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
                txt=txt+"<tr><td colspan=\"3\" class=\"required\">Bill for Pharmacy</td><td class=\"required\">"+pharmacyTotal+"</td></tr>"
                $('#pharmacytbl').append(txt);
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
        $("#noofdays").text(noofdays);
        if(room=="General"){
            $("#billforroom").text(noofdays*2000);
        }
        else if(room=="Semi"){
            $("#billforroom").text(noofdays*4000);
        }
        else{
            $("#billforroom").text(noofdays*8000);
        }
    }
    else{
        alert("Patient ID Not Found");
    }
}//close of function setPatientData
function resetFields(){
    $("#patient_id").val("");
    $("#tdName").text("");
    $("#tdAge").text("");
    $("#tdAddress").text("");
    $("#tdDoj").text("");
    $("#tdDol").text("");
    $("#tdRoom").text("");
    $("#noofdays").text("");
    $("#pharmacytbl").find("tr:gt(0)").remove();
    $("#diagnosticstbl").find("tr:gt(0)").remove();
    var txt="<tr><td colspan=\"3\">Bill for Pharmacy</td><td>0000</td></tr>";
    $("#pharmacytbl").append(txt);
    txt="<tr><td>Bill for diagnostics</td><td>0000</td></tr>";
    $("#diagnosticstbl").append(txt);
    $("#billforroom").text('0');
    $("#noofdays").text('0');
    $("#grandtotal").text('0');
}// close of function resetFields
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
        case "Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }//close of switch
}//close of function getval

