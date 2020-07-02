$(document).ready(function() {
  if($.cookie("username") != null){
    $.removeCookie('pat_id');
    var uname=$.cookie("username");
        var type=uname.substring(0, 3);
        if(type=="ADE")
        {
           $("#options").removeClass("hidden");
        }
    var pat_id;
    $("#searchBtn").click(function() {
        pat_id=$("#patient_id").val();
        if(pat_id=='')
        {
            $("#errorpatid").slideDown();
            $("#errorpatid").html("Enter ID");
        }
        else
        {
            $("#errorpatid").slideUp();
            $.ajax({
                    type:"POST",
                    url:'http://localhost:8080/checkPatientExistence/'+pat_id, //checking if patient exists in patient table
                    headers:{
                            "Content-Type":"application/json"
                    },
                    success: function(data){
                                        if(data==1){
                                                       $.ajax({
                                                                type:"POST",
                                                                url:'http://localhost:8080/getBillingDetails/'+pat_id, //getting patient details
                                                                headers:{
                                                                        "Content-Type":"application/json"
                                                                },
                                                                success: function(data){
                                                                    setPatientData(data);//for setting values on respective fields
                                                                    $.ajax({
                                                                                type:"POST",
                                                                                url:'http://localhost:8080/getDiagnosticsDetails/'+pat_id, //getting diagnostic details
                                                                                headers:{
                                                                                            "Content-Type":"application/json"
                                                                                },
                                                                                success: function(data){
                                                                                        setDiagnosticsData(data);
                                                                                }
                                                                    });//close of ajax-getDiagnosticsDetails
                                                                }
                                                        });//close of ajax-getBillingDetails
                                        }
                                        else{
                                               $("#errorpatid").slideDown();
                                               $("#errorpatid").html("Enter valid patient ID");
                                        }//close of if
                    },
                    error: function () {
                                         $("#errorpatid").slideDown();
                                         $("#errorpatid").html("Enter a valid Patient ID");
                    }
            });//close of ajax-checkPatientExistence
        }//close of if
    });//close of searchBtn
    $("#addDiagBtn").click(function() {
        $.cookie("pat_id",$("#patient_id").val());//creating a cookie named pat_id
        window.location.replace("http://localhost:8080/diagnosticsList");//redirecting to the page for adding new diagnostics
    });//close of click-addDiagBtn
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
});//close of ready
function setDiagnosticsData(data){
    if(data){
        var len = data.length;
        var txt = "";
        if(len > 0){
            for(var i=0;i!=len;i++){
                    var arr=data[i].split(",");//creating array with contents of a row
                    var test_name=arr[0];
                    var amount=arr[1];
                    txt += "<tr><td>"+test_name+"</td><td>"+amount+"</td></tr>";
            }//close of for loop
            if(txt != ""){
                $('#diagnosticstbl').find("tr:gt(0)").remove();
                $('#diagnosticstbl').append(txt);
            }///close of if checking value of txt
        }//close of if checking value of len
    }//close of if checking data
}//close of function setDiagnosticsData
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
        var join_date=d1.getDate()+'-'+(d1.getMonth()+1)+'-'+d1.getFullYear();//changing the format of join date
        $("#tdName").text(name);
        $("#tdAge").text(age);
        $("#tdAddress").text(address);
        $("#tdDoj").text(join_date);
        $("#tdRoom").text(room);
    }
    else{
        alert("Empty List");
    }//close of if
}//close of function setPatientData
function resetFields(){
    $("#patient_id").val('');
}//close of function resetFields
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