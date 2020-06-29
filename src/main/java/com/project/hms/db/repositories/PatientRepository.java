package com.project.hms.db.repositories;

import com.project.hms.db.models.Patient;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface PatientRepository extends CrudRepository<Patient,String> {
    @Transactional
    @Modifying
    @Query(
            value = "insert into patient(ssnid,patient_name,address,age,date_of_admission,room_type,city,state,status) values(:ssnid,:patient_name,:address,:age,:date_of_admission,:room_type,:city,:state,'ACTIVE')",
            nativeQuery = true)

    void registerPatient(String ssnid, String patient_name, String address, int age, String date_of_admission, String room_type, String city, String state);

    @Query(
            value = "select patient_name,age,room_type,date_of_admission,address,state,city from patient where patient_id=:pat_id",
            nativeQuery = true)
    String getPatientDetails(Integer pat_id);

    @Transactional
    @Modifying
    @Query(
            value = "update patient set patient_name=?1,age=?2,date_of_admission=?4,room_type=?3,address=?5,city=?7,state=?6 where patient_id=?8",
            nativeQuery = true)
    void updatePatientDetails(String patient_name, int age, String room_type, String date_of_admission, String address, String state, String city, Integer pat_id);

    @Transactional
    @Modifying
    @Query(
            value = "delete from patient where patient_id=:pat_id",
            nativeQuery = true)
    void deletePatientDetails(Integer pat_id);
}
