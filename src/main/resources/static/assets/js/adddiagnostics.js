$(document).ready(function() {
  if($.cookie("username") != null){
    var pat_id;
    $("#searchBtn").click(function() {
        pat_id=$("#patient_id").val();
        if(pat_id=='')
        {
            $("#errorid").slideDown();
            $("#errorid").html("Enter ID");
        }
        else
        {
            $("#errorid").slideUp();
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
                                               $("#errorid").slideDown();
                                               $("#errorid").html("Enter valid patient ID");
                                        }//close of if
                    },
                    error: function () {
                                         $("#errorid").slideDown();
                                         $("#errorid").html("Enter a valid Patient ID");
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