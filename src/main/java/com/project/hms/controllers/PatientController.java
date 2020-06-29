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
    public String getPatientDetails(@PathVariable Integer pat_id) {
        return patientService.getPatientDetails(pat_id);
    }

    @RequestMapping(value="/update/{pat_id}",method = RequestMethod.POST)
    public void updatePatientDetails(@RequestBody Patient patient,@PathVariable Integer pat_id) {
        patientService.updatePatientDetails(patient.getPatient_name(),patient.getAge(),patient.getRoom_type(),patient.getDate_of_admission(),patient.getAddress(),patient.getState(),patient.getCity(),pat_id);
    }

    @RequestMapping(value="/delete/{pat_id}",method = RequestMethod.POST)
    public void deletePatientDetails(@PathVariable Integer pat_id) {
        patientService.deletePatientDetails(pat_id);
    }
}
