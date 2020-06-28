package com.project.hms.services;

import com.project.hms.db.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;

    public void registerPatient(String ssnid, String patient_name, String address, int age, Date date_of_admission, String room_type, String state, String city) {

        patientRepository.registerPatient(ssnid,patient_name,address,age,date_of_admission,room_type,state,city);
    }
}
