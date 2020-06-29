package com.project.hms.db.models;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;


@Table(name="medicine_tracking")
public class MedicineTracking {

    @Column(name = "patient_id")
    @NotNull
    private Integer patient_id;

    @Column(name = "medicine_id")
    @NotNull
    private Integer medicine_id;

    @Column(name = "quantity_issued")
    @NotNull
    private Integer quantity_issued;
    public MedicineTracking(){

    }

    public MedicineTracking(Integer patient_id, Integer medicene_id, Integer quantity_issued) {
        this.patient_id = patient_id;
        this.medicine_id = medicene_id;
        this.quantity_issued = quantity_issued;
    }

    public Integer getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Integer patient_id) {
        this.patient_id = patient_id;
    }

    public Integer getMedicine_id() {
        return medicine_id;
    }

    public void setMedicine_id(Integer medicine_id) {
        this.medicine_id = medicine_id;
    }

    public Integer getQuantity_issued() {
        return quantity_issued;
    }

    public void setQuantity_issued(Integer quantity_issued) {
        this.quantity_issued = quantity_issued;
    }
}
