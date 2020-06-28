package com.project.hms.controllers;

import com.project.hms.db.models.Patient;
import com.project.hms.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatientController {
    @Autowired
    PatientService patientService;
    @RequestMapping(value="/register",method = RequestMethod.POST)
    public void registerPatient(@RequestBody Patient patient) {
        System.out.println(patient.getssnid());
        patientService.registerPatient(patient.getssnid(),patient.getPatient_Name(),patient.getAddress(),patient.getAge(),patient.getDate_of_admission(),patient.getRoom_type(),patient.getState(),patient.getCity());
    }
}
