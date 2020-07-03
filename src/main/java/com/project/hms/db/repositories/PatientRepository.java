package com.project.hms.db.repositories;

import com.project.hms.db.models.Patient;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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

    @Query(
            value = "select * from patient where status='ACTIVE'",
            nativeQuery = true)
    List<Patient> getAllDetails();

    @Query(
            value = "select patient_name,age,room_type,date_of_admission,address,state,city from patient where patient_id=:pat_id",
            nativeQuery = true)
    String searchPatientDetails(Integer pat_id);

    @Query(
            value = "select patient_name,age,address,date_of_admission,room_type from patient where patient_id=:pat_id",
            nativeQuery = true)
    String getBillingDetails(Integer pat_id);

    @Query(
            value = "select m.medicine_name,mt.quantity_issued,m.rate from medicine m join medicine_tracking mt on m.medicine_id=mt.medicine_id where mt.patient_id=:pat_id",
            nativeQuery = true)
    List<String> getMedicineDetails(Integer pat_id);

    @Query(
            value = "select d.test_name,d.test_charge from diagnostic d join diagnostic_tracking dt on d.test_id=dt.test_id where dt.patient_id=:pat_id",
            nativeQuery = true)
    List<String> getDiagnosticsDetails(Integer pat_id);

    @Transactional
    @Modifying
    @Query(
            value = "update patient set status='DISCHARGED' where patient_id=:pat_id",
            nativeQuery = true)
    void dischargePatient(Integer pat_id);

    @Query(
            value = "select count(*) from patient where patient_id=:pat_id",
            nativeQuery = true)
    Integer findById(Integer pat_id);

    @Query(
            value = "select count(*) from patient where patient_id=:pat_id and status='ACTIVE'",
            nativeQuery = true)
    Integer checkPatientActive(Integer pat_id);

    @Transactional
    @Modifying
    @Query(
            value = "delete from medicine_tracking where patient_id=:pat_id",
            nativeQuery = true)
    void deleteMedicineTacking(Integer pat_id);

    @Transactional
    @Modifying
    @Query(
            value = "delete from diagnostic_tracking where patient_id=:pat_id",
            nativeQuery = true)
    void deleteDiagnosticTacking(Integer pat_id);
}
