package com.project.hms.db.repositories;

import com.project.hms.db.models.Medicine;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MedicineRepository extends CrudRepository<Medicine,String> {

    @Query(
            value = "select * from medicine",
            nativeQuery = true)
    List<Medicine> getMedicines();

    @Query(
            value = "select quantity_avail,rate from medicine where medicine_id=:med_id",
            nativeQuery = true)
    String getMedicineDetails(Integer med_id);

    @Transactional
    @Modifying
    @Query(
            value = "insert into medicine_tracking values(?1,?2,?3)",
            nativeQuery = true)
    void insertMedicineTrack(Integer patient_id, Integer medicine_id, Integer quantity_issued);

    @Transactional
    @Modifying
    @Query(
            value = "update medicine set quantity_avail=quantity_avail-:qty where medicine_id=:med_id",
            nativeQuery = true)
    void updateQuantityAvailable(Integer med_id, Integer qty);
}
