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
                                        alert("ss");
                                      $.cookie("username", username);
                                      alert("vv");
                                      window.location.replace("http://localhost:8080/registration");
                                    }
                                    else{
                                            $('#error_cred').slideDown();
                                            $('#error_cred').html('Incorrect username or password');
                                    }
                }
            });//close of loginAjax
    });//close of buttonClick
});