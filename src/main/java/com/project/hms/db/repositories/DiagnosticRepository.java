package com.project.hms.db.repositories;

import com.project.hms.db.models.Diagnostic;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DiagnosticRepository extends CrudRepository<Diagnostic,String> {

    @Query(
            value = "select * from diagnostic",
            nativeQuery = true)
    List<Diagnostic> getDiagnosticsList();

    @Query(
            value = "select test_charge from diagnostic where test_id=?1",
            nativeQuery = true)
    String getDiagnostics(Integer d_id);

    @Transactional
    @Modifying
    @Query(
            value = "insert into diagnostic_tracking values(?1,?2)",
            nativeQuery = true)
    void insertDiagnosticsTrack(Integer patient_id, Integer test_id);
}
