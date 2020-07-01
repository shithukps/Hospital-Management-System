package com.project.hms.controllers;

import com.project.hms.db.models.Login;
import com.project.hms.services.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class LoginController {
    @Autowired
    LoginService loginService;

    final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping(method = RequestMethod.POST,value = "/login")
    public String loginFunction(@RequestBody Login login) throws Exception {
        String id=login.getId();
        Optional<Login> loggedInUser = loginService.loginVerifier(id);
        if(loggedInUser.isPresent()){
            if(loggedInUser.get().getPassword().equals(login.getPassword())){
                logger.info("success");
                loginService.insertUserStore(id);
                return "success";
            }
            else{
                logger.error("wrong password");
                return "wrong password";
            }//close of if checking the password matching

        }
        else{
            logger.error("wrong user name");
            return "wrong user name";
        }//close of if checking validity of username
    }//close of login verification function
}
