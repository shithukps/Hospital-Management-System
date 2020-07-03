package com.project.hms.controllers;

import com.project.hms.db.models.Patient;
import com.project.hms.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PatientController {
    @Autowired
    PatientService patientService;
    @RequestMapping(value="/register",method = RequestMethod.POST)
    public void registerPatient(@RequestBody Patient patient) {
        patientService.registerPatient(patient.getSsnid(),patient.getPatient_name(),patient.getAddress(),patient.getAge(),patient.getDate_of_admission(),patient.getRoom_type(),patient.getCity(),patient.getState());
    }//Insertion in Patient table

    @RequestMapping(value="/getdetails/{pat_id}",method = RequestMethod.POST)
    public String getPatientDetails(@PathVariable Integer pat_id) {
        return patientService.getPatientDetails(pat_id);
    }//Getting details from Patient table

    @RequestMapping(value="/update/{pat_id}",method = RequestMethod.POST)
    public void updatePatientDetails(@RequestBody Patient patient,@PathVariable Integer pat_id) {
        patientService.updatePatientDetails(patient.getPatient_name(),patient.getAge(),patient.getRoom_type(),patient.getDate_of_admission(),patient.getAddress(),patient.getState(),patient.getCity(),pat_id);
    }//Updating patient details

    @RequestMapping(value="/delete/{pat_id}",method = RequestMethod.POST)
    public void deletePatientDetails(@PathVariable Integer pat_id) {
        patientService.deleteMedicineTacking(pat_id);
        patientService.deleteDiagnosticTacking(pat_id);
        patientService.deletePatientDetails(pat_id);
    }//Deleting Patient details

    @RequestMapping(value="/getAll",method = RequestMethod.POST)
    public List<Patient> getAllDetails() {
        return patientService.getAllDetails();
    }//Getting All details from Patient table

    @RequestMapping(value="/search/{pat_id}",method = RequestMethod.POST)
    public String searchPatientDetails(@PathVariable Integer pat_id) {
        return patientService.searchPatientDetails(pat_id);
    }//search details from Patient table

    @RequestMapping(value="/getBillingDetails/{pat_id}",method = RequestMethod.POST)
    public String getBillingDetails(@PathVariable Integer pat_id) {
        return patientService.getBillingDetails(pat_id);
    }//Getting billing details from Patient table

    @RequestMapping(value="/getMedicineDetails/{pat_id}",method = RequestMethod.POST)
    public List<String> getMedicineDetails(@PathVariable Integer pat_id) {
        return patientService.getMedicineDetails(pat_id);
    }//Getting medicine details from Patient table

    @RequestMapping(value="/getDiagnosticsDetails/{pat_id}",method = RequestMethod.POST)
    public List<String> getDiagnosticsDetails(@PathVariable Integer pat_id) {
        return patientService.getDiagnosticsDetails(pat_id);
    }//Getting diagnostic details from Patient table

    @RequestMapping(value="/discharge/{pat_id}",method = RequestMethod.POST)
    public void dischargePatient(@PathVariable Integer pat_id) {
        patientService.dischargePatient(pat_id);
    }//Discharging of patient"

    @RequestMapping(value="/checkPatientExistence/{pat_id}",method = RequestMethod.POST)
    public Integer checkPatientExistence(@PathVariable Integer pat_id) {
        return patientService.checkPatientExistence(pat_id);
    }//Checking patient for existence

    @RequestMapping(value="/checkPatientActive/{pat_id}",method = RequestMethod.POST)
    public Integer checkPatientActive(@PathVariable Integer pat_id) {
        return patientService.checkPatientActive(pat_id);
    }//Checking patient for existence
}
