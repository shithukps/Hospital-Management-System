package com.project.hms.services;

import com.project.hms.db.models.Patient;
import com.project.hms.db.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;

    public void registerPatient(String ssnid, String patient_name, String address, int age, String date_of_admission, String room_type, String state, String city) {

        patientRepository.registerPatient(ssnid,patient_name,address,age,date_of_admission,room_type,state,city);
    }

    public String getPatientDetails(int pat_id) {
        return patientRepository.getPatientDetails(pat_id);
    }

    public void updatePatientDetails(String patient_name, int age, String room_type, String date_of_admission, String address, String state, String city, Integer pat_id) {
        patientRepository.updatePatientDetails(patient_name,age,room_type,date_of_admission,address,state,city,pat_id);
    }

    public void deletePatientDetails(Integer pat_id) {
        patientRepository.deletePatientDetails(pat_id);

    }

    public List<Patient> getAllDetails() {
        return patientRepository.getAllDetails();
    }

    public String searchPatientDetails(Integer pat_id) {
        return patientRepository.searchPatientDetails(pat_id);
    }

    public String getBillingDetails(Integer pat_id) {
        return patientRepository.getBillingDetails(pat_id);
    }

    public List<String> getMedicineDetails(Integer pat_id) {
        return patientRepository.getMedicineDetails(pat_id);
    }

    public List<String> getDiagnosticsDetails(Integer pat_id) {
        return patientRepository.getDiagnosticsDetails(pat_id);
    }

    public void dischargePatient(Integer pat_id) {
        patientRepository.dischargePatient(pat_id);
    }

    public Integer checkPatientExistence(Integer pat_id) {
        return patientRepository.findById(pat_id);
    }

    public Integer checkPatientActive(Integer pat_id) {
        return patientRepository.checkPatientActive(pat_id);
    }
}
