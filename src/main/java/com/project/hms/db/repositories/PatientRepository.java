package com.project.hms.db.repositories;

import com.project.hms.db.models.Patient;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface PatientRepository extends CrudRepository<Patient,String> {
    @Transactional
    @Modifying
    @Query(
            value = "insert into patient(SSNID,patient_name,address,age,date_of_admission,room_type,city,state,status) values(:ssnid,:patient_name,:address,:age,:date_of_admission,:room_type,:city,:state,'ACTIVE')",
            nativeQuery = true)

    void registerPatient(String ssnid, String patient_name, String address, int age, Date date_of_admission, String room_type, String city, String state);


}
