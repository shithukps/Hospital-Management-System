package com.project.hms.services;

import com.project.hms.db.models.Patient;
import com.project.hms.db.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

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
}
