package com.project.hms.controllers;

import com.project.hms.db.models.Patient;
import com.project.hms.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PatientController {
    @Autowired
    PatientService patientService;
    @RequestMapping(value="/register",method = RequestMethod.POST)
    public void registerPatient(@RequestBody Patient patient) {
        System.out.println(patient.getSsnid());
        patientService.registerPatient(patient.getSsnid(),patient.getPatient_name(),patient.getAddress(),patient.getAge(),patient.getDate_of_admission(),patient.getRoom_type(),patient.getCity(),patient.getState());
    }

    @RequestMapping(value="/getdetails/{pat_id}",method = RequestMethod.POST)
    public List<Patient> getPatientDetails(@PathVariable Integer pat_id) {
        return patientService.getPatientDetails(pat_id);
//        patientService.registerPatient(patient.getssnid(),patient.getPatient_name(),patient.getAddress(),patient.getAge(),patient.getDate_of_admission(),patient.getRoom_type(),patient.getState(),patient.getCity());

    }
}
