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
            else
            {
                var notyf = new Notyf({
                    position:
                    {
                        x: 'right',
                        y: 'top',
                    }
                });
                notyf.error('No Records'); 
            }
        }
    });//close of ajax-getAll
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
  /*$('#patientstbl').DataTable( {
              "pagingType": "full_numbers",
              "searching": false,
              "ordering": false,
              "lengthChange": false
  });*/
  $("#logoutBtn").click(function(){
    $.removeCookie('username');
    window.location.replace("http://localhost:8080/hospitalLogin");
  });//Close of event handler of logout button
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
        case "Issue Medicine":window.location.replace("http://localhost:8080/issueMedicines");
        break;
        case "Add Diagnostics":window.location.replace("http://localhost:8080/addDiagnostics");
        break;
    }//close of switch
}//close of function getval
