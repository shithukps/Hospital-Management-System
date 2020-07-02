package com.project.hms.db.models;

import com.sun.istack.NotNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;


@Table(name="diagnostic_tracking")
public class DiagnosticTracking {
    @Size(max=9)
    @Column(name = "patient_id")
    @NotNull
    private int patient_id;

    @Column(name = "test_id")
    @NotNull
    private Integer test_id;

    public DiagnosticTracking(){}

    public DiagnosticTracking(Integer patient_id, Integer test_id) {
        this.patient_id = patient_id;
        this.test_id = test_id;
    }

    public Integer getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Integer patient_id) {
        this.patient_id = patient_id;
    }

    public Integer getTest_id() {
        return test_id;
    }

    public void setTest_id(Integer test_id) {
        this.test_id = test_id;
    }
}
