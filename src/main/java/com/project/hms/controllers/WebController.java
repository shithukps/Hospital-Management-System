package com.project.hms.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebController {

    @RequestMapping("/hello")
    @ResponseBody
    public String welcome(){
        return "Hello World";
    }

    @RequestMapping("/hospitalLogin" )
    public String login()
    {
        return "login";
    }

    @RequestMapping("/registration")
    public String registration(){
        return "patient_registration";
    }

    @RequestMapping("/updatePatient")
    public String updatePatient(){
        return "update_patient";
    }
}
