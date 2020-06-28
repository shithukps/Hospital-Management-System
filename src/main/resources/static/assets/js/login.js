$(document).ready(function() {
// check the inputbox values whther it is empty or not on blur function
$("#username").blur(function(){
     var user = $('#username').val();
     if(user=='')
     {
            $('#error_username').slideDown();
            $('#error_username').html('Please provide username');
     }
     else
     {
            $('#error_cred').slideUp();
            $('#error_username').slideUp();


     }
});
$("#password").blur(function(){
     var pass = $('#password').val();
     if(pass=='')
     {
            $('#error_password').slideDown();
            $('#error_password').html('Please provide password');
     }
     else
     {
            $('#error_cred').slideUp();
            $('#error_password').slideUp();


     }
});

    $("#submitBtn").click(function() {
        var username=$("#username").val();
        var password=$("#password").val();

            var userData={
                        'id':username,
                        'password':password
            };
            var loginJson=JSON.stringify(userData);

            if(username==''){
                      $('#error_username').slideDown();
                      $('#error_username').html('Please provide username');
                }
                else if(password==''){
                       $('#error_password').slideDown();
                       $('#error_password').html('Please provide password');
                }

                else{
                         $('#error_username').slideUp();
                          $('#error_password').slideUp();
            $.ajax({
                type:"POST",
                url:'http://localhost:8080/login',
                headers:{
                    "Content-Type":"application/json"
                },
                data:loginJson,
                success: function(data){
                                    if(data=="success"){
                                      $.cookie("username", username);
                                      window.location.replace("http://localhost:8080/registration");
                                    }
                                    else{
                                            $('#error_cred').slideDown();
                                            $('#error_cred').html('Incorrect username or password');
                                    }
                }
            });//close of loginAjax
         }
    });//close of buttonClick
});