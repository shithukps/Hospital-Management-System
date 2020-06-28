$(document).ready(function() {
    $("#submitBtn").click(function() {
        var username=$("#username").val();
        var password=$("#password").val();
        var userData={
                        'id':username,
                        'password':password
        };
        var studentJson=JSON.stringify(userData);
        $.ajax({
            type:"POST",
            url:'http://localhost:8080/login',
            headers:{
                "Content-Type":"application/json"
            },
            data:studentJson,
            success: function(data){
                                    if(data=="success"){
//                                      window.location.href="http://localhost:8080/home"
                                        alert("Success");
                                    }
                                    else{
                                            alert("Wrong Credentials!...");
                                    }
            }
        });//close of loginAjax
    });//close of buttonClick
});