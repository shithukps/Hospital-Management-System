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
        System.out.println("Insertion in Patient table");
        patientService.registerPatient(patient.getSsnid(),patient.getPatient_name(),patient.getAddress(),patient.getAge(),patient.getDate_of_admission(),patient.getRoom_type(),patient.getCity(),patient.getState());
    }

    @RequestMapping(value="/getdetails/{pat_id}",method = RequestMethod.POST)
    public String getPatientDetails(@PathVariable Integer pat_id) {
        System.out.println("Getting details from Patient table");
        return patientService.getPatientDetails(pat_id);
    }

    @RequestMapping(value="/update/{pat_id}",method = RequestMethod.POST)
    public void updatePatientDetails(@RequestBody Patient patient,@PathVariable Integer pat_id) {
        System.out.println("Updating patient details");
        patientService.updatePatientDetails(patient.getPatient_name(),patient.getAge(),patient.getRoom_type(),patient.getDate_of_admission(),patient.getAddress(),patient.getState(),patient.getCity(),pat_id);
    }

    @RequestMapping(value="/delete/{pat_id}",method = RequestMethod.POST)
    public void deletePatientDetails(@PathVariable Integer pat_id) {
        System.out.println("Deleting Patient details");
        patientService.deletePatientDetails(pat_id);
    }

    @RequestMapping(value="/getAll",method = RequestMethod.POST)
    public List<Patient> getAllDetails() {
        System.out.println("Getting All details from Patient table");
        return patientService.getAllDetails();
    }

    @RequestMapping(value="/search/{pat_id}",method = RequestMethod.POST)
    public String searchPatientDetails(@PathVariable Integer pat_id) {
        System.out.println("search details from Patient table");
        return patientService.searchPatientDetails(pat_id);
    }

    @RequestMapping(value="/getBillingDetails/{pat_id}",method = RequestMethod.POST)
    public String getBillingDetails(@PathVariable Integer pat_id) {
        System.out.println("Getting billing details from Patient table");
        return patientService.getBillingDetails(pat_id);
    }

    @RequestMapping(value="/getMedicineDetails/{pat_id}",method = RequestMethod.POST)
    public List<String> getMedicineDetails(@PathVariable Integer pat_id) {
        System.out.println("Getting medicine details from Patient table");
        return patientService.getMedicineDetails(pat_id);
    }

    @RequestMapping(value="/getDiagnosticsDetails/{pat_id}",method = RequestMethod.POST)
    public List<String> getDiagnosticsDetails(@PathVariable Integer pat_id) {
        System.out.println("Getting diagnostic details from Patient table");
        return patientService.getDiagnosticsDetails(pat_id);
    }

    @RequestMapping(value="/discharge/{pat_id}",method = RequestMethod.POST)
    public void dischargePatient(@PathVariable Integer pat_id) {
        System.out.println("Discharging of patient");
        patientService.dischargePatient(pat_id);
    }
}
