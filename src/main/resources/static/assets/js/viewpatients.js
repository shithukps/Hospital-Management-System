$(document).ready(function() {
  if($.cookie("username") != null){
    $.ajax({
        type:"POST",
        url:'http://localhost:8080/getAll',
        headers:{
            "Content-Type":"application/json"
        },
        success: function(data){
            if(data.toString()!=''){
                populateTable(data);
            }
            else{
                alert("No Records");
            }
        }
    });//close of ajax-getAll
    $("#useroptions").change(function(){
        var d= $(this).val();
        if(d!=''){
            getval(d);
        }
    });//close of change event handler of useroptions
  }
  else{
       window.location.replace("http://localhost:8080/hospitalLogin");
  }
});//close of document.ready
function populateTable(data){
    if(data){
        var len = data.length;
        var txt = "";
        if(len > 0){
            for(var i=0;i!=len;i++){
                    txt += "<tr><td>"+data[i].patient_id+"</td><td>"+data[i].patient_name+"</td><td>"+data[i].age+"</td><td>"+data[i].address+"</td><td>"+data[i].date_of_admission+"</td><td>"+data[i].room_type+"</td></tr>";
            }
            if(txt != ""){
                $('#patientstbl').find("tr:gt(0)").remove();
                $('#patientstbl').append(txt);
            }
        }
    }
}//close of function populateTable
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
        case "Issue Medicine":window.location.replace("http://localhost:8080/issueMedicine");
        break;
        case "Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }//close of switch
}//close of function getval
