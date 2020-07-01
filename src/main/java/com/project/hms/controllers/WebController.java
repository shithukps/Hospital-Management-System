package com.project.hms.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebController {

    @RequestMapping("/hospitalLogin")
    public String login(){
        return "login";
    }//mapping for login.html

    @RequestMapping("/registration")
    public String registration(){
        return "patient_registration";
    }//mapping for patient_registration.html

    @RequestMapping("/updatePatient")
    public String updatePatient(){
        return "update_patient";
    }//mapping for update_patient.html

    @RequestMapping("/deletePatient")
    public String deletePatient(){
        return "delete_patient";
    }//mapping for delete_patient.html

    @RequestMapping("/viewPatients")
    public String viewPatient(){
        return "view_patients";
    }//mapping for view_patients.html

    @RequestMapping("/searchPatients")
    public String searchPatient(){
        return "search_patient";
    }//mapping for search_patient.html

    @RequestMapping("/billing")
    public String billing(){
        return "billing";
    }//mapping for billing.html

    @RequestMapping("/addDiagnostics")
    public String addDiagnostics(){
        return "add_diagnostics";
    }//mapping for add_diagnostics.html

    @RequestMapping("/diagnosticsList")
    public String diagnostics(){
        return "diagnostics";
    }//mapping for diagnostics.html

    @RequestMapping("/issueMedicines")
    public String issueMedicines(){
        return "issue_medicines";
    }//mapping for issue_medicines.html

    @RequestMapping("/medicinesList")
    public String medicines(){
        return "medicines";
    }//mapping for medicines.html
}
